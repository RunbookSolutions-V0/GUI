import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import type { ErrorResponse } from "@apollo/client/link/error";
import { useAuthStore } from "@/stores";
// import { useAlertStore } from "@/stores/alert";
// import { useConfigStore } from "@/stores/config";
import type { GraphQLError, GraphQLErrorExtensions } from "graphql";

interface Headers {
  Authorization?: string;
  "Content-Type"?: string;
  "X-Team-ID"?: string;
}
// Get Authorization Headers
export function getHeaders(): object {
  const headers: Headers = {};
  const token: string | null = useAuthStore().getToken;
  const selectedTeam = useAuthStore().team;
  if (token) {
    headers["Authorization"] = `${token}`;
  }
  if (selectedTeam) {
    headers["X-Team-ID"] = selectedTeam;
  }
  headers["Content-Type"] = "application/json";
  return headers;
}

// HTTP connection to the API
const httpLink = new HttpLink({
  uri: `/graphql`,
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = <HeadersInit>getHeaders();
    // uri = useConfigStore().graphqlServer + uri;
    uri = "http://192.168.1.197" + uri;
    return fetch(uri, options);
  },
});

// Laravel Validation Error Interface
interface ValidationError extends GraphQLErrorExtensions {
  [attributeName: string]: string;
}

// Handle errors
const errorLink = onError((errorInput: ErrorResponse) => {
  //console.log(errorInput);

  if ("response" in errorInput) {
    if (errorInput.response && "errors" in errorInput.response) {
      const errors = errorInput.response.errors;
      if (errors != undefined) {
        errors.forEach((error) => {
          processError(error);
        });
      }
    }
  }
});

function processError(error: GraphQLError) {
  //const alertStore = useAlertStore();
  const authStore = useAuthStore();
  const message: string = error.message;
  if (["Not Authenticated", "Unauthenticated."].indexOf(message) > -1) {
    // alertStore.addAlert("error", "You need to be signed-in to do that.");
    authStore.logout();
  } else if (["Internal server error"].indexOf(message) > -1) {
    // alertStore.addAlert("error", message);
  } else if ("extensions" in error) {
    // Laravel Validation Errors
    if ("validation" in error.extensions) {
      handleValidationErrors(
        error.extensions.validation as Array<ValidationError>,
      );
    } else if ("reason" in error.extensions) {
    //   alertStore.addAlert("error", <string>error.extensions.reason);
    } else if ("errors" in error.extensions) {
      handleValidationErrors(error.extensions.errors as Array<ValidationError>);
    } else {
    //   alertStore.addAlert("error", message);
    }
  } else {
    // alertStore.addAlert("error", message);
  }
}

function handleValidationErrors(validationErrors: Array<ValidationError>) {
//   const alertStore = useAlertStore();
//   Object.fromEntries(
//     Object.entries(validationErrors).map(([k, v]) => [
//       k,
//       alertStore.addAlert("error", k + ": " + v),
//     ]),
//   );
}

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      pollInterval: 600 * 1000,
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
      fetchPolicy: "no-cache",
    },
  },
});
