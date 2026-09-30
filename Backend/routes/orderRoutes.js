const express= require("express");
const router = express.Router();
const protect=require("../middleware/authMiddleware");
const admin=require("../middleware/adminMiddleware");
const {createOrder,getAllOrders,getMyOrders,updateOrderStatus,deleteOrder}=require("../controllers/orderController");

router.post("/:id",protect,createOrder);
router.get("/",protect,admin,getAllOrders);
router.get("/myorders",protect,getMyOrders);
router.put("/:id/:status",protect,admin,updateOrderStatus);
router.delete("/:id",protect,deleteOrder);

 module.exports=router;