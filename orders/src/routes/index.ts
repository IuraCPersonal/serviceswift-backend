import express, { Request, Response } from "express";
import { requireAuth } from "@serviceswift/common";
import { Order } from "../models/order.schema";

const router = express.Router();

router.get("/api/orders", async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("job");

  res.send(orders);
});

export { router as indexOrderRouter };
