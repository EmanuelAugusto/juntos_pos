import Sequelize from "sequelize";
import DotEnv from "dotenv";
DotEnv.config();

export default new Sequelize(
  process.env.DATABASE,
  process.env.USER_DATABASE,
  process.env.PASSWORD_DATABASE,
  {
    host: process.env.HOST_DATABASE,
    dialect: "mysql",
  }
);
