import mongoose from "mongoose"

const { Schema } = mongoose

const studentSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const Student = mongoose.model("Student", studentSchema)

export default Student