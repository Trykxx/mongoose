import {createContext, useEffect, useState }from "react";
import "./App.css";
import {BrowserRouter, Link, Route, Routes }from "react-router-dom";
import Home from "./pages/home";
import Inscription from "./pages/inscription";
import Connexion from "./pages/connexion";
import Profile from "./pages/profile";

export const UserContext = createContext();

function App() {

  const [user,setUser]=useState(null)

  useEffect(()=>{

    const token = localStorage.getItem('access_token')
    async function getUser(){
      if (!token) return
      const reponse = await fetch('/api/users/me',{
        headers:{
          Authorization:'Bearer ' + token
        }
      })
      const data = await reponse.json()
      console.log(data);
      setUser(data.user)
    }
    getUser()
  },[])

  function Logout() {
    localStorage.removeItem('access_token')
    setUser(null)
  }
  return (
    <UserContext.Provider value={{user:user,setUser:setUser}}>
      <BrowserRouter>
      <nav>
        <Link to={"/"}>Accueil</Link>
        {
          !user ?
            <>
              <Link to={"/inscription"}>Inscription</Link>
              <Link to={"/connexion"}>Connexion</Link>
            </> :
            <div style={{display:'flex'}}>
              <Link to={"/profile"}>Profile</Link>
              <button onClick={Logout}>Déconnexion</button>
            </div>

        }
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/inscription" element={<Inscription />}/>
        <Route path="/connexion" element={<Connexion />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>

  );
}
export default App;
// Créer un composant /components/TodoList.jsx
// Il y'aura un input et un bouton
// Quand on clique sur le bouton, afficher dans une alerte l'entrée de l'utilisateur