import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, LockIcon, SmsIcon } from "../../assets/Icons";
import Axios  from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../store/reducers/authReducer";
import { useLocation } from 'react-router-dom';

const Login = ({setuser}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, set_email] = useState("");
  const [password, set_password] = useState("");



  async function Handlelogin(event) 
  {
    event.preventDefault(); // prevent the form from submitting
    try{

      const userData=await Axios.get("https://duapi-production.up.railway.app/getdatabymail?"+ new URLSearchParams({
        Email: email,})
      ).then((response)=>{
        console.log(response);
        if(response.data.length==0)
        {
          alert("Email is not Registered")
          return;
        }
        else if(response.data[0].Email==email && response.data[0].password==password)
        {
          setuser(response.data[0].userAddress,response.data[0]);
          // setuser("0x7D8d2d6BCDC1e586F94F4ca77a4BC92E3f6CD738",response.data[0]);

          dispatch(setUserToken(true));
          navigate("dashboard/home");


        }
        else 
        {

          alert("Email or Password is wrong")
          return;
        }

      })
    }catch(e){
      // console.log(e.response.data);
    }
   

  }




  const [passwordShow, setPasswordShow] = useState(false);
  return (
    <div className="login-page  bg-themeColor relative">
      <div className="shade absolute"></div>
      <div className="login_block flex">
        <div className="login-left flex-1">
          <div className="bg-left"></div>
        </div>
        <form className="login-right form-block flex flex-col flex-1 z-10" onSubmit={Handlelogin}>
          <div className="page-header flex flex-col gap-6 justify-center items-center">
            <img src="./images/logo.svg" className="p-logo" />
            <h1 className="title">Login</h1>
          </div>
          <div className="row1 w-full">
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Email</h1>
              <div className="input-box flex items-center gap-3">
                <div className="Icon">
                  <SmsIcon />
                </div>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="txt cleanbtn w-full"
                  value={email}
                  required
                  onChange={(e) => {
                    set_email(e.target.value);
                }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Password</h1>
              <div className="input-box flex items-center gap-3">
                <div className="Icon">
                  <LockIcon />
                </div>
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter Password"
                  className="txt cleanbtn w-full"
                  value={password}
                  required
                  onChange={(e) => {
                    set_password(e.target.value);
                }}
                />
                <div
                  className="Icon"
                  onClick={(e) => setPasswordShow(!passwordShow)}
                >
                  <EyeIcon />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
              <p className="forgot cursor-pointer">Forgot Password?</p>

                <Link to="/auth/register" className="forgot cursor-pointer">
                  Sign Up 
                </Link>
              </div>
            </div>

            <button  className="btn-register button" >
              Login 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
