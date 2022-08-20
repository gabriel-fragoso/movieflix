import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import firebase from '../services/firebase'

import styles from './Home.module.scss'

export default function Home() {

  const [user, setUser] = useState(false)
  const [userLogged, setUserLogged] = useState<any>({})

  const router = useRouter();


  useEffect(() => {
    
    async function checkLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if(user){
          setUser(true);
          setUserLogged({
            uid: user.uid,
            email: user.email,
          })
        }else{
          setUser(false);
          setUserLogged({})
        }
      })
    }

    checkLogin();

  }, [])

  async function logout() {
    await firebase.auth().signOut()

    router.push('/')

  }

  return(
    <div className={styles.container}>
      <header className={styles.header}>
    {user && (
      <span className={styles.user}>{userLogged.email}</span>
      )}
      <button className={styles.buttonLogout} onClick={logout}>Sair</button>
      </header>
    </div>
  )
}