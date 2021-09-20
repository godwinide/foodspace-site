const router = require("express").Router();
const adminAuth = require("../../../../middlewares/adminAuth");
const Order = require("../../../../models/Order");
const Notification = require("../../../../models/Notification")


router.get("/", async(req,res) => {
    try{
        const orders = await Order.find({});
        return res.json({
            success: true,
            orders
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})


// GET ALL CUSTOMER'S ORDERS
router.get("/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const orders = await Order.find({customer_id:id});
        return res.json({
            success: true,
            orders
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

// UPDATE ORDER STATUS
router.post("/updateStatus", async(req,res) => {
    try{
        const {id, status} = req.body;
        if(!id || !status){
            return res.status(400).json({
                success: false,
                msg: "something went wrong"
            });
        }
        const order = await Order.findById(id);
        if(!order){
            return res.status(400).json({
                success: false,
                msg: "something went wrong"
            });
        }
        const notification = new Notification({
            title: `Your order ${order.short_id} status`,
            message: `your order is ${status}. Thanks.`,
            channelId: 'food-space-app',
            clientId: order.customer_id
        });
        await notification.save();
        await order.updateOne({status});
        return res.json({
            success: true,
            msg: "order updated successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

// ASSIGN RIDER
router.post("/assign-rider", async(req,res) => {
    try{
        const {orderID, rider, rider_name, rider_phone} = req.body;

        if(!orderID || !rider || !rider_name || !rider_phone){
            return res.status(400).json({
                success: false,
                msg: "something went wrong"
            });
        }

        const order = await Order.findById(orderID);

        await order.updateOne({
            rider,
            rider_name,
            rider_phone
        });

        return res.json({
            success: true,
            msg: "order updated successfully"
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = router;