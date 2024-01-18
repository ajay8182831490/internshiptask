//const addUser,login ,findUser
const getPool = require("../../../db");
const userSchema = require("../../../model/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const addUser = async (req, res, next) => {
    try {
        const { name, email, password, bio, mobileno } = req.body;

        let conn = await getPool();


        let find = await userSchema.findOne({ email: email });// here we check that user exist or not if the user not exist then we will create acount
        if (!find) {

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt);// here we convert the password into the hash pashword 

            // Create a new user using the Mongoose User schema
            const result = await userSchema.create({
                name: name,
                email: email,
                password: hashpass,
                bio: bio,
                mobileno: mobileno
            });

            if (result) {
                res.status(200).json({ msg: "account created Successfully", success: true });
            }
        }



        else {
            res.status(400).json({ msg: "User with the same email already exists", success: false });
        }

    } catch (error) {


        res.status(500).json({ msg: "Internal server error" });


    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        let con = await getPool();
        let result = await userSchema.findOne({ email: email });



        if (result) {

            const data = {
                user: {
                    id: result._id,

                }
            }





            const token = await jwt.sign(data, process.env.secret);



            res.status(200).json({ msg: "login Successfully", success: true, token: token });
        }
        else {
            res.status(400).json({ msg: "user not exist", success: false });
        }

    } catch (error) {
        res.status(500).json("internal server error");
    }
}

const findUser = async (req, res, next) => {
    const { id } = req.user

    try {
        let conn = await getPool();
        let result = await userSchema.findById(id).select("-password");
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(401).json("something error occured");
        }

    } catch (error) {
        res.status(500).json("internal server error");
    }
}

module.exports = { addUser, login, findUser };