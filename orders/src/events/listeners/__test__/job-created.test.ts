import { JobCreatedEvent } from "@serviceswift/common";
import { JobCreatedListener } from "../job-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Job } from "../../../models/job.schema";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // create an instance of the listener
  const listener = new JobCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: JobCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("creates and saves a job", async () => {
  const { listener, data, msg } = await setup();

  // call onMessage function with the data object + message object
  await listener.onMessage(data, msg as Message);

  // write assertions to make sure a job was created
  const job = await Job.findById(data.id);

  expect(job).toBeDefined();
  expect(job!.title).toEqual(data.title);
  expect(job!.price).toEqual(data.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  // call onMessage function with the data object + message object
  await listener.onMessage(data, msg as Message);

  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
