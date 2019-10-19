/* global fetch */
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'
// import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import { getAccessToken, setAccessToken } from '../../global/accessToken'

const cache = new InMemoryCache()

const request = async operation => {
  const accessToken = getAccessToken()
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
  }
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken()
        if (!token) {
          return true
        }

        try {
          const { exp } = jwtDecode(token)
          if (Date.now() >= exp * 1000) {
            return false
          } else {
            return true
          }
        } catch {
          return false
        }
      },
      fetchAccessToken: () => {
        return fetch(`${process.env.REACT_APP_API_URI}/refresh_token`, {
          credentials: 'include',
          method: 'POST'
        })
      },
      handleFetch: accessToken => {
        setAccessToken(accessToken)
      },
      handleError: err => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin')
        console.log(err)
      }
    }),
    requestLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors)
        // sendToLoggingService(graphQLErrors)
      }
      if (networkError) {
        console.log(networkError)
      }
    }),
    requestLink,
    new HttpLink({
      uri: `${process.env.REACT_APP_API_URI}/graphql`,
      credentials: 'include'
    })
  ]),
  cache
})

export default client
