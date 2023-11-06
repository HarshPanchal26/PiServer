const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectionWithAtlas = () => {
    mongoose
        .connect('mongodb+srv://vercel-admin-user:z2DY91lC4OfJSuP5@clusterpi.3x7htsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
        .then(() => {
            console.log("Connected with mongoDB atlas")
        }).catch((error) => {
            console.log("Error from connection ===> :", error.message)
        })


}

module.exports = { connectionWithAtlas, mongoose }







// Password  : SwGwG8zGBd0UWMO4








// mongodb+srv://hrppanchal27:<password>@clusterpi.3x7htsc.mongodb.net/?retryWrites=true&w=majority





