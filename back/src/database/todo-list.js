import mongoose from "mongoose";
// definir un schema
const TodoListSchema = mongoose.Schema({
    title: { type:String, required:true},
    createdAt: { type:Date},
    todos: [
        {
            title: {type:String, required:true},
            isDone: {type:Boolean, required:true, default: false}
        }
    ]
})

//exporter le model pour etre utilisé ailleurs
export const TodoModel = mongoose.model("todolist",TodoListSchema)