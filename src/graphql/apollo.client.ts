import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import type { ErrorResponse } from '@apollo/client/link/error'
import { useAuthStore, useAlertStore } from '@/stores'

// import { useConfigStore } from "@/stores/config";
import type { GraphQLError, GraphQLErrorExtensions } from 'graphql'

import { useSettingsStore } from '@/stores';

interface Headers {
  Authorization?: string
  'Content-Type'?: string
  'X-Team-ID'?: string
}
// Get Authorization Headers
export function getHeaders(): object {
  const headers: Headers = {}
  const token: string | null = useAuthStore().getToken
  const selectedTeam = useAuthStore().team
  if (token) {
    headers['Authorization'] = `${token}`
  }
  if (selectedTeam) {
    headers['X-Team-ID'] = selectedTeam
  }
  headers['Content-Type'] = 'application/json'
  return headers
}

// HTTP connection to the API
const httpLink = new HttpLink({
  uri: `/graphql`,
  fetch: (uri: RequestInfo | URL, options?: RequestInit | undefined) => {
    if (!options) options = {}
    options.headers = <HeadersInit>getHeaders()
    uri = useSettingsStore().getBackendServer + uri
    return fetch(uri, options)
  }
})

// Laravel Validation Error Interface
interface ValidationError extends GraphQLErrorExtensions {
  [attributeName: string]: string
}

// Handle errors
const errorLink = onError((errorInput: ErrorResponse) => {
  if ('response' in errorInput) {
    if (errorInput.response && 'errors' in errorInput.response) {
      const errors = errorInput.response.errors
      if (errors != undefined) {
        errors.forEach((error) => {
          processError(error)
        })
      }
    }
  }
})

function processError(error: GraphQLError) {
  const alertStore = useAlertStore()
  const authStore = useAuthStore()
  const message: string = error.message

  // Unauthenticated Errors
  if (['Not Authenticated', 'Unauthenticated.'].indexOf(message) > -1) {
    authStore.logout()
    alertStore.add({
      severity: 'error',
      summary: 'Unauthenticated',
      detail: 'You need to be signed-in to do that.',
      life: 10000
    })
    return
  }

  // Internal Server Error
  if (['Internal server error'].indexOf(message) > -1) {
    alertStore.add({
      severity: 'error',
      summary: 'Internal Server Error',
      detail: message,
      life: 10000
    })
    return
  }

  if (message.includes('Duplicate Entry')) {
    alertStore.add({
      severity: 'warn',
      summary: 'That apears to already exist!',
      detail: message,
      life: 10000
    })
    return
  }

  if (message) {
    alertStore.add({
      severity: 'warn',
      summary: 'Message Provided!',
      detail: message,
      life: 10000
    })
  }

  // A GraphQL Extension?
  if (!('extensions' in error)) {
    console.error('UNKNOWN ERROR!')
    console.error(error)
    return
  }

  // Laravel Validation Errors
  if ('validation' in error.extensions || 'errors' in error.extensions) {
    let validationErrors: Array<ValidationError>
    if ('validation' in error.extensions)
      validationErrors = error.extensions.validation as Array<ValidationError>
    else validationErrors = error.extensions.errors as Array<ValidationError>

    handleValidationErrors(validationErrors)
    return
  }

  // We have a Reason!
  if ('reason' in error.extensions) {
    alertStore.add({
      severity: 'warn',
      summary: 'Reasonable Error',
      detail: error.extensions.reason,
      life: 10000
    })
    return
  }

  alertStore.add({ severity: 'error', summary: 'Error Message', detail: message })
}

function handleValidationErrors(validationErrors: Array<ValidationError>) {
  const alertStore = useAlertStore()
  const entries = Object.entries(validationErrors)
  for (const [key, value] of entries) {
    alertStore.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: key + ': ' + value,
      life: 10000
    })
  }
}

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      //pollInterval: useSettingsStore().pollInterval * 100 * 1000
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      //pollInterval: useSettingsStore().pollInterval * 100 * 1000
    },
    mutate: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache'
    }
  }
})
