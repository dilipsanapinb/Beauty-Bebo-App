const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
name:String,
price:String,
discount:String,
image_url: String,
type:String,
userID:String

})

const ProductModel=mongoose.model("product",productSchema);

module.exports={ProductModel}