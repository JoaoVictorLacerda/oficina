import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique:true
    },
    imageLink:{
        type:String,
        required: true
    },

});
const SkillSchema = mongoose.model("Skill", schema);
export default SkillSchema;