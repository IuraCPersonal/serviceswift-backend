import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { JobCreatedEvent } from "./job-created-event";
import { Subjects } from "./subjects";

export class JobCreatedListener extends Listener<JobCreatedEvent> {
  readonly subject: Subjects.JobCreated = Subjects.JobCreated;
  queueGroupName = "payments-service";

  onMessage(data: JobCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    msg.ack();
  }
}
