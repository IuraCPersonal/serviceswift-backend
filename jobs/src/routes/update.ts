import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  requireAuth,
  NotAuthorizedError,
  NotFoundError,
  BadRequestError,
} from "@serviceswift/common";
import { Job } from "../models/job.schema";
import { JobUpdatedPublisher } from "../events/publishers/job-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/jobs/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
      throw new NotFoundError();
    }

    if (job.orderId) {
      throw new BadRequestError("Cannot edit a reserved job");
    }

    if (job.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    job.set({
      title: req.body.title,
      price: req.body.price,
    });

    await job.save();

    new JobUpdatedPublisher(natsWrapper.client).publish({
      id: job.id,
      title: job.title,
      price: job.price,
      userId: job.userId,
      version: job.version,
    });

    res.send(job);
  }
);

export { router as updateJobRouter };
