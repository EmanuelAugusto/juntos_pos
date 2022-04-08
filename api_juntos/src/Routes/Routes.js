import Routes from "express";
import OngController from "../Http/OngController.js";

const Router = Routes.Router();

Router.get("/", OngController.HealthCheck);

Router.get("/ongs", OngController.GetAllOngs);

Router.post("/create", OngController.CreateOng);

Router.put("/:id", OngController.EditOng);

Router.get("/:id", OngController.GetOng);

Router.delete("/:id", OngController.DeleteOng);

export default Router;
