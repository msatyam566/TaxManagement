const taxModel = require("../Models/TaxModel")
const userModel = require("../Models/userModel")


const CreateTax = async(req,res)=>{
try {
let CreateTaxBody = req.body
let {userId,totalSales,city,date,dueDate,taxtype,taxpercent,status,taxDue}=CreateTaxBody


if(!CreateTaxBody){
    return res.status(400).send({ status: false, message: "please provide Data" })
    
}
if (!totalSales) {
    return res.status(400).send({ status: false, message: "please provide user totalSales" })
}
if (!city) {
    return res.status(400).send({ status: false, message: "please provide user city" })
}
if (!date) {
    return res.status(400).send({ status: false, message: "please provide user date" })
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


const getTaxPayerdetails = async function (req, res) {
    try {
        let query = req.query
        let filter = {
            ...query
        }

    
        const filterByQuery = await taxModel.find(filter)
        if (filterByQuery.length == 0) {
            return res.status(404).send({ status: false, msg: "No taxPayer found" })
        }
        console.log("Data fetched successfully")
        return res.status(200).send({ status: true, msg: "taxPayerDetails", data: filterByQuery })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
    }










module.exports = {CreateTax,getTaxPayerdetails}