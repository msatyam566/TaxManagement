const userModel = require("../Models/userModel")
const taxModel = require("../Models/TaxModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const isValidrole = (input) => ["taxpayer","taxAccountant", "admin"].indexOf(input) !== -1

let isvalidPanNumber = function (value) {
    if (value.toString().length == 6) return true
};

let isValidRole =  function (){
    const userDetails = userModel.findById(userId)
    if(!userDetails){

        return res.status(404).send({status:false,messege:"no such user found please check userid "})
    }

    else{
        if(userDetails.role=='admin'||userDetails.role=='taxAccountant') return true
    }
    return false
}


const CreateUser = async (req,res)=>{
try {
    let createUserBody= req.body
    let {Name,email,password,role,panNumber,city}=createUserBody


    if (!createUserBody) {
        return res.status(400).send({ status: false, message: "please provide Data" })
    }

    if (!Name) {
        return res.status(400).send({ status: false, message: "please provide user Name" })
    }
    if (!email) {
        return res.status(400).send({ status: false, message: "please provide user email" })

    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
        return res.status(400).send({ status: false, message: "Please provide valid Email Address" });
    }

    if (!password) {
        return res.status(400).send({ status: false, message: "please provide user password" })
    }
   
    if (!panNumber) {
        return res.status(400).send({ status: false, message: "please provide user panNumber" })

    }
    if(panNumber){
        if(!isvalidPanNumber(panNumber)){
            return res.status(400).send({status:false, message:"pan number should be valid"})
        }
    }
    let duplicatePannumber = await userModel.findOne({ panNumber: panNumber })
        if (duplicatePannumber) {
            return res.status(400).send({ status: false, message: `pan Number Already Present` });
        }
    if (!role) {
        return res.status(400).send({ status: false, message: "please provide user role" })

    }
    if(role){
        if(!isValidrole(role)){
            return res.status(400).send({status:false, message:"valid status is required. [taxpayer,taxAccountant, admin]"})
        }
    }
    if(!city){
        return res.status(400).send({ status: false, message: "please provide user city" })

    }


    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)

    const finalDetails = { Name,email,password,role,panNumber,city }
    let savedData = await userModel.create(finalDetails)
    return res.status(201).send({ status: true, msg: "user created successfully", data: savedData });

} catch (error) {
    return res.status(500).send({ status: false, message: error.message })

}
}

const UserLogin = async (req, res) => {
    try {
        const data = req.body
        let {email, password} = data

        if (!data) {
            return res.status(400).send({ status: false, message: "please provide user credentials." })
        }

        if (!email) {
            return res.status(400).send({ status: false, message: "Email-Id is required" })
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address" })
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }

        let findUser = await userModel.findOne({email});
        
        if (!findUser)
            return res.status(404).send({
                status: false,
                msg: "Login failed! No user found with the provided email.",
        });

       const isValidPassword = await bcrypt.compare(password, findUser.password)

       if (!isValidPassword)
            return res.status(404).send({
                status: false,
                msg: "Login failed! Wrong password.",
        });

            let token = jwt.sign(
                {
                  userId: findUser._id,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60
                }, "@taxAssignment");
        
        res.header('Authorization', token);
        return res.status(200).send({ status: true, message: "User login successfull", data:{usedId:`${findUser._id}`, token: token }})
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//===========================getTaxPayerDetails========================//




const getTaxPayerdetails = async function (req, res) {
    try {
        let query = req.query
        let filter = {
            ...query
        }
    
      if(isValidRole.role == "taxpayer"){
        return res.status(403).send({status:false,messege:"you are not authorized to check other details"})
        
      }
      let filterByQuery = await userModel.find(filter)
            if (filterByQuery.length == 0) {
                return res.status(404).send({ status: false, msg: "No taxPayer found" })
            }
            console.log("Data fetched successfully")
            return res.status(200).send({ status: true, msg: "taxPayerDetails", data: filterByQuery })
    

 } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}





module.exports={CreateUser,getTaxPayerdetails,UserLogin}