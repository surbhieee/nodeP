const mongoose = require('mongoose');

let schema = mongoose.Schema;

let blogSchema = new schema(
    {
    blogId:{
        type:"number",
        unique:true
    },
    title:{
        type:"string",
        default:""
    },
    description:{
        type:"string",
        default:""
    }
    }
)

mongoose.model('blogInfo', blogSchema);