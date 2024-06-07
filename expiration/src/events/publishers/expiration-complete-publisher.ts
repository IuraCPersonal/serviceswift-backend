import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@serviceswift/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
