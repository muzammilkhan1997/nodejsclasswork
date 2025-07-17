import express from "express"

const router = express.Router()
import productController from "../Controllers/productController.mjs"

router
.get('/',productController.getAllProduct)
.get ('/product/:id' ,productController.getProducts)
.post("/addproduct",productController.addProduct)
.delete('/deleteproduct/:id', productController.deleteProduct)

export default router;