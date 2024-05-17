import { useState, useEffect } from "react";

export function TodoList() {
  const [texte, setTexte] = useState("");
  const [{ success, content }, setMessage] = useState({
    success: true,
    content: "",
  });
  const [listeTodo, setlisteTodo] = useState([]);

  function inputChange(e) {
    setTexte(e.target.value);
  }

  useEffect(() => { //! on l'utilise la plupart du temps pour faire des requetes http, exécuter des fonctions/actions quand il y a des modifications
    async function liste() {
      const todoliste = await fetch("/api/todos");//! Par default fetch fait un GET
      const tableau = await todoliste.json(); //! Transforme en JS
      setlisteTodo(tableau.todosDB); //! Mets le tableau dans ma variable d'etat
    }
    liste()
  }, []); //! Tableau de dependances = depend du changement de variable


  async function EnvoiTache() {
    if (texte === "") {
      return setMessage({ success: false, content: "Titre obligatoire" });
    }
    const reponse = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: texte }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const newTodo = await reponse.json();
    setlisteTodo([...listeTodo, newTodo.todo])
    //! ...listeTodo = recupere l'ancien tableau puis on rajoute le nouveau

    return setMessage({ success: true, content: "Tâche ajoutée" });
  }

  async function deleteTodo(id){
    const reponse = await fetch('/api/todos/' + id, {
        method:'DELETE'
    })
    const newTodosList = listeTodo.filter((ele)=>{ return ele._id != id})
    console.log(newTodosList);
    setlisteTodo(newTodosList)
  }
  return (
    <div>
      <input
        onChange={inputChange}
        type="text"
        style={{ padding: "10px", borderColor: "purple", borderRadius: "10px" }}
      />
      <button onClick={EnvoiTache}>Ajouter une tache</button>
      <p style={{ color: success ? "green" : "red" }}>{content}</p>
      <ul>
        {listeTodo.map((taches) => (
          <li key={taches._id}>{taches.title} <button onClick={()=>deleteTodo(taches._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

//* Exercice:
// Utiliser le useEffect et fetch pour récuperer les listes de tache
// Stocker les liste de taches dans une variable d'état
// Utiliser un boucle pour afficher chaque liste de taches

//* Exercice:
// 1. Ajouter une bouton supprimer pour chaque tache
// 2. Créer une fonction qui reçoit l'id de la tache
// 3. Utiliser fetch pour envoyer une requete DELETE a la back end
// 4. Lier cette fonction avec les bouton de chaque taches