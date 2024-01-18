const express = require('express');
const router = express.Router();
// fetch all post(sorted on t the basis of time),create
const userAuth = require("../../../middleware/auth");
const postController = require("../../post/controller/postController");


router.get("/v1/user/post", userAuth, postController.findAllPost);
router.post("/v1/user/post/createPost", userAuth, postController.createPost);



module.exports = router;