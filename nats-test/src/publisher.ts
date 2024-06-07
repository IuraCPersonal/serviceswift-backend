import nats from "node-nats-streaming";
import { JobCreatedPublisher } from "./events/job-created-publisher";

console.clear();

const stan = nats.connect("serviceswift", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new JobCreatedPublisher(stan);

  await publisher
    .publish({
      id: "123",
      title: "Software Developer",
      price: 20,
    })
    .catch((err) => {
      console.error(err);
    });
});
