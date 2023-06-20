const { throwError } = require("../../utils/index");
const { Account } = require("./configDB");
const { Users } = require("../central/configDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  postAccountRegisterMD: async (username, password, confirm_password) => {
    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const account = await Account.findOne({ where: { username } });

      if (account) {
        throwError(210, "Tên người dùng đã tồn tại!");
      }

      if (password.length < 10) {
        throwError(211, "Mật khẩu phải trên 10 ký tự!");
      }

      if (password !== confirm_password) {
        throwError(212, "Mật khẩu chưa khớp, vui lòng nhập lại!");
      }

      const newAccount = await Account.create({
        username,
        password: hashedPassword,
        account_status: 0,
        role: "user",
      });

      await Users.create({
        account_id: newAccount.account_id,
        position: "Người dùng",
        position_key: "user",
      });

      return "Đăng ký tài khoản thành công!";
    } catch (error) {
      throw error;
    }
  },

  postAccountLoginMD: async (username, password) => {
    try {
      const account = await Account.findOne({ where: { username } });

      if (!account) {
        throwError(211, "Tên đăng nhập không chính xác!");
      }

      const checkPassword = bcrypt.compareSync(password, account.password);

      if (!checkPassword) {
        throwError(212, "Mật khẩu không chính xác!");
      }

      return {
        account_id: account.account_id,
        token: jwt.sign(
          { username: account.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        ),
      };
    } catch (error) {
      throw error;
    }
  },
};
