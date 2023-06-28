import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
function App() {

    return (
        
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}></Route>
                    <Route path="movie/:id" element={<MovieDetail />}></Route>


                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
