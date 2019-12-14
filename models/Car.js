const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const carSchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    },

    make: {
        type:String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    gearbox: {
        type: String,
        required: false
    },

    engine: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    creator: {
        type: String,
        required: true
    },
    
    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('car', carSchema);