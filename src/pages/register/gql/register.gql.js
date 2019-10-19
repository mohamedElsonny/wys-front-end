import gql from 'graphql-tag'

export default gql`
  mutation REGISTER($email: String!, $userName: String!, $password: String!) {
    register(email: $email, userName: $userName, password: $password) {
      accessToken
      userName
      email
    }
  }
`
