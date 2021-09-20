import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import {connect} from 'react-redux'
import { getFoods } from "actions/foods";
import { toast } from "react-toastify";
import axios from "axios";

function Foods({foods, userToken, getFoods}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFoods(userToken);
  }, [])

  const handleDelete = async id => {
    try{
      if(window.confirm("Are you sure?")){
        await axios.post("/api/admin/foods/delete", {
          id 
        }, {timeout: 30000, headers:{'x-auth-token': userToken}});
        getFoods(userToken);
        toast("Category deleted successfully",  {style:{backgroundColor:"green", color:"#fff"}});
      }
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
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Foods</CardTitle>
                <hr/>
                <Link className="btn btn-success" to="/add-food">
                <i className="fas fa-plus"/>
                {" "}Add New</Link>
              </CardHeader>
              <CardBody>
              <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Vendor</th>
                      <th>Starting Price</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      foods.map(f => (
                        <tr>
                          <td>
                            <img src={f.image} style={{width: "5em", height: "5em"}} />
                          </td>
                          <td>{f.name}</td>
                          <td>{f.category_name}</td>
                          <td>{f.vendor_name}</td>
                          <td>{f.price}</td>
                          <td>
                            <Link to={"/edit-food/"+f._id} className="badge badge-success p-2">
                              <i className="fas fa-pen" />
                              {" "}Edit
                            </Link>
                          </td>
                          <td>
                            <Button onClick={()=> handleDelete(f._id)} className="badge badge-danger p-2">
                              <i className="fas fa-trash" />
                              {" "}Delete
                            </Button>
                          </td>
                          <td>
                            <Link to={"/view-food/"+f._id} className="badge badge-info p-2">
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
  foods: state.food.foods,
  userToken: state.auth.token
}) 

export default connect(mapStateToProps, {getFoods})(Foods)