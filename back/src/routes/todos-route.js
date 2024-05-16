import express from "express";
import { TodoModel } from "../database/todo-list.js";

export const todosRoute = express.Router();

//* Exercice 1:
//! Créer une route sur la mathode post avec l'url'/'
todosRoute.post("/", async (req, res) => {
  //! Récuperer les données du body: title;
  const dataBody = req.body;
  //! Tester si dans le body y'a title:
  if (!dataBody.title) {
    //! Si pas title retourne 400 avec erreur
    return res.status(400).json({ error: "titre obligatoire" });
  }
  //! Sinon: Creer une todoliste
  const newTodoList = new TodoModel({
    title: dataBody.title,
    createdAt: new Date(),
  });
  //! Enregistrer la todolist dans la base de données
  const todoListAjouter = await newTodoList.save();
  //! Retourner en JSON la nouvelle todolist ajouté
  return res.json({ todo: todoListAjouter });
});

//* Exercice 2:
// 1. Ajouter un route "GET" sur l'url "/"
todosRoute.get("/", async (req, res) => {
  // 2. Lire la doc de mongoose pour apprendre a récuperer tous les document du collection.
  // 3. Utiliser le model pour récuperer toutes les todos de la DB
  const todosDB = await TodoModel.find();
  // 4. Retourner la liste de toutes les todos.
  return res.json({ todosDB });
});

//* Exercice 3:
// 1. Ajouter un route sur '/api/todos/id',
// todosRoute.get("/:id", async (req, res) => {
//   // 2. Récuperer l'id depuis les paramètre d'url
//   const idUrl = req.params.id;
//   // 3. Utiliser le model pour récuperer la todo avec son id
//   const todosId = await TodoModel.findOne({ _id: idUrl });
//   // 4. Si la todo n'existe pas retourner 404
//   if (!todosId) {
//     return res.status(400).json({ error: "La todo n'existe pas" });
//     // 5. Si la todo exist retourner la todo
//   } else {
//     return res.json({ todosId });
//   }
// });

//* Autre méthode :

// todosRoute.get("/:id", async (req, res) => {
//   const idUrl = req.params.id;

//   const todosId = await TodoModel.findById(idUrl).exec();

//   if (!todosId) {
//     return res.status(400).json({ error: "La todo n'existe pas" });
//   } else {
//     return res.json({ todosId });
//   }
// });

//* Exercice 4:
// 1. Créer la route '/api/todos/id'
todosRoute.put("/:id", async (req, res) => {
  // 2. Récuperer l'id dans les paramètre d'url
  const urlId = req.params.id;
  // 3. Récuperer le titre dans les body de la requete
  const bodyTitle = req.body.title;
  // 4. Récuperer la todo avec son id
  const todosRecup = await TodoModel.findById(urlId).exec();
  // 4.1 Si elle existe pas, retourner 404
  if (!todosRecup) {
    return res.status(400).json({ error: "La todo n'existe pas" });
  }
  // 4.2 Si elle existe;
  // 4.2.1: Mettre a jour le titre de la todolist
  // 4.2.1: Retourner la todolist
  else {
    const todoModifie = await TodoModel.updateOne(
      { _id: urlId },
      { $set: { title: bodyTitle } }
    );
    return res.json(todoModifie);
  }
});

//* Exercice 5:

// // 1. Ajouter un route Delete avec id dans les paramètre
// todosRoute.delete("/:id", async (req, res) => {
//   const urlId = req.params.id;

// // 2. Récuperer la tache avec ID
//   const todosRecup = await TodoModel.findById(urlId);

// // 3. 404 si ell n'existe pas
//   if (!todosRecup) {
//     return res.status(400).json({ error: "La todo n'existe pas" });

//     // 4. La supprimer si elle existe
//   } else {
//     await TodoModel.deleteOne({ _id: urlId });

//     // 5. Retourner un message.
//     return res.end("Todo supprimé");
//   }
// });

// 1. Ajouter un route Delete avec id dans les paramètre
todosRoute.delete("/:id", async (req, res) => {
  const urlId = req.params.id;

// 2. Récuperer la tache avec ID
  const todosRecup = await TodoModel.findById(urlId);

// 3. 404 si elle n'existe pas
  if (!todosRecup) {
    return res.status(400).json({ error: "La todo n'existe pas" });

    // 4. La supprimer si elle existe
  } else {
    await TodoModel.deleteOne({ _id: urlId });

    // 5. Retourner un message.
    return res.end("Todo supprimé");
  }
});

//* operation sur les listes -> Ajouter une todo a un element
todosRoute.post("/:id/todo",async (req,res)=>{
    const todoListId = req.params.id
    const todoTitle = req.body.title

    const todoList = await TodoModel.findById(todoListId);

    if (!todoList) {
    return res.status(400).json({ error: "La todo n'existe pas" });
    }

    todoList.todos.push({title:todoTitle})
    await todoList.save()

    return res.json(todoList)
})

//* recuperer une todo d'un element
todosRoute.get("/:listID/todo/:todoID", async(req,res)=>{
    const{ listID, todoID} = req.params
    const todoList = await TodoModel.findById(listID)

    if(!todoList){ return req.status(404).json({error: "Todolist introuvable"})}

    const todo = todoList.todos.id(todoID)

    return res.json(todo)
})

//* Modifier une todo
todosRoute.put("/:listID/todo/:todoID", async(req,res)=>{
    const{ listID, todoID} = req.params
    const{ title, isDone} = req.body

    const todoList = await TodoModel.findById(listID)

    if(!todoList){ return req.status(404).json({error: "Todolist introuvable"})}

    const todo = todoList.todos.id(todoID)
    //! changer obligatoirement titre et isDone
    // todo.set({
    //     title:title,
    //     isDone:isDone
    // })
    //! changer soit l'un soit l'autre
    todo.set({
        title: title ? title : todo.title,
        isDone: isDone != undefined ? isDone : todo.isDone
    })
    await todoList.save()
    return res.json({message:"Todo modifié"})
})

todosRoute.delete("/:listID/todo/:todoID", async(req,res)=>{
    const{ listID, todoID} = req.params

    const todoList = await TodoModel.findById(listID)

    if(!todoList){
        return req.status(404).json({error: "Todolist introuvable"})
    }

    const todo = todoList.todos.id(todoID)

    todoList.todos.pull(todo)
    await todoList.save()

    return res.json({message:`Tache avec l'id: ${todoID} supprimé`})
})

