import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    userName : {
        type : String,
        required :true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    cPassword : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const client = mongoose.model('Client',clientSchema)
export default client;

