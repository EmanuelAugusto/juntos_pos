import { DataTypes } from "sequelize";
import Database from "../Database/Database.js";

const OngModel = Database.define(
  "ong",
  {
    codigo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    razao_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'cnpj',
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ddd: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_trabalho: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export default OngModel;
