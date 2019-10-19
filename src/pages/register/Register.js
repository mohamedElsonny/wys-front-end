/* eslint-disable */

import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import useAuth from '../../hooks/useAuth'
import registerGql from './gql/register.gql'

const Register = () => {
  const [register] = useMutation(registerGql)

  const { formData, changeData, onSubmit, errors } = useAuth({
    defaultState: { userName: '', email: '', password: '' },
    requiredFields: ['userName', 'email', 'password'],
    mutation: register,
    operation: 'register',
  })
  return (
    <form onSubmit={onSubmit}>
      <div>
        <span>Username: </span>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={e =>
            changeData({ name: e.target.name, value: e.target.value })
          }
        />
        {errors.userName && <div>{errors.userName}</div>}
      </div>
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

      <button type="submit">Register</button>
    </form>
  )
}

export default Register
