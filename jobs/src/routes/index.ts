import express, { Request, Response } from "express";
import { Job } from "../models/job.schema";

const router = express.Router();

router.get("/api/jobs", async (req: Request, res: Response) => {
  const jobs = await Job.find({
    orderId: undefined,
  });

  res.send(jobs);
});

export { router as indexJobRouter };
