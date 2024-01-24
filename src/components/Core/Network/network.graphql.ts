import gql from "graphql-tag";

export const CORE_NETWORK_LIST_QUERY = gql`
query coreNetworkSelectFilteredList($name: String) {
    core {
      network {
        list(name: $name) {
          data {
            id
            name
          }
        }
      }
    }
  }`;