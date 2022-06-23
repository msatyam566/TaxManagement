const taxModel = require("../Models/TaxModel")
const userModel = require("../Models/userModel")

const isValidrole = (input) => ["taxpayer","taxAccountant", "admin"].indexOf(input) !== -1


const CreateTax = async(req,res)=>{
try {
let CreateTaxBody = req.body
let {userId,totalSales,city,date,dueDate,taxtype,taxpercent,status,taxDue}=CreateTaxBody


if(!CreateTaxBody){
    return res.status(400).send({ status: false, message: "please provide Data" })

  //====================== validations for USER ============================//

}
if(!userId){
    return res.status(400).send({status:false,messege: "please provode userId"})

}
const userDetails = await userModel.findById(userId)
    if(!userDetails){

        return res.status(404).send({status:false,messege:"no such user found please check userid "})
    }

    else{
        if(userDetails.role=='admin'||userDetails.role=='taxAccountant'){

            return res.status(404).send({status:false,messege:"you are not authorized to do this task "})
        }
    }
    //==========================================================================================//

if (!totalSales) {
    return res.status(400).send({ status: false, message: "please provide user totalSales" })
}
if (!city) {
    return res.status(400).send({ status: false, message: "please provide user city" })
}
if (!date) {
    return res.status(400).send({ status: false, message: "please provide user date" })
}
if(!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)){
    return res.status(400).send({status:false,message:"please provide a valid date"})
}

if (!dueDate) {
    return res.status(400).send({ status: false, message: "please provide user dueDate" })
}
if (!taxtype) {
    return res.status(400).send({ status: false, message: "please provide user taxtype" })
}
if (!taxpercent) {
    return res.status(400).send({ status: false, message: "please provide user taxpercent" })
}
if (!status) {
    return res.status(400).send({ status: false, message: "please provide user status" })
}
if (!taxDue) {
    return res.status(400).send({ status: false, message: "please provide user taxDue" })
}




const finalTaxdetails = {userId,totalSales,city,date,dueDate,taxtype,taxpercent,status,taxDue}
let savedData=await taxModel.create(finalTaxdetails)
return res.status(201).send({ status: true, msg: "tax created successfully", data: savedData });
    
} catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}
}




    //====================Get tax details by query =====================//

    const TaxDetailsQuery = async function(req,res){
        try {
        let queryofTaxDeatils = req.query
        const userIdFromToken = req.userId
        queryofTaxDeatils= {  taxDue,date }

        if(!taxDue){
            return res.status(400).send({status:false,messege:"please add query"})
        }
            if (userIdFromToken != id && (isValidrole(role)== 'taxPayer')) {
                        return res.status(403).send({status: false,message: "Unauthorized access.", });
                    }
        {

            const fullTaxDetails  = await taxModel.find(queryofTaxDeatils)
            return  res.status(200).send({fullTaxDetails})
    
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    }

//======================Updatation of payerDetails only by tax accountant and admin=================//

    const updatePayerDetails = async function(req,res){
        try {

            const updateDetails  = req.body
            const userIdFromToken = req.userId
            const userId = req.params.userId
            
          
            const userDetails = await userModel.findById(userId)
            if(!userDetails){

            return res.status(404).send({status:false,messege:"no such user found please check userid "})
             }

             if (userIdFromToken != id) {
                return res.status(403).send({status: false,message: "Unauthorized access.", });
            }

    
        if(userDetails.role=="taxpayer"){

            return res.status(404).send({status:false,messege:"you are not authorized to do this task "})
        }
    
        else{
         const updatedDetails = await userModel.findOneAndUpdate (userId,updateDetails)
         return res.status(200).send({ status: true, message: 'success', data: updatedDetails });

        }
 
        }catch (error) {
            console.log(error)
            return res.status(500).send({ status: false, msg: err.message })
        }
    }


    //===================creating a tax due=======================//

    const createTaxDue = async function(req,res){
        try {
    
         const updateTaxDue = req.body 
         updateTaxDue = {userID,taxStatus,taxDue}


    const userDetails = await userModel.findById(userId)
    if(!userDetails){

        return res.status(404).send({status:false,messege:"no such user found please check userid "})
    }

    else{
        if(userDetails.role=='admin'&& userDetails.role=='taxpayer'){

            return res.status(404).send({status:false,messege:"you are not authorized to do this task only tax accountant can do this task"})
        }
    }


    const taxDetails = await taxModel.findById(taxId)

    if(taxDetails.status == "paid"){
        return res.send({status:true,messege:"tax is already paid by user"})
    }

    else{ (taxDetails.status == "delayed");{
        const updateTaxDueStatus = await taxModel.findOneAndUpdate ({_id:taxId},updateTaxDue, { new: true }) // here tax due status will change to delayed
         return res.status(200).send({ status: true, message: 'success', data: updateTaxDueStatus });

    }
    
}
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: err.message })
    }
}
    

        
    
    
    
    









module.exports = {CreateTax,TaxDetailsQuery,updatePayerDetails,createTaxDue}