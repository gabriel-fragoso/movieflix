import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../services/firebase'
import styles from './Signin.module.scss'

import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';


export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [confirm, setConfirm] = useState('')  
  const [name, setName] = useState('')  


  const router = useRouter();


  async function handleSignupUser() {

    if(confirm !== password){
      toast.error('As senhas não são iguais')
    } else{
      await firebase.auth().createUserWithEmailAndPassword(email, password) 
      .then( async (value) => {

        await firebase.firestore().collection('users')
        .doc(value.user?.uid)
        .set({
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          setEmail('')
          setPassword('')
          setConfirm('')
          setName('')
        })
        toast.success("Seja bem vindo " + name)
        router.push('/home')
      })
      .catch((error) => {
        if(error.code === 'auth/weak-password'){
          toast.error('Senha muito fraca...')
        } else if(error.code === 'auth/email-already-in-use'){
          toast.error('Email já existente!')
        }
      })
    }
  }
  return (
    <div className={styles.container}>

      <ToastContainer />
      <header>
        <h1>MovieFlix</h1>
      </header>
      <div className={styles.form}>
      <label>Seu nome</label>
      <input 
      type="email"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      <label>Seu email</label>
      <input 
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <label>Sua melhor senha</label>
      <input 
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <label>Confirme sua senha</label>
      <input 
      type="password"
      value={confirm}
      onChange={(e) => setConfirm(e.target.value)}
      />
      <button onClick={handleSignupUser} className={styles.signin}>Cadastre-se</button>
      <button className={styles.signinwith}>
          <img src="/images/logoGoogle.png" alt="Logo do Google" className={styles.logo} />
      </button>
      <Link className={styles.signup} href="/">Já tem uma conta? Faça seu login.</Link>
      </div>
    </div>
  )
}
