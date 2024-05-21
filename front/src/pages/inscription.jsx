// Créer un formulaire avec:
// input pour email - Erreur: Email incorrecte !
// input pour username - Minimum 1 caractères: Erreur: Username obligatoire !
// input pour password - Minimum 6 caractères: Erreur: Mot de passe trop cours !
// input pour confirmer password - égale a password: Erreur: Les Mots de passe sont différent !
// bouton pour valider le formulaire

import { useState } from "react"

export default function Inscription(){

    const [mail, setMail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [username, setUsername] = useState('');

//! Récuperations des valeurs saisies

    const EmailValue = (e) =>{
       const email = e.target.value
       setMail(email)
       validateEmail(email);
    }

    const UsernameValue = (e) => {
        const value = e.target.value;
        setUsername(value);
      };

//! Vérifications des valeurs saisies

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
          setEmailError('Email incorrect !');
        } else {
          setEmailError('');
        }
      };

    const validateUsername = (username)=>{

    }

//! Affichages d'erreur si il y en a

      const handleSubmit = (e) => {
        e.preventDefault();
        if (emailError) {
          alert('Veuillez corriger les erreurs avant de soumettre le formulaire.');
        } else {
          console.log('Form submitted:', { mail });
        }
      };



    return(
    <div>
        <h2>Inscription</h2>
        <form>
            <input type="email" placeholder="Entrez votre email" onChange={EmailValue}/>
            <input type="username" placeholder="Entrez votre username" onChange={UsernameValue}/>
            <input type="password" placeholder="Entrez votre mot de passe"/>
            <input type="password" placeholder="Confirmez votre mot de passe"/>

            <input type="submit" value="Valider" onClick={handleSubmit}/>

        </form>

    </div>
    )
}