import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home/Home'
import MovieDetail from './screens/MovieDetail/MovieDetail'
import Login from './screens/Login/Login'
import UseAuth from "./components/UseAuth";
import Profile from "./screens/Profile/Profile";
import Header from "./components/Header/Header";
function App() {
    //pass the user info
    const currentUser = UseAuth()
    return (
        
        <div className="App">
            <BrowserRouter>
                <Header currentUser={currentUser}/>
                    <Routes>
                        <Route exact path="MovieReview" element={<Home/>}></Route>
                        <Route exact path="movie/:id" element={<MovieDetail />}></Route>
                        <Route exact path="movie/Profile" element={<Profile/>}></Route>
                        <Route exact path="movie/Login" element={<Login/>}></Route>
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;