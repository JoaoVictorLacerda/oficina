import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: false
    },
    linkedinLink:{
        type:String,
        required: true
    },
    facebookLink:{
        type:String,
        required: true
    },
    instagramLink:{
        type:String,
        required: true
    },
    imageLink:{
        type:String,
        required: false  
    }

});
const UserAdmSchema = mongoose.model("UserAdm", schema);
export default UserAdmSchema;