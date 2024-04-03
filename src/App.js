import './App.css';
import Login from "../src/components/Login/Login"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Profile from './components/Profile/Profile';
import Posts from './components/Post/Posts';
import Personal from './components/Personal infor/basicinfor';
import EditProfile from './components/EditProfile/EditProfile';
import Finding from './components/Finding/Finding';
import Allpost from './components/Post/Allpost';
import Messenger from './components/Messenger/Messenger';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/posts/:groupId" element={<Posts />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/finding" element={<Finding />} />
        <Route path="/allpost/:groupId" element={<Allpost />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/messenger/:id" element={<Messenger />} />
      </Routes>
    </Router>
  );
}

export default App;
