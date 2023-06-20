const Sequelize = require("sequelize");
const sequelize = new Sequelize("db-website-clb-bong-chuyen", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối db thành công!");
  })
  .catch((err) => {
    console.error("Kết nối db lỗi:", err);
  });

module.exports = sequelize;
