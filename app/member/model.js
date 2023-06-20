const { throwError } = require("../../utils/index");
const { Member, Users } = require("./configDB");
module.exports = {
  getContentMemberMD: async () => {
    try {
      const bannerImage = await Member.findOne({ where: { id: 1 } });
      const admins = await Users.findAll({
        where: { position_key: "managerment" },
      });
      const members = await Users.findAll({
        where: { position_key: "member" },
      });

      return { bannerImage: bannerImage.bannerImage, admins, members };
    } catch (error) {
      throwError(404, error);
    }
  },
};
