import React from 'react'
import UseAuth from '../components/UseAuth'
import { signOut} from 'firebase/auth';
import { auth} from "../firebase-config";
import { useNavigate, Navigate  } from "react-router-dom"

function Profile() {
    const navigate = useNavigate()
    const currentUser = UseAuth()
    const logout = async () => {
        try {
             await signOut(auth);
             alert("logout")
             navigate("/movie/Login")
        } catch (error) {
             console.log('error: ', error);
        }
   }
    return  (
        <div>
            {currentUser &&
                <>
                    <p>{`Signed In as ${currentUser.email}`}</p>
                    <button onClick={logout}>Sign Out</button>
                </>
            }
        </div>
        )
}



export default Profile