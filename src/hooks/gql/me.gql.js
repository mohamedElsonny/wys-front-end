import gql from 'graphql-tag'

export default gql`
  query ME {
    me {
      id
      email
      userName
      createdAt
      updatedAt
    }
  }
`
