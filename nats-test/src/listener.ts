import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { JobCreatedListener } from "./events/job-created-listener";

console.clear();

const stan = nats.connect("serviceswift", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new JobCreatedListener(stan).listen();
});

// intercept the termination signal and close the connection
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
