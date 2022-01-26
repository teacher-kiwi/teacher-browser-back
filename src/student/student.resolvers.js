import Journal from "../models/journal";

export default {
  Student: {
    journal: async ({ _id }) => {
      const savedJournal = await Journal.findOne({ ownerId: _id.toString() });
      if (savedJournal) return savedJournal.contents;
      else {
        const newJournal = await Journal.create({ ownerId: _id.toString(), contents: "" });
        return newJournal.contents;
      }
    },
  },
};
