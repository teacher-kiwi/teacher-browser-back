import Journal from "../models/journal";

export default {
  Student: {
    journal: async ({ _id }) => {
      const journal = await Journal.findOne({ ownerId: _id.toString() });
      return journal.contents;
    },
  },
};
