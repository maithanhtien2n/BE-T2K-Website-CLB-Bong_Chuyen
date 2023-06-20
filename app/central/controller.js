const model = require("./model");
const path = require("path");

const {
  successResponse,
  errorResponse,
  throwError,
  checkNull,
  upload,
} = require("../../utils/index");

module.exports = {
  getUserInfoCT: async (req, res) => {
    const account_id = req.params.id;
    try {
      const response = await model.getUserInfoMD(account_id);
      return res.json(successResponse(response));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },

  putUserInfoCT: async (req, res) => {
    const file = req.file;

    const account_id = req.params.id;

    const { full_name, gender, birth_date, class_name, phone_number, address } =
      req.body;

    try {
      if (file) {
        // Đường dẫn tệp cho người dùng
        const avatar = `http://${req.headers.host}/image/${path.basename(
          req.file.path
        )}`;

        const response = await model.putUserInfoMD({
          account_id,
          avatar,
          full_name,
          gender,
          birth_date,
          class_name,
          phone_number,
          address,
        });
        return res.json(successResponse(response));
      } else {
        const response = await model.putUserInfoMD({
          account_id,
          avatar: "",
          full_name,
          gender,
          birth_date,
          class_name,
          phone_number,
          address,
        });
        return res.json(successResponse(response));
      }
    } catch (error) {
      return res.json(errorResponse(error));
    }
  },

  postRegisterMemberCT: async (req, res) => {
    const {
      user_id,
      full_name,
      gender,
      birth_date,
      class_name,
      phone_number,
      address,
      facebook_link,
    } = req.body;
    try {
      checkNull(req.body, [
        "user_id",
        "full_name",
        "gender",
        "birth_date",
        "class_name",
        "phone_number",
        "address",
        "facebook_link",
      ]);
      const response = await model.postRegisterMemberMD(
        user_id,
        full_name,
        gender,
        birth_date,
        class_name,
        phone_number,
        address,
        facebook_link
      );
      return res.json(successResponse(response));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },

  getRegisterMemberCT: async (req, res) => {
    try {
      const response = await model.getRegisterMemberMD();
      return res.json(successResponse(response));
    } catch (error) {
      return res.status(error.statusCode).json(errorResponse(error));
    }
  },

  putRegisterMemberCT: async (req, res) => {
    const listFormRegister = req.body;
    try {
      listFormRegister.forEach((item) => {
        checkNull(item, [
          "user_id",
          "full_name",
          "gender",
          "birth_date",
          "class_name",
          "phone_number",
          "address",
        ]);
      });

      const response = await model.putRegisterMemberMD(listFormRegister);
      return res.json(successResponse(response));
    } catch (error) {
      return res.json(error);
    }
  },

  deleteRegisterMemberCT: async (req, res) => {
    const ids = req.query.ids.split(",").map((id) => parseInt(id));
    try {
      if (!ids[0]) {
        throw {
          statusCode: 240,
          statusValue: "Lỗi không kiểm tra null!",
        };
      }
      const response = await model.deleteRegisterMemberMD(ids);
      return res.json(successResponse(response));
    } catch (error) {
      return res.json(error);
    }
  },
};
