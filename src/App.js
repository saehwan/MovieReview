import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Login from './screens/Login/Login'
import UseAuth from "./components/UseAuth";
import Profile from "./screens/Profile";
import Header from "./components/Header";
function App() {
    const currentUser = UseAuth()
    return (
        
        <div className="App">
            <BrowserRouter>
                <Header currentUser={currentUser}/>
                    <Routes>
                        <Route index element={<Home/>}></Route>
                        <Route exact path="movie/:id" element={<MovieDetail />}></Route>
                        <Route exact path="movie/Profile" element={<Profile/>}></Route>
                        <Route exact path="movie/Login" element={<Login/>}></Route>
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
