import { Publisher, OrderCancelledEvent, Subjects } from "@serviceswift/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
