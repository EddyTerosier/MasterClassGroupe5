import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import "./Header.css"

function LOG(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction pour gérer la connexion et la déconnexion
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // Inverse l'état de connexion
  };

  return isLoggedIn ? "Déconnexion" : "Connexion";
}

const Layout = () => {
  const log = LOG();
  
  return (
    <>
    
  

<nav>
	  <a href="/">Accueil</a>
      <a href="/Login">{log}</a>
	<div class="animation start-home"></div>
</nav>



      <Outlet />
    </>
  )
};

export default Layout;
