import mongoose from "mongoose";
import { Order, OrderStatus } from "./order.schema";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface JobAttrs {
  id: string;
  title: string;
  price: number;
}

export interface JobDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface JobModel extends mongoose.Model<JobDoc> {
  build(attrs: JobAttrs): JobDoc;
  findByEvent(event: { id: string; version: number }): Promise<JobDoc | null>;
}

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

jobSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Job.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

jobSchema.statics.build = (attrs: JobAttrs) => {
  return new Job({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

jobSchema.set("versionKey", "version");
jobSchema.plugin(updateIfCurrentPlugin);

jobSchema.methods.isReserved = async function () {
  // this === the job document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    job: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Job = mongoose.model<JobDoc, JobModel>("Job", jobSchema);

export { Job };
