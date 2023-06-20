const model = require("./model");
const {
  successResponse,
  errorResponse,
  throwError,
  checkNull,
} = require("../../utils/index");

module.exports = {
  postAccountRegister: async (req, res) => {
    const { username, password, confirm_password } = req.body;
    try {
      checkNull(req.body, ["username", "password", "confirm_password"]);

      const response = await model.postAccountRegisterMD(
        username,
        password,
        confirm_password
      );

      return res.json(successResponse(response));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },

  postAccountLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      checkNull(req.body, ["username", "password"]);

      const response = await model.postAccountLoginMD(username, password);

      return res.json(successResponse(response));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },
};
