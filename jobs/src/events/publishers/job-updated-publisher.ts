import { Publisher, Subjects, JobUpdatedEvent } from "@serviceswift/common";

export class JobUpdatedPublisher extends Publisher<JobUpdatedEvent> {
  subject: Subjects.JobUpdated = Subjects.JobUpdated;
}
