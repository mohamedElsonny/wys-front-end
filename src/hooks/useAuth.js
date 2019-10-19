import { useState } from 'react'
import useRouter from 'use-react-router'
import { setAccessToken } from '../global/accessToken'
import loginGql from '../pages/login/gql/login.gql'
import registerGql from '../pages/register/gql/register.gql'

export default ({ defaultState, requiredFields = [], mutation, operation }) => {
  const { history } = useRouter()
  const [formData, setData] = useState(defaultState)
  const [errors, setErrors] = useState({})

  const changeData = ({ name, value }) => {
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    let errored = false
    Object.keys(defaultState).forEach(state => {
      if (
        requiredFields.includes(state) &&
        (!formData[state] || !formData[state].trim())
      ) {
        setErrors(prev => ({
          ...prev,
          [state]: `${state} is required`
        }))
        errored = true
      }
    })

    if (errored) {
      return
    }
    try {
      const { data } = await mutation({
        variables: formData,
        update: (proxy, { data: result }) => {
          let query = null
          if (operation === 'login') query = loginGql
          if (operation === 'register') query = registerGql
          const data = proxy.readQuery({
            query
          })
          data.me = {
            ...data.me,
            userName: result[operation].userName,
            email: result[operation].email
          }
          proxy.writeQuery({
            query,
            data
          })
        }
      })
      setAccessToken(data[operation].accessToken)
    } catch (e) {
      console.log('Somthing went Error', e.message)
    }

    // setData(defaultState)
    history.push('/')
  }

  return {
    onSubmit,
    errors,
    formData,
    changeData
  }
}
