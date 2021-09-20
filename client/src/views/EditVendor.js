import React, {useState, useEffect} from "react";
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
  Label
  
} from "reactstrap";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import axios from "axios";
import { getRestaurants } from "actions/restaurants";



const EditVendor = (props) =>{
    const [loading, setLoading] = useState(true);
    const [vendor, setVendor] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

    const handleUpdate = async () => {
        try{
            setLoading(true);
            const res = await axios.post("/api/admin/restaurants/update", {
              name, 
              firstname,
              lastname,
              email,
              phone,
              address,
              password,
              password1,
              id: vendor._id
            }, {timeout: 30000, headers:{'x-auth-token': props.userToken}});
            setLoading(false);
            props.getRestaurants();
            toast("Vendor updated successfully",  {style:{backgroundColor:"green", color:"#fff"}});
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


    useEffect(()=> {
        const {match:{params:{id}}} = props;
        const vendor = props.restaurants.filter(r => r._id === id)[0];
        setVendor(vendor);
        setName(vendor.name)
        setFirstname(vendor.firstname)
        setLastname(vendor.lastname)
        setAddress(vendor.address)
        setPhone(vendor.phone)
        setEmail(vendor.email)
        setLoading(false);
    }, [props.restaurants])

    return (
        <div className="wrapper">
            {/* <ToastContainer /> */}
        <Sidebar
            {...props}
            routes={routes}
            bgColor={"black"}
            activeColor={"info"}
        />
            {
                loading
                ?<Loading/>
                :<div className="main-panel p-5">
                <Card className="card-user">
                    <CardHeader>
                        <CardTitle tag="h5">Edit Vendor</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form>
                    <Row>
                        <Col className="pr-1" md="3">
                        <FormGroup>
                            <Label>Vendor Name*</Label>
                            <Input
                                placeholder="Vendor name"
                                type="text"
                                required
                                value={name}
                                onInput={t => setName(t.target.value)}
                            />
                        </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                        <FormGroup>
                            <Label>Firstname*</Label>
                            <Input
                                placeholder="First name"
                                type="text"
                                required
                                value={firstname}
                                onInput={t => setFirstname(t.target.value)}
                            />
                        </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                        <FormGroup>
                            <Label>Lastname*</Label>
                            <Input
                                placeholder="Last name"
                                type="text"
                                value={lastname}
                                onInput={t => setLastname(t.target.value)}

                            />
                        </FormGroup>
                        </Col>
                        <Col className="pr-1" md="3">
                        <FormGroup>
                            <Label>Email*</Label>
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onInput={t => setEmail(t.target.value)}

                            />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="exampleText">Address*</Label>
                                <Input type="textarea" 
                                    value={address}
                                    onInput={t => setAddress(t.target.value)}
                                    name="text" id="exampleText" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <Label>Phone*</Label>
                                <Input
                                    placeholder="Phone number"
                                    type="tel"
                                    value={phone}
                                    onInput={t => setPhone(t.target.value)}

                                />
                        </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onInput={t => setPassword(t.target.value)}
                            />
                        </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                        <FormGroup>
                            <Label>Retype Password</Label>
                            <Input
                                placeholder="Retype password"
                                type="password"
                                value={password1}
                                onInput={t => setPassword1(t.target.value)}
                            />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row className="ml-1">    
                        {
                            loading
                            ?<Button
                            className="btn"
                            color="secondary"
                            type="button"
                            >
                                Please wait..
                            </Button>
                            :<Button
                            onClick={handleUpdate}
                            className="btn"
                            color="success"
                            type="button"
                            >
                                Update
                            </Button>
                        }
                    </Row>
                    </Form>
                </CardBody>
                </Card>
            </div>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants,
    userToken: state.auth.token
  })
  
  export default connect(mapStateToProps, {getRestaurants})(EditVendor);
  

