import OngModel from "../Models/OngModel.js";
import Bcrypt from "bcrypt";
import ValidateSchema from "../Helpers/ValidatorSchema.js";
import SchemaOngValidator from "../SchemaValidator/SchemaOngValidator.js";

const HealthCheck = async (req, res) => {
  return res.status(200).json({ status: true });
};

const GetAllOngs = async (req, res) => {
  try {
    const result = await OngModel.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      msg: error?.message || "server_error",
    });
  }
};

const EditOng = async (req, res) => {
  try {
    const Ong = req.body;

    delete Ong.password;

    const result = await OngModel.update(
      {
        ...Ong,
      },
      {
        where: {
          codigo: req.params.id,
        },
      }
    );

    res.status(200).json({
      msg: "edited",
    });
  } catch (error) {
    res.status(500).json({
      msg: error?.message || "server_error",
    });
  }
};

const GetOng = async (req, res) => {
  try {
    const result = await OngModel.findByPk(req.params.id);

    if (!result) {
      res.status(404).json({
        msg: "not_found",
      });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      msg: error?.message || "server_error",
    });
  }
};

const CreateOng = async (req, res) => {
  console.log(req.body);
  try {
    const Ong = req.body;

    const { valid, msg } = ValidateSchema(SchemaOngValidator, Ong);

    if (!valid) {
      res.status(400).json({
        msg: msg,
      });
      return;
    }

    Ong.password = Bcrypt.hashSync(Ong.password, 10);

    const result = await OngModel.create(req.body);

    res.status(200).json({
      msg: "created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors?.[0].message || "server_error",
    });
  }
};

const DeleteOng = async (req, res) => {
  try {
    const result = await OngModel.destroy({
      where: {
        codigo: req.params.id,
      },
    });

    res.status(200).json({
      msg: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: error?.message || "server_error",
    });
  }
};

export default {
  HealthCheck,
  CreateOng,
  GetOng,
  GetAllOngs,
  EditOng,
  DeleteOng,
};
