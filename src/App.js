import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import Login from './screens/Login/Login'
function App() {
    
    return (
        
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}></Route>
                    <Route path="movie/:id" element={<MovieDetail />}></Route>
                    <Route path="movie/Login" element={<Login/>}></Route>


                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
