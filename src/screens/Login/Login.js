import React, { useState } from 'react'
import { signInWithRedirect, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth';
import { auth, db, provider } from "../../firebase-config";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom"
import {useEffect} from 'react'
import  UseAuth  from '../../components/UseAuth'

const Login = () => {
     const navigate = useNavigate()

     const currentUser = UseAuth()
     // * Signup with email and password States
     const [emailSignUp, setEmailSignUp] = useState('')
     const [passwordSignUp, setPasswordSignUp] = useState('')

     // * Signin with email and password States
     const [emailSignIn, setEmailSignIn] = useState('')
     const [passwordSignIn, setPasswordSignIn] = useState('')

     useEffect(async () =>{
          const result = await getRedirectResult(auth)
          if (result) {
               navigate("/")
          }
     })
     
     // * Signup function with email and password
     const Signup = async () => {
          try {
               const email = emailSignUp;
               const password = passwordSignUp;

               const userCredential = await createUserWithEmailAndPassword(auth, email, password)
               const user = userCredential.user;

               const usersCollectionRef = doc(db, 'users', user.uid);
               await setDoc(usersCollectionRef, { email, password })

               setEmailSignUp("");
               setPasswordSignUp("");
          } catch (error) {
               console.log('error: ', error);
          }
     }

     // * SignIn function with email and password
     const SignIn = async () => {
          try {
               const email = emailSignIn;
               const password = passwordSignIn;

               const userCredential = await signInWithEmailAndPassword(auth, email, password);
               const user = userCredential.user;

               setEmailSignIn("")
               setPasswordSignIn("")
          } catch (error) {
               console.log('error: ', error);
          }
     }

     // * SignIn with Google
     const signInWithGoogle = async () => {
          try {
               const userCredential = await signInWithRedirect(auth, provider)
               const user = userCredential.user
               const name = user.displayName;
               const email = user.email;
               const profilePic = user.photoURL;

               const usersCollectionRef = doc(db, 'users', user.uid);
               await setDoc(usersCollectionRef, { email, googleAuth: true });
          } catch (error) {
               console.log('error: ', error);
          }
     }

     // * Logout
     const logout = async () => {
          try {
               await signOut(auth);
               alert("logout")
          } catch (error) {
               console.log('error: ', error);
          }
     }

     return (
     <div className="Login">
     
     <div>
     <h3> Login </h3>
          <input type='email' placeholder='Email' value={emailSignUp} my='2' onChange={e => setEmailSignUp(e.target.value)} />
          <input type='password' placeholder='Password' my='2' value={passwordSignUp} onChange={e => setPasswordSignUp(e.target.value)} />
     
          <button onClick={Signup}>Sign Up</button>
          <button my='2' onClick={signInWithGoogle}>Sign In Google</button>
          </div>
          <div>
          <h3>Sign In</h3>
          <input type='email' placeholder='Email' value={emailSignIn} my='2' onChange={e => setEmailSignIn(e.target.value)} />
          <input type='password' placeholder='Password' my='2' value={passwordSignIn} onChange={e => setPasswordSignIn(e.target.value)} />
          <button onClick={SignIn}>Sign In</button>
          <button my='2' onClick={signInWithGoogle}>Sign In Google</button>
          <button m='2' onClick={logout}>Logout</button>
          </div>
          <div>
               {currentUser &&
                    <>
                         <p>{`Signed In as ${currentUser .email}`}</p>
                         <button onClick={logout}>Sign Out</button>
                    </>
               }
          </div>
          </div>
     )
}

export default Login