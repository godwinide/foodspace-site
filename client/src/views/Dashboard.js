import { statusColors } from "constants/statusColors";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  CardHeader,
} from "reactstrap";

function Dashboard({orders, foods, customers}) {
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState('...');
  const [shipping, setShipping] = useState('...');
  const [delivered, setDelivered] = useState('...');
  const [cancelled, setCancelled] = useState('...');
  const [totalSales, setTotalSales] = useState('...');

  useEffect(()=> {
    const today = new Date().toLocaleDateString();
    const pending = orders.filter(ord => ord.status === 'pending' && new Date(ord.date).toLocaleDateString() == today).length;
    const shipping = orders.filter(ord => ord.status === 'on the way' && new Date(ord.date).toLocaleDateString() == today).length;
    const delivered = orders.filter(ord => ord.status === 'delivered' && new Date(ord.date).toLocaleDateString() == today).length;
    const cancelled = orders.filter(ord => ord.status === 'cancelled' && new Date(ord.date).toLocaleDateString() == today).length;
    const sales = orders.reduce((prev, curr) => prev + Number(curr.price), 0);

    setPendingOrders(pending);
    setShipping(shipping);
    setDelivered(delivered);
    setCancelled(cancelled);
    setTotalSales(sales);
  },[orders])

  return (
    <>
      <div className="content">
        <Row>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody className="bg-secondary" style={{borderRadius: 10}}>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                      <i class="fas fa-ellipsis-h text-white"></i>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category text-white">Pending orders</p>
                    <CardTitle tag="p" className="text-white display-5 lead" style={{fontWeight: "bold"}}>{pendingOrders}</CardTitle>
                    <p className="card-category bold-text text-white" style={{fontWeight:"bold"}}>Today</p>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody className="bg-warning" style={{borderRadius: 10}}>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                      <i class="fas fa-car text-dark"></i>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category text-dark">Shipping orders</p>
                    <CardTitle tag="p" className="text-dark display-5 lead" style={{fontWeight: "bold"}}>{shipping}</CardTitle>
                    <p className="card-category bold-text text-dark" style={{fontWeight:"bold"}}>Today</p>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody className="bg-success" style={{borderRadius: 10}}>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                      <i class="fas fa-check-double text-white"></i>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category text-white">Delivered orders</p>
                    <CardTitle tag="p" className="text-white display-5 lead" style={{fontWeight: "bold"}}>{delivered}</CardTitle>
                    <p className="card-category bold-text text-white" style={{fontWeight:"bold"}}>Today</p>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody className="bg-danger" style={{borderRadius: 10}}>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                      <i class="fas fa-times text-white"></i>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category text-white">Cancelled orders</p>
                    <CardTitle tag="p" className="text-white display-5 lead" style={{fontWeight: "bold"}}>{cancelled}</CardTitle>
                    <p className="card-category bold-text text-white" style={{fontWeight:"bold"}}>Today</p>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody className="bg-info" style={{borderRadius: 10}}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-hamburger text-white" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category text-white">Total Foods</p>
                      <CardTitle tag="p" className="text-white display-5 lead" style={{fontWeight: "bold"}}>{foods.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody className="bg-dark" style={{borderRadius: 10}}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-users text-white" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category text-white">Total Customers</p>
                      <CardTitle tag="p" className="text-white display-5 lead" style={{fontWeight: "bold"}}>{customers.length}</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody style={{borderRadius: 10, backgroundColor: "purple"}}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-white" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category text-white">Total Sales</p>
                      <CardTitle tag="p" className="text-white display-5 lead" style={{fontWeight: "bold"}}>NGN{totalSales}</CardTitle>
                      <p className="card-category bold-text text-white" style={{fontWeight:"bold"}}>Today</p>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"2em"}}>
                <h4 className="text-bold" style={{textTransform: "uppercase"}}>Recent Orders</h4>
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
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.deliveryTime}</td>
                        <td><span className="badge p-2" style={{...statusColors[order.status]}}>{order.status}</span></td>
                        <td>N{order.price}</td>
                        <td>
                            <Link to={"/order-details/"+order._id} className="badge badge-info">
                            <i className="fas fa-eye p-2" />
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
  );
}

const mapStateToProps = state =>({
  orders: state.order.orders,
  customers: state.customer.customers,
  foods: state.food.foods
}) 

export default  connect(mapStateToProps)(Dashboard);
