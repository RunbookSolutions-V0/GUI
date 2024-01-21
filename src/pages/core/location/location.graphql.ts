import gql from "graphql-tag";

export const CORE_LOCATION_LIST_QUERY = gql`
query coreLocationList {
    core {
      location {
        list {
          data {
            id
            name
            parent_id
            type
            description
            created_at
            address
          }
        }
      }
    }
  }`;

export const CORE_LOCATION_CREATE_MUTATION = gql`
mutation coreLocationCreate($input: CoreLocationCreateInput) {
    core {
      location {
        create(
          input: $input
        ) {
          id
        }
      }
    }
  }`;