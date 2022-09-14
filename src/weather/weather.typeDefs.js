import { gql } from "apollo-server-core";

export default gql`
  type Weather {
    address1: String
    address2: String
    temp: Float
    icon: String
    pm10grade: String
  }

  type Query {
    weather(lat: Float!, lng: Float!): Weather
  }
`;
