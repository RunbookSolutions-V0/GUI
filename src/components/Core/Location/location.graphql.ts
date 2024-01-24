import gql from "graphql-tag";

export const CORE_LOCATION_LIST_QUERY = gql`
query coreLocationSelectFilteredList($name: String) {
    core {
      location {
        list(name: $name) {
          data {
            id
            name
          }
        }
      }
    }
  }`;