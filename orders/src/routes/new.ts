import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@serviceswift/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Job } from "../models/job.schema";
import { Order } from "../models/order.schema";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("jobId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("JobId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { jobId } = req.body;

    // Find the job the user is trying to order in the database
    const job = await Job.findById(jobId);

    if (!job) {
      throw new NotFoundError();
    }

    // Make sure that this job is not already reserved
    const isReserved = await job.isReserved();

    if (isReserved) {
      throw new BadRequestError("Job is already reserved");
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = await Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      job,
    });

    await order.save();

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      job: {
        id: job.id,
        price: job.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
