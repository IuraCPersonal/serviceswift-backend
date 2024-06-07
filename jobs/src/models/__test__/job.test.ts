import { Job } from "../job.schema";

it("implements optimistic concurrency control", async () => {
  // create an instance of a job
  const job = Job.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  // save the job to the database
  await job.save();

  // fetch the job twice
  const firstInstance = await Job.findById(job.id);
  const secondInstance = await Job.findById(job.id);

  // make two separate changes to the jobs we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched job
  await firstInstance!.save();

  try {
    // save the second fetched job
    await secondInstance!.save();
  } catch (err) {
    // expect an error on the second save
    return;
  }

  // expect an error
});

it("increments the version number on multiple saves", async () => {
  const job = Job.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await job.save();
  expect(job.version).toEqual(0);

  await job.save();
  expect(job.version).toEqual(1);

  await job.save();
  expect(job.version).toEqual(2);
});
