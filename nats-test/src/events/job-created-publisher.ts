import { Publisher } from "./base-publisher";
import { JobCreatedEvent } from "./job-created-event";
import { Subjects } from "./subjects";

export class JobCreatedPublisher extends Publisher<JobCreatedEvent> {
  readonly subject: Subjects.JobCreated = Subjects.JobCreated;
}
