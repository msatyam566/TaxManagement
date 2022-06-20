const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const userSchema = new mongoose.Schema({
    Name : { type:String, required: true},

    email:{ type:String, required:true, unique:true, trim:true},

    password: { type:String, required:true },

    role:  {type:String, required:true, enum : ["taxpayer","taxAccountant", "admin"]},
    
    panNumber :{type:String, required :true },
    
    city : {type:String , required:true}
    
    },{timestamps:true});



    module.exports = mongoose.model("userSchema", userSchema)