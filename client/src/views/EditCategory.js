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
import { getCategories } from "actions/categories";



const EditCategory = (props) =>{
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [name, setName] = useState("");

    const handleUpdate = async () => {
        try{
            setLoading(true);
            await axios.post("/api/admin/categories/update", {
              name,
              id: category._id
            }, {timeout: 30000, headers:{'x-auth-token': props.userToken}});
            setLoading(false);
            props.getCategories();
            toast("Category updated successfully",  {style:{backgroundColor:"green", color:"#fff"}});
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
        const category = props.categories.filter(r => r._id === id)[0];
        setCategory(category);
        setName(category.name);
        setLoading(false);
    }, [props.categories])

    return (
        <div className="wrapper">
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
                        <CardTitle tag="h5">Edit Category</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form>
                    <Row>
                        <Col className="pr-1" md="3">
                        <FormGroup>
                            <Label>Category Name*</Label>
                            <Input
                                placeholder="Category name"
                                type="text"
                                required
                                value={name}
                                onInput={t => setName(t.target.value)}
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
    categories: state.category.categories,
    userToken: state.auth.token
  })
  
  export default connect(mapStateToProps, {getCategories})(EditCategory);
  

