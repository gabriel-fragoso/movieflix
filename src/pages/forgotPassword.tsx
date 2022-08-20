import React, { useState } from 'react'

import styles from './Signin.module.scss'

import firebase from '../services/firebase'

export default function ForgotPassword() {

  const [changePassword, setChangePassword] = useState('')
  const [confirm, setConfirm] = useState('')  


  return (
    <div className={styles.container}>
      <label>Seu email</label>
      <input type="email" />
      <label>Sua nova senha</label>
      <input value={changePassword} onChange={(e) => setChangePassword(e.target.value)} type="password" />
      <label>Confirme sua senha</label>
      <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password"/>
    </div>
  )
}
