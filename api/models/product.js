const mongoose =  require('mongoose');
// Schema is the layout, sign of the object
// where as model is the object itself
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: { type: Number,required :true },
    productImage: {type: String, require: true}

});
module.exports = mongoose.model('Products', productSchema);