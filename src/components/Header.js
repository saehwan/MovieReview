import { useState } from "react";
import { Link } from "react-router-dom"

const Header = ({currentUser}) => {

    console.log(currentUser)
    return (
        <header className="center-max-size header">
            <Link to="/"><span className={"brand"}>Moovie The Doobie</span></Link>
            <p>{currentUser? `Welcome, ${currentUser.displayName}` : ""}</p>
            {currentUser ? <Link to="movie/Profile" ><span className={"Profile"}>Profile</span></Link>
                         : <Link to="movie/Login" ><span className={"brand"}>Login</span></Link>}
            
        </header>
    )

}

export default Header;