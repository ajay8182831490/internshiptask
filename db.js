const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const MONGODB_URI = 'mongodb://127.0.0.1:27017/intern';
const mongooseOptions = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

    serverSelectionTimeoutMS: 30000,
};

const getPool = async () => {

    let pool = null;
    try {
        pool = await mongoose.connect(MONGODB_URI, mongooseOptions);



    } catch (ex) {

        throw new Error({ error: 'Internal Server Error', details: ex.message });
    }
    return pool;
}
module.exports = getPool;