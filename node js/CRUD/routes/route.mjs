import express from "express"
import controller from "../controllers/productController.mjs"
import userController from "../controllers/userController.mjs"
const router = express.Router()

router
.get("/",userController.auth,controller.getAllProducts)

.get("/product/id",controller.getProduct)
.post("/addproduct",controller.addProduct)
.put("/editproduct/:id",controller.editProduct)
// .post("/auth/signup",userController.Signup)
// .post("/auth/login",userController.Login)
// .get("/users",userController.getAllUsers)
// .get("/users/verify",userController.sendVerification)
// .patch("/users/change-activation-status/:id/:status",userController.ChangeActivationStatus)
router.post('/auth/signup', userController.Signup);
router.post('/verify-otp', userController.verifyOTP);
router.post('/auth/login', userController.Login);
router.get('/users', userController.getAllUsers);
router.get('/send-verification', userController.sendVerification);
router.put('/user-status/:id/:status', userController.ChangeActivationStatus);

export default router
