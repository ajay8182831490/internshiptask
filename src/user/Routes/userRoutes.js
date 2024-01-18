const express = require('express');
const router = express.Router();

// signup,login and userprofile

const userController = require("../controller/userController");
const userAuth = require("../../../middleware/auth")// middleware pass to verify that user are logged in or not 

router.post("/v1/user/signup", userController.addUser);
router.post("/v1/user/login", userController.login);
router.get("/v1/user/userProfile", userAuth, userController.findUser);

module.exports = router;