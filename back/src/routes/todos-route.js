import express from "express"
import { TodoModel } from "../database/todo-list.js";

export const todosRoute = express.Router();

//* Exercice 1:
//! Créer une route sur la mathode post avec l'url'/'
todosRoute.post("/",async (req,res)=>{
//! Récuperer les données du body: title;
    const dataBody = req.body
//! Tester si dans le body y'a title:
    if (!dataBody.title) {
//! Si pas title retourne 400 avec erreur
        return res.status(400).json({ error: "titre obligatoire" });
    }
//! Sinon: Creer une todoliste
    const newTodoList = new TodoModel({
        title:dataBody.title,
        createdAt: new Date(),
    })
//! Enregistrer la todolist dans la base de données
    const todoListAjouter = await newTodoList.save()
//! Retourner en JSON la nouvelle todolist ajouté
    return res.json({todo:todoListAjouter})
})
