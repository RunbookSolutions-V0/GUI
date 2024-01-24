import gql from "graphql-tag";

const GraphQLDocument = gql`
query coreContactSelectFilteredList($name: String, $type: CoreContactTypes) {
    core {
      contact {
        list(name: $name, type: $type) {
          data {
            id
            name
          }
        }
      }
    }
  }`;