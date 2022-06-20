const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const taxSchema = new mongoose.Schema({

   userId : {type:Object, required:true, ref:"userModel"},

   totalSales : {type:Number,required:true},

   city : {type:String,required:true},

   date: { type:Date,required:true},

   dueDate : {required:true, type:Boolean},

   taxtype : {type:String,required:true, enum:["SGST","CGST","StateTax","Centraltax"]},

   taxpercent: {type:String,enum:["5","12","18","28"]},

   status:{type:String,enum:['New','paid','delayed']},

   taxDue:{type:String,enum:['delayed','new']}     //by tax accountant


    
   },{timestamps:true});



   module.exports = mongoose.model("taxSchema", taxSchema)