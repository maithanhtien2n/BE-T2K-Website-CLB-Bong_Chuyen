const { throwError } = require("../../utils/index");
const { Introduce } = require("./configDB");
module.exports = {
  getContentIntroduceMD: () => {
    try {
      return Introduce.findAll();
    } catch (error) {
      throw error;
    }
  },
};
