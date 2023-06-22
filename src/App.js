import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './screens/home/Home';
import MovieList from './components/movieList/MovieList';
import Movie from './screens/movieDetail/Movie';
import Login from "./components/header/Login";
import Profile from "./components/header/Profile"
import Register from "./components/header/Register"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="movies/login" element={<Login/>}></Route>
          <Route path="movies/Profile" element={<Profile/>}></Route>
          <Route path="movies/Register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
