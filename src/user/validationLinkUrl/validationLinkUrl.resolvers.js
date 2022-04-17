import axios from "axios";
import User from "../../models/user";
import {
  protectedMutationResovler,
  protectedQueryResovler,
} from "../user.utils";

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
