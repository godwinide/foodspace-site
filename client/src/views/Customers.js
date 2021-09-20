import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";


function Customers({customers}) {
  console.log(customers)
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Customers</CardTitle>
                <hr/>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      customers.map((c, key) => (
                        <tr key={key}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>
                            <Link 
                                to={`/customer-details/${c._id}`}
                                className="bg-secondary p-2 text-white"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-pen pr-1" />
                            Edit</Link>
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

const mapStateToProps = state => ({
  customers: state.customer.customers
});

export default connect(mapStateToProps)(Customers);
