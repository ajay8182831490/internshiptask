const express = require('express');

const path = require('path');
const cors = require('cors');
app = express();
app.use(cors())
app.use(express.json());

const multer = require('multer')// multer is used for handeling the image  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage })
app.use(express.static('./public'));


app.use('/uploads', express.static('uploads'));


app.use(express.static('./public'));


app.use('/uploads', express.static('uploads'));

app.listen(3600, () => {
    console.log("server is running on port 3600");
})