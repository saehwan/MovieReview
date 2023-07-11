import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Login from './screens/Login/Login'
import UseAuth from "./components/UseAuth";
import Profile from "./screens/Profile";
function App() {
    const currentUser = UseAuth()
    return (
        
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}></Route>
                    <Route path="movie/:id" element={<MovieDetail />}></Route>
                    <Route path="movie/Profile" element={<Profile/>}></Route>
                    <Route path="movie/Login" element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
