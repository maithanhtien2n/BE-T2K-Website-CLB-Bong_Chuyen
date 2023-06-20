const { throwError, deleteFile } = require("../../utils/index");
const { Account, Users, MemberRegistration } = require("./configDB");
module.exports = {
  getUserInfoMD: async (account_id) => {
    try {
      const account = Account.findOne({
        attributes: ["username", "account_id", "role"],
        where: { account_id },
        include: [
          {
            model: Users,
            as: "user_info",
          },
        ],
      });

      return account;
    } catch (error) {
      throw error;
    }
  },

  putUserInfoMD: async ({
    account_id,
    avatar,
    full_name,
    gender,
    birth_date,
    class_name,
    phone_number,
    address,
  }) => {
    try {
      if (avatar) {
        const user = await Users.findOne({ where: { account_id } });

        if (user) {
          const parts = user.avatar.split("/");
          const imageName = parts[parts.length - 1];
          if (user.avatar) {
            deleteFile(imageName);
          }
          await Users.update(
            {
              avatar,
              full_name,
              gender,
              birth_date,
              class_name,
              phone_number,
              address,
            },
            { where: { account_id } }
          );
        } else {
          await Users.create({
            account_id,
            avatar,
            full_name,
            gender,
            birth_date,
            class_name,
            phone_number,
            address,
          });
        }

        return "Cập nhật thông tin người dùng thành công!";
      } else {
        const user = await Users.findOne({ where: { account_id } });
        if (user) {
          await Users.update(
            {
              full_name,
              gender,
              birth_date,
              class_name,
              phone_number,
              address,
            },
            { where: { account_id } }
          );
        } else {
          await Users.create({
            account_id,
            full_name,
            gender,
            birth_date,
            class_name,
            phone_number,
            address,
          });
        }

        return "Cập nhật thông tin người dùng thành công!";
      }
    } catch (error) {
      throw error;
    }
  },

  postRegisterMemberMD: async (
    user_id,
    full_name,
    gender,
    birth_date,
    class_name,
    phone_number,
    address,
    facebook_link
  ) => {
    try {
      const formRegister = await MemberRegistration.findOne({
        where: { user_id },
      });

      if (formRegister) {
        throwError(222, "Đơn đăng ký của bạn đã tồn tại!");
      }

      const users = await MemberRegistration.create({
        user_id,
        full_name,
        gender,
        birth_date,
        class_name,
        phone_number,
        address,
        facebook_link,
      });

      return users;
    } catch (error) {
      throw error;
    }
  },

  getRegisterMemberMD: async () => {
    try {
      const memberRegistration = MemberRegistration.findAll();
      return memberRegistration;
    } catch (error) {
      throw error;
    }
  },

  putRegisterMemberMD: async (listFormRegister) => {
    try {
      listFormRegister.forEach(async (item) => {
        const {
          user_id,
          full_name,
          gender,
          birth_date,
          class_name,
          phone_number,
          address,
        } = item;
        await Users.update(
          {
            full_name,
            gender,
            birth_date,
            class_name,
            phone_number,
            address,
            position: "Thành viên",
            position_key: "member",
          },
          { where: { user_id } }
        );

        await MemberRegistration.destroy({ where: { user_id } });
      });

      return "Duyệt đơn đăng ký thành công!";
    } catch (error) {
      throw error;
    }
  },

  deleteRegisterMemberMD: async (ids) => {
    try {
      ids.forEach(async (id) => {
        await MemberRegistration.destroy({
          where: { id },
        });
      });

      return "Từ chối đơn đăng ký thành công!";
    } catch (error) {
      throw error;
    }
  },
};
