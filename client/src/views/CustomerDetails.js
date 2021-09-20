import React, {useState, useEffect, useRef} from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import {connect} from 'react-redux'
import client from "config/client";
import LoadingScreen from 'react-loading-screen';


const CustomerDetails = (props) =>{
  const mainPanel = useRef();

  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);

  const {customers} = props;

  useEffect(()=> {
    const customerid = props.match.params.id;
    const customer = customers.filter(c => c._id === customerid)[0];
    setCustomer(customer);
    getOrders(customerid);
  },[]);

  const getOrders = async(id) => {
    try{
      const res = await client.get(`http://localhost:2021/api/admin/customers/orders/${id}`);
      setOrders(res.data.orders);
      setOrderLoading(false);
      setLoading(false);
    }
    catch(err){
      setTimeout(
      getOrders(id),
      15000
      )
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
        !(loading === false && orderLoading === false)?
        <LoadingScreen 
        loading={true}
        bgColor='dodgerblue'
        spinnerColor='gold'
        textColor='white'
        text='Loading, please wait...'
        />
        :<div className="main-panel" ref={mainPanel}>
        <>
        <div className="content">
            <Row>
            <Col md="4">
                <Card className="card-user">
                <div className="image p-3">
                </div>
                <CardBody>
                    <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/user.png").default}
                        />
                        <h5 className="title">{customer.name}</h5>
                    </a>
                    </div>
                </CardBody>
                </Card>
            </Col>
            <Col md="8">
                <Card className="card-user">
                <CardHeader>
                    <CardTitle tag="h5">Profile</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                    <Row>
                        <Col className="pr-1" md="5">
                        <FormGroup>
                            <label>Full Name</label>
                            <Input
                              placeholder="Full Name"
                              type="text"
                              value={customer.name}
                            />
                        </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                        <FormGroup>
                            <label>Phone</label>
                            <Input
                            value={customer.phone}
                            placeholder="phone"
                            type="tel"
                            />
                        </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                        <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                            Email address
                            </label>
                            <Input placeholder="Email" type="email" value={customer.email} />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <FormGroup>
                            <label>Address</label>
                            <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                            value={customer.address}
                            />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <div className="update ml-auto mr-auto">
                      {/* <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Cutomer
                      </Button> */}
                    </div>
                  </Row>
                    </Form>
                </CardBody>
                </Card>
            </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Orders</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Table responsive>
                        <thead className="text-primary">
                            <tr>
                            <th>Order ID</th>
                            <th>Payment Method</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              orders.map((order,key) => (
                                <tr key={key}>
                                  <td>{order.short_id}</td>
                                  <td>Flutterwave</td>
                                  <td>{order.date}</td>
                                  <td>{order.deliveryTime}</td>
                                  <td><span className="badge badge-secondary">{order.status}</span></td>
                                  <td>N{order.price}</td>
                                  <td>
                                      <Link to="" className="badge badge-info">
                                      <i className="fas fa-eye" />
                                      {" "}View
                                      </Link>
                                  </td>
                                </tr>
                              ))
                            }
                        </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
            </Row>
        </div>
        </>
        <Footer fluid />
      </div>
      }
    </div>
  );
}

 

const mapStateToProps = state => ({
  customers: state.customer.customers
})

export default connect(mapStateToProps)(CustomerDetails);
