const mongoose = require('mongoose');

const SchemaForInvesments = new mongoose.Schema({
    dateofInvestment: {
        type: String,
        required: false
    },
    typeOfInvestment: {
        type: String,
        required: false
    },
    allInvestor: {
        type: Array,
        required: false
    },
    leadInvestors: {
        type: Array,
        required: false
    },
    raisedAmount: {
        type: Number,
        required: false
    },
    lastValuation: {
        type: Number,
        required: false
    },
    milestones: {
        type: String,
        required: false,
    },
    growth: {
        type: String,
        required: false,
    },

})

const SchmaForUSPs = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    aboutUSP: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false,
        default : 'https://firebasestorage.googleapis.com/v0/b/projectpi-fa7b4.appspot.com/o/uspmedia%2FUSP.official.jpg?alt=media&token=11b9cd84-ad1a-4f0c-adc0-d3d9b4ce0154'
    },
    likes: {
        type: Number,
        required: false,
        default: 0,
    }
})

const SchemaForMedia = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },

})

const SchemaForMyProduct = new mongoose.Schema({

    rid: {
        type: String,
        required: true,
    },
    valuationText : {
        type : String,
        required: false,
        default: 'Yet To Discover'        
    },
    totalInvestor : {
        type : Number,
        required : false,
        default : 0   
    },
    totalRaisedFund : {
        type : Number,
        required : false,
        default : 0           
    },
    totalValuation : {
        type : Number,
        required : false,
        default : 0           
    },
    investments : {
        type: Array,
        required: false,
        default: []
    },
    news: {
        type: Array,
        required: false,
        default: []
    },
    usp: [SchmaForUSPs],
    media: [SchemaForMedia],
    people: {
        type: Array,
        required: false,
        default: []
    }
})


SchemaForMyProduct.pre('findOneAndUpdate' , function(next){

    const originalInvestments = this._update.$set.investments;
    
    // Check if investments is an array
    if (Array.isArray(originalInvestments)) {
        const totalInvestor = originalInvestments.reduce((total, investment) => {
            return total + investment.raisedAmount;
        }, 0);
        this._update.$set.totalRaisedFund = totalInvestor;
    }

    next();

})



module.exports = { SchemaForMyProduct, SchemaForMedia, SchmaForUSPs }