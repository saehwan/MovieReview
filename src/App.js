import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './screens/Login'
import Profile from './screens/Profile'
import Register from './screens/Register'
import Layout from './screens/Layout'
import Home from './screens/Home'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
