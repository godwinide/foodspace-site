const router = require("express").Router();
const auth = require("../../../../middlewares/auth");
const Order = require("../../../../models/Order");
const statusTypes = require("../../../../constants/orderConstants");
const OrderVendor = require("../../../../models/OrderVendor");


router.get("/all", auth, async(req,res) => {
    try{
        const orders = await Order.find({customer_id: req.user.id});
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
});


router.post("/add-review", auth, async(req,res) => {
    try{
        const {orderID, rating, review} = req.body;
        if(!orderID || !rating || !review){
            return res.status(400).json({
                success: false,
                msg: "Enter all fields."
            });
        }
        const order = await Order.findById(orderID);
        if(!order){
            return res.status(400).json({
                success: false,
                msg: "Something went wrong."
            }); 
        }
        await order.updateOne({
            feedback: {
                rating,
                review,
                date: new Date()
            }
        })
        return res.json({
            success: true,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})


router.post("/place", auth, async(req,res) => {
    try{
        const {
            deliveryTime,
            deliveryDistrict,
            additionalInfo,
            deliveryInfo,
            price,
            items,
            short_id,
            reference
        } = req.body;

        if(
            !deliveryTime ||
            !deliveryDistrict ||
            !deliveryInfo ||
            !price ||
            !items ||
            !short_id
            ){
                return res.status(400).json({
                    success: false,
                    msg: "Please enter all required fields!"
                });
        }

        const vendorOrders = {};

        const global_order = {
            customer_id: req.user.id,
            short_id,
            status: statusTypes.pending,
            items,
            deliveryDistrict,
            deliveryInfo,
            additionalInfo,
            deliveryTime,
            price
        };

        // save centre admin order
        const g_items = global_order.items.map(i => ({...i, status:"pending"}))
        const newOrder = new Order({...global_order, items: g_items, reference});
        await newOrder.save();

        // create separate orders for vendors
        items.forEach(item => {
            if(typeof vendorOrders[item.food.vendor] !== 'undefined'){
                vendorOrders[item.food.vendor].items = [...vendorOrders[item.food.vendor].items, item]
            }else{
                vendorOrders[item.food.vendor] = {
                   ...global_order,
                   vendor_id: item.food.vendor,
                   items: [item] 
                }
            }
        });

        // save vendor orders
        Object.keys(vendorOrders).forEach(async(key, index, arr) => {
            const price = vendorOrders[key].items.reduce((prev, cur)=>{
                return(
                    prev
                    +cur.quantity * cur.food.price
                )
            },0);
            const data = {...vendorOrders[key], price};
            delete data.customer_id;
            const new_order = new OrderVendor(data);
            await new_order.save();
            if((index) === arr.length-1){
                return res.json({
                    success: true,
                    msg: "Your order has been placed"
                });
            }
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
})


module.exports = router;