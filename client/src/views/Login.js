import { login } from '../actions/auth';
import axios from 'axios';
import React, {useState} from 'react'
import { connect } from 'react-redux';

const Login = ({login, history}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try{
            setLoading(true);
            setErrorMsg("");
            const res = await axios.post("/api/admin/auth/login", {username, password}, {timeout: 30000});
            setLoading(false);
            login(res.data);
            history.push("/admin/dashboard")

        }
        catch(err){
            setLoading(false);
            if(err.response?.status == 400 ||err.response?.status == 401){
                setErrorMsg(err.response.data.msg);
                return false;
            }else{
                setErrorMsg("Check your internet connection");
            }   
        }
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" alt="IMG"/>
                    </div>
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Belleful Admin Login
                        </span>
                        {
                            errorMsg
                            &&
                            <div className="alert alert-warning d-flex align-items-center" role="alert">
                                <div>
                                    {errorMsg}
                                </div>
                            </div>
                        }
                        <div className="wrap-input100 validate-input" data-validate = "Valid username is required: ex@abc.xyz">
                            <input required 
                            className="input100" 
                            type="text" 
                            name="username" 
                            placeholder="Username"
                            onInput={t => setUsername(t.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input required 
                            className="input100" 
                            type="password" 
                            name="pass" 
                            placeholder="Password"
                            onInput={t => setPassword(t.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="container-login100-form-btn">
                            {
                                !loading
                                ?<button className="login100-form-btn" type="button"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                                :<button className="login100-form-btn" type="button"
                                >
                                    Logging in..
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {login})(Login)
