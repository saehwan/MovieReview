import {useEffect} from "react"
import Swiper from '../components/Carousel/Swiper'
import { Link } from "react-router-dom"

const Header = ({currentUser, fetchMovies, setSearchKey}) => {
   

    return (
        <header className="center-max-size header">
            <Link to="/"><span className={"brand"}>Moovie The Doobie</span></Link>
            {currentUser ? <Link to="movie/Profile" ><span className={"Profile"}>Profile</span></Link>
            :<Link to="movie/Login" ><span className={"brand"}>Login</span></Link>}
            <form className="form" onSubmit={fetchMovies}>
                <input className="search" type="text" id="search"
                        onInput={(event) => setSearchKey(event.target.value)}/>
                <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
            </form>
        </header>
    )

}

export default Header;