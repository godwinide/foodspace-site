import React,{useEffect, useState} from "react";
import { getCategories } from "actions/categories";
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

function Categories({categories, userToken, getCategories}) {
  useEffect(()=> {
    getCategories(userToken);
  },[]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAdd = async() => {
    try{
      setLoading(true);
      await axios.post("/api/admin/categories", {
        name
      }, {timeout: 30000, headers:{'x-auth-token':userToken}});
      setLoading(false);
      toggle();
      getCategories();
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
        await axios.post("/api/admin/categories/delete", {
          id 
        }, {timeout: 30000, headers:{'x-auth-token': userToken}});
        getCategories(userToken);
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
          <ModalHeader toggle={toggle}>Add A Category</ModalHeader>
          <ModalBody>
          <Form>
              <Row>
                  <Col md="6">
                    <FormGroup>
                        <Label>Category Name</Label>
                        <Input
                            placeholder="Category name"
                            type="text"
                            value={name}
                            onInput={t => setName(t.target.value)}
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
                <CardTitle tag="h4">Categories</CardTitle>
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
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map(c => (
                        <tr>
                          <td>{c.name}</td>
                          <td>
                            <Link 
                                to={"/edit-category/"+c._id}
                                className="bg-primary p-2 text-white"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-pen text-white pr-1" />
                            Edit</Link>
                          </td>
                          <td>
                            <Button 
                                onClick={()=> handleDelete(c._id)}
                                className="bg-danger p-2 text-white"
                                style={{borderRadius: 10}}
                            >
                            <i className="fas fa-trash text-dark pr-1" />
                            Delete
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
  categories: state.category.categories,
  userToken: state.auth.token
});

export default connect(mapStateToProps, {getCategories})(Categories);

