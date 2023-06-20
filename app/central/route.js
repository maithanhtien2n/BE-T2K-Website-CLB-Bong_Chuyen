module.exports = (router) => {
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");
  const { upload, loadFileImage, loadFileVideo } = require("../../utils/index");

  // API load ảnh, video
  router.get("/image/:name", loadFileImage);
  router.get("/video/:name", loadFileVideo);

  // API Thông tin user
  router.get(
    "/api/v1/user-info/:id",
    authenticateToken,
    controller.getUserInfoCT
  );

  // API Cập nhật thông tin user
  router.put(
    "/api/v1/user-info/:id",
    authenticateToken,
    upload.single("avatar"),
    controller.putUserInfoCT
  );

  // API đăng ký thành viên
  router.post("/api/v1/register-member", controller.postRegisterMemberCT);

  // API danh sách đơn đăng ký thành viên
  router.get("/api/v1/register-member", controller.getRegisterMemberCT);

  // API duyệt đăng ký thành viên
  router.put("/api/v1/register-member", controller.putRegisterMemberCT);

  // API từ chối đăng ký thành viên
  router.delete(
    "/api/v1/register-member?:ids",
    controller.deleteRegisterMemberCT
  );
};
