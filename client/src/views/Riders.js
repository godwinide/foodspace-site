import React,{useEffect, useState} from "react";
import { getRiders } from "actions/riders";
import axios from "axios";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
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

function Riders({riders, userToken, getRiders}) {
  useEffect(()=> {
    getRiders(userToken);
  },[]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAdd = async() => {
    try{
      setLoading(true);
      await axios.post("/api/admin/riders/create", {
        name,
        phone
      }, {timeout: 30000, headers:{'x-auth-token':userToken}});
      setLoading(false);
      toggle();
      getRiders();
      toast("Category created successfully",  {style:{backgroundColor:"green", color:"#fff"}});
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
        await axios.post("/api/admin/riders/delete", {
          id 
        }, {timeout: 30000, headers:{'x-auth-token': userToken}});
        getRiders(userToken);
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
      <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add A Rider</ModalHeader>
          <ModalBody>
          <Form>
              <Row>
                  <Col md="6">
                    <FormGroup>
                        <Label>Ful Name</Label>
                        <Input
                            placeholder="Full name"
                            type="text"
                            value={name}
                            onInput={t => setName(t.target.value)}
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
                <CardTitle tag="h4">Riders</CardTitle>
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
                      <th>Phone</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      riders.map(c => (
                        <tr>
                          <td>{c.name}</td>
                          <td>{c.phone}</td>
                          <td>
                            <Link 
                                to={"/edit-rider/"+c._id}
                                className="bg-primary p-2 text-white"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-pen text-white pr-1" />
                            </Link>
                          </td>
                          <td>
                            <Button 
                                onClick={()=> handleDelete(c._id)}
                                className="bg-danger p-2 text-white"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-trash text-dark pr-1" />
                            </Button>
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
  riders: state.rider.riders,
  userToken: state.auth.token
});

export default connect(mapStateToProps, {getRiders})(Riders);

