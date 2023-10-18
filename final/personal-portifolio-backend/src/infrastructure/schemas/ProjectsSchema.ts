import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true
    },
    projectLink:{
        type: String,
        required: true
    },
    imgLink:{
        type:String,
        required: true
    },

});
const ProjectSchema = mongoose.model("Project", schema);
export default ProjectSchema;