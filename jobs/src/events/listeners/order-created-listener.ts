import { Listener, OrderCreatedEvent, Subjects } from "@serviceswift/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Job } from "../../models/job.schema";
import { JobUpdatedPublisher } from "../publishers/job-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // find the job that the order is reserving
    const job = await Job.findById(data.job.id);

    // if no job, throw error
    if (!job) {
      throw new Error("Job not found");
    }

    // mark the job as being reserved by setting its orderId property
    job.set({ orderId: data.id });

    // save the job
    await job.save();

    await new JobUpdatedPublisher(this.client).publish({
      id: job.id,
      title: job.title,
      price: job.price,
      userId: job.userId,
      version: job.version,
      orderId: job.orderId,
    });

    // ack the message
    msg.ack();
  }
}
