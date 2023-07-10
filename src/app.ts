import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

// Import custom packages we'll be using
import { connect, getConnectionState } from "./config/db.config";
import { mainRouter } from "./routes/main.route";
import { ErrorHandler } from "./controllers/error.controller";

const MONGO_URI = String(process.env.CONNECTION_URI);
const PORT = Number(process.env.PORT);

const app: express.Application = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ErrorHandler);

app.use("/", mainRouter);

app.listen(PORT, async () => {
  const db = await connect(MONGO_URI);
  console.log(
    `${getConnectionState(db.connection.readyState)} to the database`
  );
  console.log(`Listening on localhost:${PORT}...`);
});

export { app };
