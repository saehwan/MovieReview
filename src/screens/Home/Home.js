import {useEffect, useState} from "react"
import '../../screens/Home/Home.css'
import axios from 'axios'
import MovieCard from "../../components/MovieCard/MovieCard"
import Swiper from '../../components/Carousel/Swiper'

function Home() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "2d30858c3b61b7bbbb750cb8e4f86e30"

    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})
    const [value, setValue] = useState("")
    // fetch the movies when page first roaded
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
        setMovies(data.results)
        setMovie(data.results[0])
        setSearchKey("")
    }

    const selectMovie = (movie) => {
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
