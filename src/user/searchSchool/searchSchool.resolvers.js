import data from "./searchSchool.db";

export default {
  Query: {
    searchSchool: (_, arg) => {
      return data.list1
        .filter((e) => e.SCHUL_NM.includes(arg.name))
        .map((e) =>
          Object.assign(
            e,
            data.list2.filter(
              (e2) => e.SCHUL_NM === e2.SCHUL_NM && e.JU_ORG_NM === e2.JU_ORG_NM
            )[0]
          )
        );
    },
  },
};
