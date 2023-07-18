import React from 'react'
import UseAuth from '../../components/UseAuth'
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom"
import { collection, getDocs, doc, deleteDoc} from "firebase/firestore";
import { db } from '../../firebase-config'
import { useState, useEffect} from 'react';
import { Link } from "react-router-dom"
import './Profile.css'
function Profile() {
    const navigate = useNavigate()
    const currentUser = UseAuth()
    const [changed, setChanged] = useState(false);
    const [users, setUsers] = useState([]);
    
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
        // getDocs로 컬렉션안에 데이터 가져오기
        if (currentUser) {
            // const usersCollectionRef = collection(db, `users/${currentUser.uid}/likes`);
            // console.log(currentUser)
            const data = await getDocs(collection(db, `users/${currentUser.uid}/favoriteMovies`));
            // data.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data())
            // })
            // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
            setUsers(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
        }
    }

    useEffect(() => {
        getUsers();
        setChanged(false)
    }, [currentUser, changed])

    const logout = async () => {
        try {
            await signOut(auth);
            alert("logout")
            navigate("/movie/Login")
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const deleteFavorite = async(id) =>{
        // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
        const favoritesDoc = doc(db, `users/${currentUser.uid}/favoriteMovies`, id);
        // deleteDoc을 이용해서 삭제
        await deleteDoc(favoritesDoc);
        // 화면 업데이트를 위한 state 변경
        await setChanged(true)
        console.log(true)
    }

    const showFavorites = users.map((movie) => (
        <div>
            <Link 
                to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
                <div onClick={() => window.scrollTo(0, 0)} className={"movie"}>
                    <div className="cards">
                    <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path :""}`} />
                    <div className="cards__overlay">
                        <div className="card__title">{movie ? movie.original_title : ""}</div>
                        <div className="card__runtime">
                            {movie ? movie.release_date : ""}
                            <span className="card__rating">{movie ? movie.vote_average : ""}<i className="fas fa-star" /></span>
                        </div>
                        <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                    </div>
                    </div>
                </div>
            </Link>
            <button onClick={()=>{deleteFavorite(movie.id)}}>Delete Movie</button>
        </div>
                                                ))
    
    return (
        <div>
            <div>
                {currentUser &&
                    <>
                        <p>{`Signed In as ${currentUser.email}`}</p>
                        <button onClick={logout}>Sign Out</button>
                    </>
                }
            </div>
            <div>
                {showFavorites}
            </div>
        </div>
    )
}



export default Profile