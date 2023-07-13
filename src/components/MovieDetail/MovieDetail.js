import React, {useEffect, useState} from "react"
import "./MovieDetail.css"
import { useParams } from "react-router-dom"
import Youtube from 'react-youtube'
import { Link } from "react-router-dom"


const MovieDetail = () => {
  

    const [movie, setMovie] = useState()
    const { id } = useParams() // 이걸 어떻게 사용할수있지않을까?
    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState('')
    const [favourites, setFavourites] = useState([]);



    useEffect(() => {
        getData()
        console.log(movie)
        window.scrollTo(0,0)
    }, [])

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

    const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};
    
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
                        <button 
                                className="favorite" 
                                onClick={addFavouriteMovie}>
                            favorite
                        </button>
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