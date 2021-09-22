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
import { getFoods } from "actions/foods";
import axios from "axios";



const AddFood = (props) =>{

    const [prices, setPrices] = useState([]);
    const [price, setPrice] = useState("");
    const [standardPrice,setStandardPrice] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [vendor, setVendor] = useState(props.restaurants[0]?._id || "")
    const [vendor_name, setVendorName] = useState(props.restaurants[0]?.name || "")
    const [category, setCategory] = useState(props.categories[0]?._id || "")
    const [category_name, setCategoryName] = useState(props.categories[0]?.name || "")
    const [is_visible, setVisible] = useState(false);
    const [is_special, setIsSpecial] = useState(false);
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleRemovePrice = index => {
        const newPrices =  prices.filter((p,i) => i !== index);  
        setPrices(newPrices);
    }

    const handleImage = e => {
        const image = e.target.files[0];
        const valid_types = ["image/jpeg", "image/jpg", "image/png"];
        if(!valid_types.includes(image.type)){
            e.preventDefault();
            setImage(null);
            e.target.value = "";
            toast("Invalid image type",  {style:{backgroundColor:"yellow", color:"#000"}});
            return false;
        }
        setImage(image);
    }

    const handleCreate = async() => {
        try{
            const data = new FormData();
            data.append("name", name);
            data.append("price", standardPrice);
            data.append("prices", prices);
            data.append("description", description);
            data.append("vendor", vendor);
            data.append("vendor_name", vendor_name);
            data.append("category", category);
            data.append("category_name", category_name);
            data.append("is_visible", is_visible);
            data.append("is_special", is_special);
            data.append("image", image);

            setLoading(true);
            await axios.post("/api/admin/foods/create", 
            data, {
                timeout: 30000, 
                headers:{
                    'x-auth-token': props.userToken,
                    'Content-type': 'multipart/form-data'
                }
            });
            setLoading(false);
            getFoods(props.userToken);
            toast("Food created successfully",  {style:{backgroundColor:"green", color:"#fff"}});
            props.history.push("/admin/foods");
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
            {/* <ToastContainer /> */}
        <Sidebar
            {...props}
            routes={routes}
            bgColor={"black"}
            activeColor={"info"}
        />
                <div className="main-panel p-5">
                <Card className="card-user">
                    <CardHeader>
                        <CardTitle tag="h5">Add Food</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form>
                    <Row>
                        <Col className="pr-1" md="5">
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                onInput={t => setName(t.target.value)}
                                value={name}
                                placeholder="Food name"
                                type="text"
                            />
                        </FormGroup>
                        </Col>
                        <Col className="pl-1" md="3">
                            <FormGroup>
                            <Label for="exampleSelect">Vendor</Label>
                            <Input
                                onInput={t => {
                                    setVendor(t.target.value);
                                    setVendorName(t.document.selectedOptions[0]);
                                }}
                                type="select" name="select" id="exampleSelect">
                                {
                                    props.restaurants.map(c => (
                                        <option value={c._id}>{c.name}</option>
                                    ))
                                }
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                        <FormGroup>
                        <Label for="exampleSelect">Category</Label>
                            <Input 
                                onInput={t => {
                                    setCategory(t.target.value);
                                    setCategoryName(t.target.innerText);
                                }}
                            type="select" name="select" id="exampleSelect">
                                {
                                    props.categories.map(c => (
                                        <option>{c.name}</option>
                                    ))
                                }
                            </Input>
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="exampleText">Description</Label>
                                <Input value={description}
                                onInput={t => setDescription(t.target.value)}
                                type="textarea" name="text" id="exampleText" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="ml-1">
                        <Col className="pl-1" md="4">
                            <FormGroup>
                            <Label for="exampleSelect">Visible</Label>
                            <Input 
                            onInput={t => setVisible(t.target.value)}
                            type="select" name="select" id="exampleSelect">
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                            <FormGroup>
                            <Label for="exampleSelect">Today's Special</Label>
                            <Input 
                            onInput={t => setIsSpecial(t.target.value)}
                            type="select" name="select" id="exampleSelect">
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="exampleFile">Image</Label>
                                <Input onInput={handleImage} type="file" accept="image/*" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="ml-2">
                    <Col md="6">
                            <div className="prices">
                                {
                                    prices.map((p, index) => (
                                        <button 
                                        key={index}
                                        onClick={()=> handleRemovePrice(index)}
                                        type="button" className="btn btn-close btn-dark">{p}{" "}
                                        <i className="fas fa-times text-danger"></i>
                                        </button>
                                    ))
                                }
                            </div>
                            <FormGroup>
                                <Row>
                                    <Label>Prices</Label>
                                    <Input
                                        placeholder="type a price and click add"
                                        type="number"
                                        value={price}
                                        onInput={text => setPrice(text.target.value)}
                                    />
                                    <Button
                                        className="btn"
                                        color="primary"
                                        type="button"
                                        style={{display: "inline-block"}}
                                        onClick={()=> {
                                            if(Number(price) > 0){
                                                setPrices([...prices, price]);
                                            }
                                        }}
                                    >
                                    Add Price
                                    </Button>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Standard Price</Label>
                                <Input
                                    placeholder="Enter Price"
                                    type="number"
                                    value={standardPrice}
                                    onInput={text => setStandardPrice(text.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>    
                    <div className="update ml-auto mr-auto">
                        {
                            loading
                            ?<Button
                            className="btn"
                            color="secondary"
                            type="button"
                            >
                                Creating, please wait..
                            </Button>
                            :vendor_name ?
                            <Button
                            onClick={handleCreate}
                            className="btn"
                            color="success"
                            type="button"
                            >
                                Create
                            </Button>
                            :<Button
                            className="btn"
                            color="success"
                            type="button"
                            >
                                Create
                            </Button>
                        }
                    </div>
                    </Row>
                    </Form>
                </CardBody>
                </Card>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    restaurants: state.restaurant.restaurants,
    userToken: state.auth.token
  })
  
  export default connect(mapStateToProps, {getFoods})(AddFood);
  

