import { Publisher, Subjects, PaymentCreatedEvent } from "@serviceswift/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
