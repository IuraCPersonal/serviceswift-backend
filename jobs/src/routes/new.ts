import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@serviceswift/common";
import { body } from "express-validator";
import { Job } from "../models/job.schema";
import { JobCreatedPublisher } from "../events/publishers/job-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/jobs",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, imageUrl } = req.body;

    const job = Job.build({
      title,
      price,
      imageUrl,
      userId: req.currentUser!.id,
    });

    await job.save();

    await new JobCreatedPublisher(natsWrapper.client).publish({
      id: job.id,
      title: job.title,
      price: job.price,
      userId: job.userId,
      version: job.version,
    });

    res.status(201).send(job);
  }
);

export { router as createJobRouter };
