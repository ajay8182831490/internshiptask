
const jwt = require('jsonwebtoken');



const Auth = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "please provide a valid token" });
    }
    try {

        const data = jwt.verify(token, process.env.secret);

        req.user = data.user;
        next();
    } catch (ex) {

        res.status(401).send({ error: "please authentication using a valid token" });

    }
}
module.exports = Auth;
