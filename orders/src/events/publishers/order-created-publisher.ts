import { Publisher, OrderCreatedEvent, Subjects } from "@serviceswift/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
