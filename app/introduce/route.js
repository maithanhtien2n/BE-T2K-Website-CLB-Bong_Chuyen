module.exports = (router) => {
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");
  // GET
  router.get("/api/v1/introduce", controller.getContentIntroduceCT);
};
