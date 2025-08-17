import mongoose from "mongoose";

const userSchemaEmail = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Provide name"]
    },
    email : {
        type : String,
        required : [true, "Provide email"],
        unique : true
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

const UserModel = mongoose.model('Users', userSchemaEmail);

export default UserModel;