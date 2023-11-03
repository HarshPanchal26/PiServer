const dotenv =  require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectionWithAtlas = ()=>{

    mongoose
    .connect(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
    })
    .then(()=>{
        console.warn("Connected with mongoDB atlas")
    }).catch((error)=>{
        console.log("Error from connection ===> :" , error.message)
    })
    
    
}
    
module.exports = { connectionWithAtlas , mongoose}







// Password  : SwGwG8zGBd0UWMO4








// mongodb+srv://hrppanchal27:<password>@clusterpi.3x7htsc.mongodb.net/?retryWrites=true&w=majority





