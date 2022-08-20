import styles from "./Signin.module.scss";
import Link from "next/link";
import firebase from '../services/firebase'


import { useRouter } from "next/router";
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";

export default function Signin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState("");

  async function handleSigninUser() {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async (value) => {

      await firebase.firestore().collection('users')
      .doc(value.user?.uid)
      .get()
      .then((snapshot) => {
        setUser({
          email: value.user?.email,
          password: snapshot.data().password,
        })
      })
       
        // toast.success('Seja bem vindo')
        // setEmail('')
        // setPassword('')

        router.push('/home')
    })
    .catch((error) => {
      if(error.code === 'auth/wrong-password'){
        toast.error('Senha inválida')
      } else{
        toast.error("erro ao logar")
      }
    })
}

  return (
    <div className={styles.container}>
      <header>
        <h1>MovieFlix</h1>
      </header>
      <ToastContainer />
      <div className={styles.form}>
        <label>Seu e-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Sua senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className={styles.password} href="/forgotPassword">Esqueci minha senha</Link>
        <button onClick={handleSigninUser} className={styles.signin}>
          Entrar
        </button>
        <button className={styles.signinwith}>
          <img src="/images/logoGoogle.png" alt="Logo do Google" className={styles.logo} />
      </button>
        <a className={styles.signup} href="/signup">Não tem um login? Cadastre-se!</a>
      </div>
    </div>
  );
}
