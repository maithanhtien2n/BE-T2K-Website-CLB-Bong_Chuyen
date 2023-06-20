const sequelize = require("../../config/connectDatabase");
const { DataTypes } = require("sequelize");

const News = sequelize.define(
  "News",
  {
    news_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "news",
    timestamps: false,
  }
);

const NewsItem = sequelize.define(
  "NewItem",
  {
    news_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content_1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content_2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_2: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    final_content: {
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
    tableName: "news_item",
    timestamps: false,
  }
);

// Thực hiện ràng buộc
News.hasMany(NewsItem, { foreignKey: "news_id", as: "list_news" });

module.exports = {
  News,
  NewsItem,
};
