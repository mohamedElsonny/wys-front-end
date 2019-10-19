/* eslint-disable */

import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import loginGql from './gql/login.gql'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const [login] = useMutation(loginGql)

  const { formData, changeData, onSubmit, errors } = useAuth({
    defaultState: { email: '', password: '' },
    requiredFields: ['email', 'password'],
    mutation: login,
    operation: 'login',
  })

  return (
    <form onSubmit={onSubmit}>
      <div>
        <span>Email: </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={e =>
            changeData({ name: e.target.name, value: e.target.value })
          }
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <span>Password: </span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={e =>
            changeData({ name: e.target.name, value: e.target.value })
          }
        />
        {errors.password && <div>{errors.password}</div>}
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
