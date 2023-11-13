
import React, { useEffect, useState } from 'react'
import "./Login.css";

import { useMutation } from '../../lib/graphql'
import { useFormik } from 'formik'

import { useNavigate } from "react-router-dom";
const AUTH = `
    mutation auth($email: String!, $passwd: String!) {
      auth (input: {
        email: $email,
        passwd: $passwd
      }) {
        refreshToken
        accessToken
      }
    }
  `



function Login() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();
  const [signInError, setSignInError] = useState(false)


  const [authData, auth] = useMutation(AUTH)
  const form1 = useFormik({
    initialValues: {
      email: '',
      passwd: ''
    },
    onSubmit: async values => {
      // console.log(values, 'aaaa')

      const data = await auth(values)

      if (data && data.data) {
        console.log(data, 'aaaaaaassssss')
        localStorage.setItem('refreshToken', data.data.auth.refreshToken)
        localStorage.setItem('accessToken', data.data.auth.accessToken)
        navigate('/relatorios')
      } else {
        console.log(data, 'aaaaaaassssss1')
        setSignInError(true)
      }



    }
  })






  React.useEffect(() => {

    let timer = setInterval(() => {
      if (
        localStorage.getItem('refreshToken') &&
        localStorage.getItem('accessToken')
      ) {
        navigate('/dashboard')
      }
    }, 1000)


    return () => {
      clearInterval(timer)
    }
  }, [])






  return (
    <main className="login">
      <section className="flex container">
        <form onSubmit={form1.handleSubmit}>
          <h3>Login</h3>
          <input
            label='E-mail'
            autoComplete="off"
            type="email"
            placeholder='Seu e-mail'
            value={form1.values.email}
            required
            onChange={form1.handleChange}
            errormessage={form1.errors.email}
            name='email'
          />
          <input
            autoComplete="off"
            type="password"
            required
            label='Senha'
            placeholder='Sua senha'
            value={form1.values.passwd}
            onChange={form1.handleChange}
            name='passwd'
            errormessage={form1.errors.passwd}
          />
          {signInError && <alert>E-mail e/ou senha inválidos.</alert>}





          <button className="btn" type="submit">Entrar</button>
        </form>
      </section>
    </main>









  )
}

export default Login;