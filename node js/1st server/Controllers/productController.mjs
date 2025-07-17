const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
let products = data.products;
import fs from "node:fs"


const getAllProduct=(req,res)=> {
    res.json(products)
}

const getProducts=(req,res)=> {
    const id = req.params.id;
    console.log(id);
    let product = products.filter((prd,index)=>{
        if(prd.id==id){
            return prd
        }
    })
    console.log(product);
    if(product.length > 0){
        res.json({product:product})
    }else{
        res.status(404).json({msg: "product not found"})
    }
}
const addProduct = (req,res)=>{
    const newProduct ={
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        dicountPercentage: req.body.dicountPercentage,
        rating: req.body.rating,
        category: req.body.category,
        stock: req.body.stock,
        brand: req.body.brand,
        images: req.body.images,
        thumbnail: req.body.thumbnail,
    }

    products = [...products, newProduct];
    res.json ({msg :" product added succesfully",
        newproduct : newProduct
    })
}

const deleteProduct = (req,res)=>{
    const id= req.params.id;
    console.log(id);

    products= products.filter((prd,index)=>{
        if(prd.id !=id){
            return prd
        }
    })
    res.json ({ msg:"product deleted succesfully"})

    // if(products.length>0){

    // }else{
    //     res.status(404).json ({msg:"products are empty"})
    // }
    
}

const productController  = {getAllProduct,getProducts, addProduct,deleteProduct}
export default productController