import React, {useEffect} from "react";
import {Link} from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import {connect} from 'react-redux'
import {getOrders} from '../actions/orders'
import { statusColors } from "constants/statusColors";

const Orders = ({getOrders, orders}) => {
  
  useEffect(()=> {
    getOrders();
  },[]);

  return (
      <>
      <div className="content">
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
                      <th>Order Date</th>
                      <th>Delivery Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                      orders.reverse().map((order,key) => (
                        <tr key={key}>
                          <td>
                          <Link to={"/order-details/"+order._id}>
                            {order.short_id}
                          </Link>
                          </td>
                          <td>{order.date}</td>
                          <td>{order.deliveryTime}</td>
                          <td><span className="badge p-2" style={{...statusColors[order.status]}}>{order.status}</span></td>
                          <td>N{order.price}</td>
                          <td>
                              <Link to={"/order-details/"+order._id} className="badge badge-info p-2">
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
  );
}

const mapStateToProps = state =>({
  orders: state.order.orders
}) 

export default connect(mapStateToProps, {getOrders})(Orders)

