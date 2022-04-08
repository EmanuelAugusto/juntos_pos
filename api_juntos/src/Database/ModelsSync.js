import OngModel from "../Models/OngModel.js";

export default () => {
  OngModel.sync({
    alter: true,
  });
};
