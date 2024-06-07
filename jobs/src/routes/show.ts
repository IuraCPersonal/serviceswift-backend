import express, { Request, Response } from "express";
import { Job } from "../models/job.schema";
import { NotFoundError } from "@serviceswift/common";

const router = express.Router();

router.get("/api/jobs/:id", async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new NotFoundError();
  }

  res.send(job);
});

export { router as showJobRouter };
