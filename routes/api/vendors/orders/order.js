const router = require("express").Router();
const auth = require("../../../../middlewares/auth");
const statusTypes = require("../../../../constants/orderConstants");
const OrderVendor = require("../../../../models/OrderVendor");
const Order = require("../../../../models/Order");

// GET ALL ORDERS
router.get("/all", auth, async(req,res) => {
    try{
        const orders = await OrderVendor.find({vendor_id: req.user.id});
        return res.json({
            success: true,
            orders: orders.reverse()
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
});

// ACCEPT OR DECLINE ORDER
router.post("/process", auth, async(req,res) => {
    try{
        const {type, short_id, vendor_id, order_id} = req.body;
        if(typeof type !== "boolean" || !short_id || !vendor_id || !order_id){
            return res.status(400).json({
                success: false,
                msg: "Something went wrong."
            });
        }

        const _order = await Order.findOne({short_id});
        const newItems = _order.items.map(item => {
            if(item.food.vendor === vendor_id) return {...item, status: type?"accepted":"declined"}
            else return item;
        });
        await _order.updateOne({
            items: newItems
        });
        await OrderVendor.updateOne({_id: order_id}, {processed:true, status: type?"accepted":"declined"});
        return res.json({
            success: true,
            msg: `Order ${type?'accepted':'declined'}`
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})

module.exports = router;