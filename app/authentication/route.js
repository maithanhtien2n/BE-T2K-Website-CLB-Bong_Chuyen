module.exports = (router) => {
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");

  // API xác thực token
  router.post("/api/v1/token-authentication", authenticateToken, (req, res) => {
    res.json({
      success: true,
      statusCode: 200,
      statusValue: "Xác thực token thành công!",
      data: req.username,
    });
  });

  // API đăng ký tài khoản
  router.post("/api/v1/account/register", controller.postAccountRegister);

  // API đăng nhập tài khoản
  router.post("/api/v1/account/login", controller.postAccountLogin);
};
