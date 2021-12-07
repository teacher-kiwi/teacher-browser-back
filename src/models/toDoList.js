import mongoose from "mongoose"

const { Schema } = mongoose

const toDoListSchema = new Schema({
  toDo: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    default: false
  }
})

const ToDoList = mongoose.model("ToDoList", toDoListSchema)

export default ToDoList