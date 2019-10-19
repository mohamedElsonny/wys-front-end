/* global fetch */

import React, { useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import client from './client'
import { setAccessToken } from '../global/accessToken'

const AppContainer = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/refresh_token`, {
      credentials: 'include',
      method: 'POST'
    }).then(async x => {
      const data = await x.json()
      if (data.ok) {
        setAccessToken(data.accessToken)
      }
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading</div>
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default AppContainer
