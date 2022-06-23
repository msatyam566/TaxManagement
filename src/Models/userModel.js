const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const userScehma1 = new mongoose.Schema({
    Name : { type:String, required: true},

    email:{ type:String, required:true, unique:true, trim:true},

    password: { type:String, required:true , minLen: 8, 
        maxLen: 15},

    role:  {type:String, required:true, enum : ["taxpayer","taxAccountant", "admin"]},
    
    panNumber :{type:String, required :true },
    
    city : {type:String , required:true},


    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    
    },{timestamps:true});



    module.exports = mongoose.model("userScehma1", userScehma1)