const sequelize = require("../../config/connectDatabase");
const { DataTypes } = require("sequelize");

const WorkoutSchedule = sequelize.define(
  "WorkoutSchedule",
  {
    workout_schedule_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bannerImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    header_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    footer_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "workout_schedule",
    timestamps: false,
  }
);

module.exports = {
  WorkoutSchedule,
};
