const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName: {type: String, required: true},
    serviceDescription: {type: String},
    servicePrice: {type: Number, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    business: {type: Schema.Types.ObjectId, ref: 'Business'}
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;