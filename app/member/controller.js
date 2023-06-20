const model = require("./model");
const {
  successResponse,
  errorResponse,
  throwError,
  checkNull,
} = require("../../utils/index");

module.exports = {
  getContentMemberCT: async (req, res) => {
    try {
      const response = await model.getContentMemberMD();
      return res.json(successResponse(response));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },
};
