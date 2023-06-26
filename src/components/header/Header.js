import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <Link to="/movies/Login" style={{textDecoration: "none"}}><span>Login</span></Link>
                <Link to="/movies/Profile" style={{textDecoration: "none"}}><span>Profile</span></Link>
                <Link to="/movies/Register" style={{textDecoration: "none"}}><span>Register</span></Link>

            </div>
        </div>
    )
}

export default Header