const { default: axios } = require('axios');
const ServiceForProducts = require('../services/serviceForProducts');
const ServiceForFirebase = require('../services/serviceForFirebase');
// const { findAllInRenderedTree } = require('react-dom/test-utils');
const { findSchemaAndCollection } = require('../services/servicesForAuthentication');

const controllerForProducts = async (req, res) => {
    const { uid, type } = res.locals;
    console.log(type);
    try {

        const data = await ServiceForProducts.createProduct({ rid: uid });
        res.status(201).json({
            data: data
        })
    } catch (error) {
        res.status(402).json({
            error: error.message
        })
    }
}

const controllerForFinancial = () => {

}

const controllerForNews = () => {

}

const controllerForMedia = async (req, res) => {

    const mediaFile = req.files?.['media']?.[0]
    const metaData = JSON.parse(req.body['data']);

    try {
        const createdMedia = await ServiceForProducts.createMediaForProduct({ rid: res.locals.uid }, mediaFile, metaData);
        res.status(201).json({
            mediaSave: true,
            data: createdMedia
        });
    } catch (error) {
        res.status(402).json({
            error: error.message
        })
    }
}

const controllerForPepole = () => {

}

const contollerForUSPs = async (req, res) => {
    const mediaFile = req.files?.['uspmedia']?.[0]
    const metaData = JSON.parse(req.body['uspdata']);
    if (req.type === 'create') {
        try {
            let createdAt = new Date().getTime();
            let objToPass = {
                ...metaData,
            }
            if (mediaFile) {
                const result = await ServiceForFirebase.UploadImageOnFirebabe(mediaFile, 'uspmedia', createdAt)
                objToPass.imageUrl = result.URL;
            }
            const createdData = await ServiceForProducts.createUSPForProduct({ rid: res.locals.uid }, objToPass);
            res.status(201).json({
                created: true,
                newData: createdData
            })
        } catch (error) {
            res.status(402).json({
                created: false,
                message: error.message
            })
        }
    } else if (req.type === 'update') {
        try {
            let createdAt = new Date().getTime();
            let objToPass = {
                ...metaData,
            }
            if (mediaFile) {
                const result = await ServiceForFirebase.UploadImageOnFirebabe(mediaFile, 'uspmedia', createdAt)
                objToPass.imageUrl = result.URL;
            }
            const createdData = await ServiceForProducts.updateUSPForProduct({ rid: res.locals.uid }, objToPass);
            res.status(201).json({
                created: true,
                newData: createdData
            })
        } catch (error) {
            res.status(402).json({
                created: false,
                message: error.message
            })
        }
    } else {
        res.status(402).json({
            error: 'SOME INTERNAL ERROR , CONTACT TO SERVICE CENTER'
        })
    }
}

const controllerForPitch = async (req, res) => {
    try {
        const result = await ServiceForProducts.createPitchForProduct(res.locals.uid, req.body);
        res.status(201).json({
            pitched: true,
            result: result,
        })
    } catch (error) {
        res.status(401).json({
            pitched: false,
            error: error.message
        })
    }
}


const controllerForAddPepole = async (req, res) => {
    const { profielObj, position } = req.body;
    let ObjectForPepole = {
        idOfPerson: profielObj._id,
        idOfOrganisation: res.locals.uid,
        typeOfPerson: profielObj.type,
        typeOfOrganisation: res.locals.type,
        position: position
    }
    try {
        const SchemaForPerson = findSchemaAndCollection(profielObj.type);
        const SchemaForOrganisation = findSchemaAndCollection(res.locals.type);

        const result = await ServiceForProducts.addPepoleForOrganisation(ObjectForPepole, SchemaForPerson, SchemaForOrganisation);
        res.status(201).json({
            result
        })
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

const controllerForRetriveProduvtWithInvestments = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await ServiceForProducts.retriveProductwithInestments(id);
        res.status(201).json({
            product: result,
            message: ''
        })
        console.log("result result", result)
    } catch (error) {
        console.log("Error in fetching whole Product", error)
        res.status(201).json({
            product: null,
            message: error.message
        })
    }
}

module.exports = {
    controllerForFinancial,
    controllerForMedia,
    controllerForNews,
    controllerForPepole,
    controllerForProducts,
    contollerForUSPs,
    controllerForPitch,
    controllerForAddPepole,
    controllerForRetriveProduvtWithInvestments
}




// {
//    "version": 2,
//    "name": "Investi-PI",
//    "builds": [
//       { "src": "server.js", "use": "@vercel/node" }
//    ],
//    "routes": [
//       { "src": "/(.*)", "dest": "/server.js" }
//    ]
// }    