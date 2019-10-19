import React from 'react'
import { Link } from 'react-router-dom'
import useMe from '../hooks/useMe'
import useLogout from '../hooks/useLogout'

const Layout = ({ children }) => {
  const { me, loading } = useMe()
  const { logout } = useLogout()
  let body = null
  if (loading) {
    body = null
  }
  if (me) {
    body = <h2>you are logged in as {me.userName}</h2>
  }
  return (
    <>
      <div>
        <h1>WYS</h1>
        {body}
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/bye'>Bye</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <button type='button' onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      {children}
    </>
  )
}

export default Layout
