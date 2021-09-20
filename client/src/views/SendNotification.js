import React, {useState} from "react";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";


const SendNotification = (props) =>{
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

    const handleUpdate = async () => {
        try{
            setLoading(true);
            await axios.post("/api/admin/notification/send", {
              title,
              message
            }, {timeout: 30000, headers:{'x-auth-token': props.userToken}});
            setLoading(false);
            toast("Sent successfully",  {style:{backgroundColor:"green", color:"#fff"}});
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
        <Sidebar
            {...props}
            routes={routes}
            bgColor={"black"}
            activeColor={"info"}
        />  
            <div className="main-panel p-5" style={{width: "100%"}}>
                <div className="mt-5" style={formStyle}>
                <p>Send Notification to all customers:</p>
                    <form>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Title</label>
                            <input 
                            value={title}
                            onInput={t => setTitle(t.target.value)}
                            type="text" 
                            class="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Enter title"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label">Enter message</label>
                            <textarea onInput={t => setMessage(t.target.value)}  class="form-control" id="exampleFormControlTextarea1" rows="3">{message}</textarea>
                        </div>
                        <div className="mb-3">
                        {
                            loading
                            ?<button className="btn btn-success" type="button" disabled>Loading..</button>
                            :<button className="btn btn-success" type="button" onClick={handleUpdate}>Send</button>
                        }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const formStyle = {
    maxWidth: "500px", 
    backgroundColor: "#fff",
    padding: "3em",
    borderRadius: "20px",
    boxShadow: "4px 3px 4px #000"
}

const mapStateToProps = state => ({
    userToken: state.auth.token
})
  
  export default connect(mapStateToProps)(SendNotification);
  

