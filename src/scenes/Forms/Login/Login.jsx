import "./Login.css"
import profile from "../../../images/clickup-logo-landscape-1200x900.jpeg";
import email from "../../../images/email.jpg";
import pass from "../../../images/pass.png";
import { useNavigate } from "react-router-dom";
function LoginForms() {
  const navigate = useNavigate();
  const gotoHomepage = () => {
    navigate("/Homepage");
  };
  // const goToSignup = () => {
  //   navigate("/Signup");
  // };
  return (
    <div className="main">
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
         <div>
           <h1>Login Page</h1>
           <div>
             <img src={email} alt="email" className="email"/>
             <input type="text" placeholder="email" className="name"/>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="password" className="name"/>
           </div>
          <div className="login-button">
          <button

        onClick={() => gotoHomepage()}

          
          >Login</button>
          </div>
           
            <p className="link">
              <a href="#">Forgot password ?</a> Or<a href="#">Sign Up</a>
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
  );
}

export default LoginForms;