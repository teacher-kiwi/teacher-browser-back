import { gql } from "apollo-server-core";

export default gql`
  type School {
    ATPT_OFCDC_ORG_NM: String
    JU_ORG_NM: String
    SCHUL_NM: String
    ADRES_BRKDN: String
    SCHUL_RDNMA: String
    LTTUD: String
    LGTUD: String
    ATPT_OFCDC_SC_CODE: String
    SD_SCHUL_CODE: String
  }

  type Query {
    searchSchool(name: String): [School]
  }
`;
