import { useMutation } from '@apollo/react-hooks'
import { setAccessToken } from '../global/accessToken'
import logoutGql from './gql/logout.gql'

export default () => {
  const [logoutMutation, { client }] = useMutation(logoutGql)
  const logout = async () => {
    try {
      await logoutMutation()
      setAccessToken('')
      await client.resetStore()
    } catch (err) {
      console.log('error', err)
    }
  }

  return {
    logout
  }
}
