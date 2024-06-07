import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@serviceswift/common";
import { Order } from "../models/order.schema";
import mongoose from "mongoose";
import { body } from "express-validator";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  [
    body("orderId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Order ID must be provided"),
  ],
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("job");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
