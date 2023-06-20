const sequelize = require("../../config/connectDatabase");
const { DataTypes } = require("sequelize");

const { Users } = require("../central/configDB");

const Member = sequelize.define(
  "Member",
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
  },
  {
    tableName: "member",
    timestamps: false,
  }
);

// Thực hiện ràng buộc
// Account.hasMany(Users, { foreignKey: "account_id", as: "list_user" });

module.exports = {
  Member,
  Users,
};
