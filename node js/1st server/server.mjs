import express from 'express'
import fs from "node:fs"
import router from './Routes/route.mjs'
import { config } from 'dotenv'
import dotenv from "dotenv"
const app = express ()
dotenv.config()
const port=process.env.PORT



app.use(express.json())

app.use ("/",router)


// app.get('/',(req,res)=> {
//     res.json(products)
// })


// //get
// app.get ('/product/:id' ,(req,res)=> {
//     const id = req.params.id;
//     console.log(id);
//     let product = products.filter((prd,index)=>{
//         if(prd.id==id){
//             return prd
//         }
//     })
//     console.log(product);
//     if(product.length > 0){
//         res.json({product:product})
//     }else{
//         res.status(404).json({msg: "product not found"})
//     }
// })


// //add
// app.post("/addproduct",(req,res)=>{
//     const newProduct ={
//         id: req.body.id,
//         title: req.body.title,
//         description: req.body.description,
//         price: req.body.price,
//         dicountPercentage: req.body.dicountPercentage,
//         rating: req.body.rating,
//         category: req.body.category,
//         stock: req.body.stock,
//         brand: req.body.brand,
//         images: req.body.images,
//         thumbnail: req.body.thumbnail,
//     }

//     products = [...products, newProduct];
//     res.json ({msg :" product added succesfully",
//         newproduct : newProduct
//     })
// })

// //deleteroduct
// app.delete('/deleteproduct/:id', (req,res)=>{
//     const id= req.params.id;
//     console.log(id);

//     products= products.filter((prd,index)=>{
//         if(prd.id !=id){
//             return prd
//         }
//     })
//     res.json ({ msg:"product deleted succesfully"})

//     // if(products.length>0){

//     // }else{
//     //     res.status(404).json ({msg:"products are empty"})
//     // }
    
// })

app.listen (port, ()=>{
    console.log(`Example app listening on port ${port}`)
})