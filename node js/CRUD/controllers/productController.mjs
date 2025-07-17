import Product from "../models/product.mjs";

const getAllProducts=async (req,res)=>{
   try {

      const products= await Product.find();
   if(products.length > 0){
   res.json({msg: "showing our products", myproducts:products})
}else{
   res.status(404).json({msg: "no product found"})

   }}catch (error){
      res.status(500).json({msg:error})
   }
}

//single product details
const getProduct=async (req,res)=>{
   try {
     const id =req.params.id;
     const product= await Product.findOne({_id:id});
   if(product){
   res.json({msg: "Product Found!", products:product})
}else{
   res.status(404).json({msg: "no product found"})

   }}catch (error){
      res.status(500).json({msg:error})
   }
}

//adding a product in db 
const addProduct=async (req,res)=>{
   try {
     let newProduct ={
      title : req.body.title,
      description : req.body.description,
      price : req.body.price,
      discountPercentage : req.body.discountPercentage,
      rating : req.body.rating,
      brand : req.body.brand,
      category : req.body.category,
      stock : req.body.stock,
      images : [req.body.images],
     }
     const addProduct= await Product.insertOne(newProduct);
   if(addProduct){
   res.json({msg: "Product added!", addedProduct:addProduct})
}else{
   res.status(404).json({msg: "failed to add product "})

   }}catch (error){
      res.status(500).json({msg:error})
   }
}


//edit product
const editProduct=async (req,res)=>{
   try {
     let updatedProduct ={
      title : req.body.title,
      description : req.body.description,
      price : req.body.price,
      discountPercentage : req.body.discountPercentage,
      rating : req.body.rating,
      brand : req.body.brand,
      category : req.body.category,
      stock : req.body.stock,
      images : [req.body.images],
     }
     const editProduct= await Product.updateOne({_id:id},updatedProduct);
   if(editProduct){
   res.json({msg: "Product added!", addedProduct:addProduct})
}else{
   res.status(404).json({msg: "failed to edit product "})

   }}catch (error){
      res.status(500).json({msg:error})
   }
}
const controller ={getAllProducts,addProduct,getProduct,editProduct}
export default controller