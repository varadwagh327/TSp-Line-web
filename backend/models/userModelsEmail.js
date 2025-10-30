import mongoose from "mongoose";

const userSchemaEmail = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Provide name"]
    },
    email : {
        type : String,
        required : [true, "Provide email"],
        unique: false,
    },
    title : {
        type : String,
        required : [true, "Provide Title"]
    },
    description : {
        type : String,
        required : [true, "Provide Title"]
    }
})

const UserModel = mongoose.model('EmployeeEmail', userSchemaEmail);

export default UserModel;