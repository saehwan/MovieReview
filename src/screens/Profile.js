import React from 'react'
import UseAuth from '../components/UseAuth'
import { signOut} from 'firebase/auth';
import { auth} from "../firebase-config";
function Profile() {

    const currentUser = UseAuth()
    const logout = async () => {
        try {
             await signOut(auth);
             alert("logout")
        } catch (error) {
             console.log('error: ', error);
        }
   }
    return  (
        <div>
        {currentUser  ? (
          <>
            <p>{`Signed In as ${currentUser .email}`}</p>
            <button onClick={logout}>Sign Out</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
        )
}



export default Profile