
import Home from "./components/home/Home.js";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js"
import Profile from "./components/profile/Profile.js"
import NewAdoption from "./components/newAdoption/NewAdoption.js";
import NewLost from "./components/newLost/NewLost.js";
import Login from "./components/login/Login.js"
import EditPage from "./components/editPage/EditPage.js"
import View from "./components/view/View.js";
import SignIn from "./components/signinpage/SigninPage.js";
import Adoption from "./components/adoption/Adoption.js";
import Lost from "./components/lost/Lost.js";
import About from "./components/About/About.js";
import SignUpModal from "./components/singUpModal/SignUpModal.js";
import LoginModal from "./components/loginModal/LoginModal.js";
import { HashRouter } from 'react-router-dom';


import React,{ useState,useEffect } from "react";
import {
  Route,
  Routes,

} from "react-router-dom";
import './App.css';
import { ThemeContext } from "./components/Context/theme";
import { FcAbout } from "react-icons/fc";



function App() {
  const[port,setPort]=useState('3000');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user,setUser]=useState(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log("Stored User:😊😊😊😊😊", storedUser);
    return storedUser ? JSON.parse(storedUser) : ''; // Parse the stored user data
  });
  const [load, upadateLoad] = useState(true);
  const [{ themename }] = React.useContext(ThemeContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleOpenLogin = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false); // Ensure signup modal is closed

    console.log("showLoginModal:",showLoginModal);
    console.log("showSignUpModal:",showSignUpModal);
  };

  const handleOpenSignUp = () => {
      setShowSignUpModal(true);
      setShowLoginModal(false); // Ensure login modal is closed
      console.log("showLoginModal:",showLoginModal);
      console.log("showSignUpModal:",showSignUpModal);
  };

  // Function to set the token
  const handleLogin = (token,user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    console.log("User:😊😊😊😊😊", JSON.stringify(user));
    sessionStorage.setItem('user', JSON.stringify(user));
   
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);





  return (
      <HashRouter>
      <div className={`${themename} app`} >
        <Navbar token={token} port={port} user={user} handleLogin={handleLogin} handleOpenLogin={handleOpenLogin} handleOpenSignUp={handleOpenSignUp}  />
        <Routes>
          <Route exact path="/" element={<Home port={port} token={token}/>} />
          <Route path="/profile" element={<Profile port={port} token={token} user={user}/>}/>
          <Route path="/newAdoption" element={<NewAdoption token={token} port={port} user={user}/>}/>
          <Route path="/newLost" element={<NewLost token={token} port={port} user={user}/>}/>
          <Route path="/login" element={<Login port={port} handleLogin={handleLogin}/>}/>
          <Route path="/signin" element={<SignIn port={port} handleLogin={handleLogin}/>}/>
          <Route path="/edit/:ad_type/:ad_id" element={<EditPage token={token} port={port} />} />
          <Route path="/view/:ad_type/:ad_id" element={<View token={token} port={port} />} />
          <Route path="/adoption" element={<Adoption port={port}/>} />
          <Route path="/lost" element={<Lost port={port}/>} />
          <Route path="/about" element={<About port={port}/>} />
          
        </Routes>
        <Footer/>
        <LoginModal show={showLoginModal || showSignUpModal} onClose={() => {
                        setShowLoginModal(false);
                        setShowSignUpModal(false);
                    }} handleLogin={handleLogin}  port={port} />
       
       
      </div>
      </HashRouter>
    
    
  );
}

export default App;
