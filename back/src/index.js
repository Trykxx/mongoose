import express from "express";
import mongoose from "mongoose"
import { TodoModel } from "./database/todo-list.js";
import { todosRoute } from "./routes/todos-route.js";
import fs from "fs"

const MONGODB_URI = "mongodb://127.0.0.1:27017/todos";
const PORT = 3010;

const server = express();
server.use(express.json());

server.use('/api/todos', todosRoute) //*pour tous les url qui commencent par /api/todos il va executer le router

// server.get("/test",(req,res)=>{
//     const newTodo= new TodoModel({
//         title:'Titre test',
//         createdAt: new Date(),
//     })

//     await newTodo.save()
//     return res.json({res:"Message ajouté"})
// })

server.listen(PORT, function () {
    console.log("Serveur lancé");
    console.log(`http://localhost:${PORT}`);

    mongoose.connect(MONGODB_URI).then(()=>{
        console.log('Base de données connecté');
    }).catch((err)=>{
        console.log('Base de données non connecté');
        console.log(err);
    })
  });