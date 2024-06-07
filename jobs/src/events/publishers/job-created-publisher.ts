import { Publisher, Subjects, JobCreatedEvent } from "@serviceswift/common";

export class JobCreatedPublisher extends Publisher<JobCreatedEvent> {
  subject: Subjects.JobCreated = Subjects.JobCreated;
}
