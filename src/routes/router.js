const express = require("express")
const router = express.Router()


const userController = require("../Controllers/UserController")
const taxController = require("../Controllers/taxController")
const auth = require("../middleware/auth")


router.post("/register",userController.CreateUser)
router.post("/loginuser", userController.UserLogin)
router.get("/gettaxPayerDetails",userController.getTaxPayerdetails)

router.post("/registerTax",taxController.CreateTax)
router.get("/detailsbyquery",taxController.TaxDetailsQuery)
router.put("/updateDetailsofpayer/:userId",auth.userAuth,taxController.updatePayerDetails)
router.post("/createTaxDue",taxController.createTaxDue)
router.put("/updatetaxsatatus/:userId",auth.userAuth,taxController.changeTaxStatus)



module.exports = router;