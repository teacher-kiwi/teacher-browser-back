import axios from "axios";

export default {
  Query: {
    validationLinkUrl: async (_, { url }) => {
      let validation;
      await axios(url)
        .then((response) => {
          console.log(Boolean(response));
          if (Boolean(response)) {
            validation = true;
          } else {
            validation = false;
          }
        })
        .catch((err) => {
          if (err) {
            validation = false;
          }
        });
      return validation;
    },
  },
};
