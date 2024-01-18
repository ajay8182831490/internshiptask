
const { Types } = require("mongoose");
const getPool = require("../../../db");
const postSchema = require("../../../model/post");
const createPost = async (req, res, next) => {
    const { id } = req.user;
    const { title, content } = req.body;


    try {
        let conn = await getPool();
        let result = await postSchema.create({ title: title, content: content, createdBy: id });
        console.log(result);
        res.status(200).json(result);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("internal server error");
    }

}



const findAllPost = async (req, res, next) => {
    const { id } = req.user;
    try {
        let conn = await getPool();
        let result = await postSchema.find({ createdBy: (id) }).sort({ date: -1 });


        res.status(200).json(result);


    } catch (error) {
        console.log(error.message);
        res.status(500).json("internal server error");

    }

}


module.exports = { findAllPost, createPost }