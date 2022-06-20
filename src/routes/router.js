const express = require("express")
const router = express.Router()


const userController = require("../Controllers/UserController")
const taxController = require("../Controllers/taxController")
const auth = require("../middleware/auth")


router.post("/register",userController.CreateUser)
router.post("/loginuser", userController.UserLogin)

router.post("/registerTax",taxController.CreateTax)
router.get("/gettaxPayerDetails",taxController.getTaxPayerdetails)




module.exports = router;