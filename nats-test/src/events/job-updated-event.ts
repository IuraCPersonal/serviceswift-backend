import { Subjects } from "./subjects";

export interface JobUpdatedEvent {
  subject: Subjects.JobUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
  };
}
