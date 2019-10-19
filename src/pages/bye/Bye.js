import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import byeGql from './gql/bye.gql'

const Bye = () => {
  const { data, loading, error } = useQuery(byeGql, {
    fetchPolicy: 'cache-and-network'
  })

  if (loading) return <div>loading...</div>
  if (error) return <div>Error</div>

  return <div>Bye Page {data.bye}</div>
}

export default Bye
