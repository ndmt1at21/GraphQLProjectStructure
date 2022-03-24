import * as dotenv from "dotenv";

dotenv.config();

export const configs = {
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};
