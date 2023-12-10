const express = require('express');
const router = express.Router();
const authRouter = require("../Middleware/auth")

const {

    register,
    login,
    viewAllUser,
    viewUserByLocation,
    specificUser,
    UpdateUser,
    deleteUser

} = require("../Controller/userController")

router.post('/register', register);

router.post("/login", login) ;

router.get("/viewalluser", viewAllUser) ; 

router.get("/viewUserByLocation", viewUserByLocation);

router.get("/viewspecificuser/:id", specificUser);

router.put("/updateuser/:id", authRouter, UpdateUser);

router.delete("/deleteuser/:id", authRouter, deleteUser);

module.exports = router ;