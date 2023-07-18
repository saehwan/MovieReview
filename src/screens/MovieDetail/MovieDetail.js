import React, {useEffect, useState, useId} from "react"
import "./MovieDetail.css"
import { useParams } from "react-router-dom"
import Youtube from 'react-youtube'
import {db} from "../../firebase-config"
import { collection, getDoc, getDocs, doc, deleteDoc, setDoc} from "firebase/firestore";
import UseAuth from "../../components/UseAuth"


const MovieDetail = () => {
    // pass the user info
    const currentUser = UseAuth()

    const [movie, setMovie] = useState()
    const { id } = useParams() // 
    const [trailer, setTrailer] = useState('')

    const [favorites, setFavorites] = useState([]);
    const [inFavorite, setInFavorite] = useState(false)

    const usersCollectionRef = collection(db, "users");

    useEffect(async ()=> {
        if(currentUser){
            const getUsers = async () => {
                // use getDocs to bring date into collection 
                 const data = await getDocs(usersCollectionRef);
                 // add data into exist data in the user, overwriting id 
                 setFavorites(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
            }
            getUsers();
            // check whether specific data is in the database or not
            const docSnap = await getDoc(doc(db, `users/${currentUser.uid}/favoriteMovies`, id))
            console.log(docSnap.data())
            setInFavorite(!!docSnap.exists())
        }}
    )

    useEffect(() => {
        getData()
        console.log(movie)
        window.scrollTo(0,0)
    }, [currentUser])


    useEffect(()=>{
        if (movie) {
            const trailer = movie.videos.results.find(vid => vid.name.includes("Official Trailer") || vid.name.includes("Teaser")).key
            setTrailer(trailer ? trailer : movie.videos.results[0])
        }
    },[movie])

   
    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2d30858c3b61b7bbbb750cb8e4f86e30&append_to_response=videos`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMovie(data)})
        
    }

    const addFavorite = async () =>{
        // with setDoc add data with specific key value in the collection.
        await setDoc(doc(db, `users/${currentUser.uid}/favoriteMovies`, id), {
            original_title: movie.original_title,
            id:  movie.id,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview
        });
        // state change for refreshing screen
        setInFavorite(true)
    }

    const deleteFavorite = async(id) =>{
        // find db collection with specific data id
        const favoritesDoc = doc(db, `users/${currentUser.uid}/favoriteMovies`, id);
        // delete data with deleteDoc
        await deleteDoc(favoritesDoc);
        // state change for refreshing screen
        setInFavorite(false)

    }
    
    return trailer==='' ? <div>sorry no movie information</div> : (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${movie ? movie.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        
                        <div className="movie__name">{movie ? movie.original_title : ""}</div>
                        <div className="movie__tagline">{movie ? movie.tagline : ""}</div>
                        <div className="movie__rating">
                            {movie ? movie.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{movie ? "(" + movie.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{movie ? movie.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{movie ? "Release date: " + movie.release_date : ""}</div>
                        <div>
                            <Youtube
                                videoId={trailer}
                                    />
                        </div>
                        <div className="movie__genres">
                            {
                                movie && movie.genres
                                ? 
                                movie.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{movie ? movie.overview : ""}</div>
                    </div>
                    <div>
                        {inFavorite ?
                        <button className="Undo favorite" onClick={()=>deleteFavorite(id)} >
                                Undo favorite
                        </button>
                            :
                        <button className="favorite" onClick={addFavorite}>
                                favorite
                        </button>
                    }
                    </div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    movie && movie.homepage && <a href={movie.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    movie && movie.imdb_id && <a href={"https://www.imdb.com/title/" + movie.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    movie && movie.production_companies && movie.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieDetail