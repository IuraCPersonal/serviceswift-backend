import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";
import { Job } from "../../models/job.schema";

it("has a route handler listening to /api/jobs for post requests", async () => {
  const response = await request(app).post("/api/jobs").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/jobs").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      title: "asldkjf",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      title: "laskdfj",
    })
    .expect(400);
});

it("creates a job with valid inputs", async () => {
  let jobs = await Job.find({});
  expect(jobs.length).toEqual(0);

  const title = "asldkfj";

  await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  jobs = await Job.find({});
  expect(jobs.length).toEqual(1);
  expect(jobs[0].price).toEqual(20);
  expect(jobs[0].title).toEqual(title);
});

it("publishes an event", async () => {
  const title = "asldkfj";

  await request(app)
    .post("/api/jobs")
    .set("Cookie", global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
