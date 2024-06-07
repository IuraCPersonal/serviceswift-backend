import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the job is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/jobs/${id}`).send().expect(404);
});

it("returns the job if the job is found", async () => {
  const title = "concert";
  const price = 20;

  const response = await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const jobResponse = await request(app)
    .get(`/api/jobs/${response.body.id}`)
    .send()
    .expect(200);

  expect(jobResponse.body.title).toEqual(title);
  expect(jobResponse.body.price).toEqual(price);
});
