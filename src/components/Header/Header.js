import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import './Header.css'
const Header = ({currentUser}) => {
    // check user info 
    console.log(currentUser)


    let navigate = useNavigate(); 

    const routeLogin = () =>{ 
        let path = `movie/Login`; 
        navigate(path);
    }
    const routeProfile = () =>{ 
        let path = `movie/Profile`; 
        navigate(path);
    }
    return (
        <header className="headerContainer">
            <Link to="/"><span className={"brand"}>Moovie The Doobie</span></Link>
            <p>{currentUser? `Welcome, ${currentUser.displayName}` : ""}</p>
            {currentUser ? <button onClick={routeProfile}>Profile</button>
                         : <button onClick={routeLogin}>Login</button>}
            
            
        </header>
    )

}

export default Header;

//my movie fit