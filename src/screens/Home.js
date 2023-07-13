import {useEffect, useState} from "react"
import '../screens/Home.css'
import axios from 'axios'
import MovieCard from "../components/MovieCard/MovieCard"
import Swiper from '../components/Carousel/Swiper'
import { Link } from "react-router-dom"
import UseAuth from "../components/UseAuth"
import Header from "../components/Header"

function Home() {
    const currentUser = UseAuth()
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "2d30858c3b61b7bbbb750cb8e4f86e30"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})
    
    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })
        //console.log(data.results)
        setMovies(data.results)
        setMovie(data.results[0])
    }

    const selectMovie = (movie) => {
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <MovieCard
                selectMovie={selectMovie}
                key={movie.id}
                movie={movie}
            />
        ))
    )

    return (
        <div className="Home">
            {/* <header className="center-max-size header">
                <Link to="/"><span className={"brand"}>Moovie The Doobie</span></Link>
                {currentUser ? <Link to="movie/Profile" ><span className={"Profile"}>Profile</span></Link>
                :<Link to="movie/Login" ><span className={"brand"}>Login</span></Link>}
                <form className="form" onSubmit={fetchMovies}>
                    <input className="search" type="text" id="search"
                           onInput={(event) => setSearchKey(event.target.value)}/>
                    <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </header> */}
            
                <main>
                    <Swiper/> 
                    <form className="form" onSubmit={fetchMovies}>
                        <input className="search" type="text" id="search"
                            onInput={(event) => setSearchKey(event.target.value)}/>
                        <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <div className={"center-max-size container"}>
                        {renderMovies()}
                    </div>
                </main>
        </div>
    );
}

export default Home;
