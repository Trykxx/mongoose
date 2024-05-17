import { useEffect} from 'react'
import './App.css'
import {TodoList} from './components/Todolist.jsx'

function App() {

  return (
      <div>
        <h1>Hello</h1>
        <TodoList></TodoList>
      </div>
  )
}

export default App

// Créer un composant /components/TodoList.jsx
// Il 'yaura un input et un bouton
// Quand on clique sur le bouton, afficher dans une alerte l'entrée de l'utilisateur

