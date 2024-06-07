import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@serviceswift/common";

import { createJobRouter } from "./routes/new";
import { showJobRouter } from "./routes/show";
import { indexJobRouter } from "./routes";
import { updateJobRouter } from "./routes/update";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createJobRouter);
app.use(showJobRouter);
app.use(indexJobRouter);
app.use(updateJobRouter);

app.get("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
