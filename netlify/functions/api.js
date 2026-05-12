import serverless from "serverless-http";
import app from "../../Server/app.js";
import { connectDB } from "../../Server/db.js";

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return serverless(app)(event, context);
};
