import Express from "express";
import Routes from "./src/Routes/Routes.js";
import DotEnv from "dotenv";
import Db from "./src/Database/Database.js";
import ModelsSync from "./src/Database/ModelsSync.js"

DotEnv.config();

const App = Express();

App.use(Express.json());
App.use(Routes);


const RunApp = async () => {
  try {
    await Db.authenticate();
    ModelsSync();
    App.listen(process.env.PORT);
  } catch (error) {
    console.log(error);
  }
};

RunApp();
