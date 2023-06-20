const { throwError } = require("../../utils/index");
const { News, NewsItem } = require("./configDB");
module.exports = {
  getContentNewsMD: async () => {
    try {
      const newsContent = await News.findAll({
        include: [
          {
            model: NewsItem,
            as: "list_news",
          },
        ],
      });

      return newsContent;
    } catch (error) {
      throwError(404, error);
    }
  },
};
