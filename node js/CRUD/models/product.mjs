import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {type: String, required :[true, "Title is Required"]}, 
  description :{ type : String},
  price :{
    type:Number,
    required:[true, "price is Required"],
  },
  discountPercentage:{
    type : Number,
    min:[0, "minimum discount of product must be 0"],
    required :[true, "discount is required"],
    max:[50, "maximum price of discount must be under 50"]
  },
  rating :{
    type : Number,
    min:[0, "minimum rating of product must be 0"],
    max:[50, "maximum rating of discount must be under 5"],
    default : 5,
  },
  stock :{ type :Number , min :[0, "minimum stock of product must be 0"]},
  brand :{type : String , required:[true, "Brand is Rquired"]},
  category:{type: String, required:[true, "Category is Required"]},
  images:[{type:String , required:[true , "Thumbnail is Required"]}],

});

const Product = mongoose.model("Product", productSchema);
export default Product;