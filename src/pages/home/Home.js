import React from 'react'
import useMe from '../../hooks/useMe'

const Home = () => {
  const { me, loading, error } = useMe()
  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>

  return <div>Hello {me.userName}</div>
}

export default Home
