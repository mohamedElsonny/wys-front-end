/* eslint-disable */
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import meGql from './gql/me.gql'

export default () => {
  const [me, setMe] = useState(null)
  const [loading, setLoading] = useState(true)
  const { data = {}, loading: loadingMe, error } = useQuery(meGql, {
    fetchPolicy: 'network-only',
  })

  useEffect(
    () => {
      if (data && data.me) {
        setMe(data.me)
      }
    },
    [JSON.stringify(data)]
  )

  useEffect(
    () => {
      if (me || !loadingMe) {
        setLoading(false)
      }
    },
    [me, JSON.stringify(data), loadingMe]
  )
  return {
    me,
    loading,
    error,
  }
}
