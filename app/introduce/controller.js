const model = require("./model");
const {
  successResponse,
  errorResponse,
  throwError,
  checkNull,
} = require("../../utils/index");

module.exports = {
  getContentIntroduceCT: async (req, res) => {
    try {
      const response = await model.getContentIntroduceMD();
      return res.json(successResponse(response[0]));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },
};
