import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT,
  MONGOURI: process.env.MONGOURI,
};

const config = Object.freeze(_config);

export default config;
