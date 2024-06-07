import { Subjects } from "./subjects";

export interface JobCreatedEvent {
  subject: Subjects.JobCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
