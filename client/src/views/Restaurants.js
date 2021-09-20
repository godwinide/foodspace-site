import { getRestaurants } from "actions/restaurants";
import axios from "axios";
import React,{useEffect, useState} from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "reactstrap";


function Restaurants({restaurants, getRestaurants, userToken}) {

  useEffect(()=> {
    getRestaurants(userToken);
  },[]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAdd = async() => {
    try{
      setLoading(true);
      await axios.post("/api/admin/restaurants/create", {
        name, 
        firstname,
        lastname,
        email,
        phone,
        address,
        password,
        password1
      }, {timeout: 30000, headers:{'x-auth-token':userToken}});
      setLoading(false);
      toggle();
      getRestaurants();
      toast("Vendor created successfully",  {style:{backgroundColor:"green", color:"#fff"}});
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

  const handleDelete = async id => {
    try{
      if(window.confirm("Are you sure?")){
        await axios.post("/api/admin/restaurants/delete", {
          id 
        }, {timeout: 30000});
        getRestaurants();
        toast("Vendor deleted successfully",  {style:{backgroundColor:"green", color:"#fff"}});
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
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Vendor</ModalHeader>
          <ModalBody>
          <Form>
              <Row>
                  <Col md="6">
                    <FormGroup>
                        <Label>Vendor Name</Label>
                        <Input
                            placeholder="Vendor name"
                            type="text"
                            value={name}
                            onInput={t => setName(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>Firstname</Label>
                        <Input
                            placeholder="Vendor name"
                            type="text"
                            value={firstname}
                            onInput={t => setFirstname(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>LastName</Label>
                        <Input
                            placeholder="Vendor name"
                            type="text"
                            value={lastname}
                            onInput={t => setLastname(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            placeholder="Vendor email"
                            type="email"
                            value={email}
                            onInput={t => setEmail(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input
                            placeholder="Phone"
                            type="tel"
                            value={phone}
                            onInput={t => setPhone(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>Address</Label>
                        <Input
                            placeholder="Address"
                            type="address"
                            value={address}
                            onInput={t => setAddress(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>Retype password</Label>
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onInput={t => setPassword(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                        <Label>Retype Password</Label>
                        <Input
                            placeholder="Retype Password"
                            type="password"
                            value={password1}
                            onInput={t => setPassword1(t.target.value)}
                        />
                    </FormGroup>
                  </Col>
              </Row>
              </Form>
          </ModalBody>
          <ModalFooter>
            {
              loading
              ?<Button type="button" color="primary">Adding...</Button>
              :<Button type="button" color="primary" onClick={handleAdd}>Add</Button>
            }
            {'   '}<Button type="button" color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Vendors</CardTitle>
                <hr/>
                
                <Button 
                onClick={toggle}
                color="success">
                <i className="fas fa-plus"/>
                {" "}Add New</Button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Account Number</th>
                      <th>Account Name</th>
                      <th>Bank Name</th>
                      <th>Delete</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      restaurants.map(r => (
                        <tr>
                          <td>{r.name}</td>
                          <td>{r.address}</td>
                          <td>{r.phone}</td>
                          <td>{r.email}</td>
                          <td>{r.accountnumber}</td>
                          <td>{r.accountname}</td>
                          <td>{r.bankname}</td>
                          <td>
                            <Button 
                                onClick={()=> handleDelete(r._id)}
                                className="btn btn-danger p-2"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-trash text-white pr-1" />
                            Delete</Button>
                          </td>
                          <td>
                            <Link 
                                to={"/edit-vendor/"+r._id}
                                className="btn btn-info p-2"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-pen text-white pr-1" />
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
  categories: state.category.categories,
  restaurants: state.restaurant.restaurants,
  userToken: state.auth.token
})

export default connect(mapStateToProps, {getRestaurants})(Restaurants);
