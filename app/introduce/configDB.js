const sequelize = require("../../config/connectDatabase");
const { DataTypes } = require("sequelize");

const Introduce = sequelize.define(
  "Introduce",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "introduce",
    timestamps: false,
  }
);

module.exports = {
  Introduce,
};
