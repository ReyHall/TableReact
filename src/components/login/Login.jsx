import React from "react";
import "./Login.css";

function Login(){
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return(
    <main className="login">
      <section className="flex container">
        <form action="">
          <h3>Login</h3>
          <input autoComplete="off" type="email" placeholder="login" required value={login} onChange={({target}) => setLogin(target.value)} />
          <input autoComplete="off" type="password" placeholder="senha" required value={password} onChange={({target}) => setPassword(target.value)} />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </section>
    </main>
  )
}

export default Login;