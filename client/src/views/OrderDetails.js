import React, {useState, useEffect, useRef} from "react";
import "../assets/css/delivery.css"
// reactstrap components
import {
  Input,
  Table
} from "reactstrap";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import {connect} from 'react-redux'
import LoadingScreen from 'react-loading-screen';
import { getOrders } from "actions/orders";
import { toast } from "react-toastify";
import axios from "axios";


const OrderDetails = (props) =>{
    const mainPanel = useRef();
    const [order, setOrder] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const statuses = ["pending", "on the way", "delivered", "cancelled"];
    const [riders, setRiders] = useState([]);
    const [rider, setRider] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const order_id = props.match.params.id;
    const order = props.orders.filter(c => c._id === order_id)[0];
    setRiders(props.riders);
    order.rider && setRider(order.rider);
    setOrder(order);
    setOrderStatus(order.status)
    setLoading(false);
  },[props.orders]);


  const updateData = () => {
    const order_id = props.match.params.id;
    const order = props.orders.filter(c => c._id === order_id)[0];
    setRiders(props.riders);
    setRider(props.rider);
    setOrder(order);
    setOrderStatus(order.status)
    setLoading(false);
    toast("Order updated successfully",  {style:{backgroundColor:"green", color:"#fff"}});
  }

  const handleStatus = async t => {
      try{
            setLoading(true);
            const newStatus = t.target.value;
            const data = new FormData();
            data.append("status", newStatus);
            data.append("id", order._id);

            await axios.post("/api/admin/customers/orders/updateStatus", 
            data, {
                timeout: 30000, 
                headers:{
                    'x-auth-token': props.userToken,
                    'Content-type': 'multipart/form-data'
                }
            });
            props.getOrders(props.authToken);
            updateData();
      }
      catch(err){
        setLoading(false);
        if(err.response?.status == 400 ||err.response?.status == 401){
            toast(err.response.data.msg, {style:{backgroundColor:"yellow", color:"#000"}});
            return false;
        }else{
            toast("Check your internet connection",  {style:{backgroundColor:"yellow", color:"#000"}});
        }  
    }
  }

  const handleRider = async t => {
      try{
            setLoading(true);
            const rider_id = t.target.selectedOptions[0].value;
            const rider_phone = t.target.selectedOptions[0].dataset.phone;
            const rider_name = t.target.selectedOptions[0].innerText;

            const data = new FormData();
            data.append('orderID', order._id);
            data.append('rider', rider_id);
            data.append('rider_name', rider_name);
            data.append('rider_phone', rider_phone);

            await axios.post("/api/admin/customers/orders/assign-rider", 
            data, {
                timeout: 30000, 
                headers:{
                    'x-auth-token': props.userToken,
                    'Content-type': 'multipart/form-data'
                }
            });
            props.getOrders(props.authToken);
            updateData();
            setLoading(false)
      }
      catch(err){
        setLoading(false);
        if(err.response?.status == 400 ||err.response?.status == 401){
            toast(err.response.data.msg, {style:{backgroundColor:"yellow", color:"#000"}});
            return false;
        }else{
            toast("Check your internet connection",  {style:{backgroundColor:"yellow", color:"#000"}});
        }  
    }
  }

  

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={"black"}
        activeColor={"info"}
      />
      {
          loading
          ?<LoadingScreen/>
          :<div className="main-panel delivery" ref={mainPanel}>
                <div className="top-buttons">
                    <div className="btn-wrap">
                        <button className="btn btn-danger">
                            <i className="fas fa-times"></i>
                            {" "}Cancel/Refund
                        </button>
                        {
                            loading
                            ?<span>Loading...</span>
                            :<Input
                                onInput={handleStatus}
                                type="select" name="select" id="exampleSelect">
                                <option value={orderStatus}>{orderStatus}</option>
                                {
                                    statuses.map(s => {
                                        if(s !== orderStatus)
                                        return(
                                            <option value={s}>{s}</option>
                                        )
                                    })
                                }
                            </Input>
                        }
                        {
                            loading
                            ?<span>Please wait...</span>
                            :<Input
                                onInput={handleRider}
                                type="select" name="select" id="exampleSelect">
                                {!order.rider && <option value="">Assign Rider</option>}
                                {
                                    riders.map(r => (
                                            <option value={r._id} data-phone={r.phone}>{r.name}</option>
                                    ))
                                }
                            </Input>
                        }
                    </div>    
                </div>

                <div className="mx-5 info-wrap">
                    <h3>
                        <i className="fas fa-info circle"></i>
                        {" "}Basic Details
                    </h3>
                    <hr></hr>
                    <h4 className="my-4">
                        <i className="fas fa-car-side circle"></i>
                        {" "}Order Details
                    </h4>
                    <div className="order-status-wrap">
                        <div className="order-status">
                            <h4>Order Status</h4>
                            <h2>{order.status}</h2>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <ul class="list-group">
                                <li class="list-group-item"><span>Order ID</span> <span>{order.short_id}</span></li>
                                <li class="list-group-item"><span>Reference</span> <span>{order.reference}</span></li>
                                <li class="list-group-item"><span>Order Date</span> <span>{new Date(order.date).toLocaleDateString()}</span></li>
                                <li class="list-group-item"><span>Delivery Time</span> <span>10:00 - 11:00am</span></li>
                                <li class="list-group-item"><span>Rider</span> <span>{order.rider_name}</span></li>
                                <li class="list-group-item"><span>Rider Phone</span> <span>{order.rider_phone}</span></li>
                                <li class="list-group-item"><span>Total Price</span> <span>NGN{order.price}</span></li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul class="list-group">
                                <li class="list-group-item"><span>Customer</span> <span>{order.deliveryInfo.name}</span></li>
                                <li class="list-group-item"><span>Phone</span> <span>{order.deliveryInfo.phone}</span></li>
                                <li class="list-group-item"><span>Email</span> <span>{order.deliveryInfo.email}</span></li>
                                <li class="list-group-item"><span>Billing Address</span> <span>{order.deliveryInfo.address}</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h4>Order Items</h4>
                        <Table responsive>
                            <thead className="text-primary">
                                <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Vendor</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.items.map(f=> (
                                        <tr>
                                        <td>{f.food.name}</td>
                                        <td>{f.price}</td>
                                        <td>{f.food.vendor_name}</td>
                                        <td>{f.status}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>

                </div>              
           </div>
      }
        <Footer fluid />
    </div>
  );
}

const mapStateToProps = state => ({
  customers: state.customer.customers,
  riders: state.rider.riders,
  orders: state.order.orders,
  authToken: state.auth.token
})

export default connect(mapStateToProps, {getOrders})(OrderDetails);
