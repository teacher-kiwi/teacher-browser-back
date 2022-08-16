const axios = require("axios");

const resolver = {
  Query: {
    getNews: async (_, { search, start, sort }) => {
      try {
        const {
          data: { items },
        } = await axios({
          url: "https://openapi.naver.com/v1/search/news.json",
          method: "get",
          params: { query: search, start: start * 10, sort },
          headers: {
            "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
          },
        });
        return items;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolver;
