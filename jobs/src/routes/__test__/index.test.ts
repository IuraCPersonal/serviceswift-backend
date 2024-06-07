import request from "supertest";
import { app } from "../../app";

const createJob = () => {
  return request(app).post("/api/jobs").set("Cookie", global.signin()).send({
    title: "asldkf",
    price: 20,
  });
};

it("can fetch a list of jobs", async () => {
  await createJob();
  await createJob();
  await createJob();

  const response = await request(app).get("/api/jobs").send().expect(200);

  expect(response.body.length).toEqual(3);
});
