import "./Signup.css"
import profile from "../../../images/clickup-logo-landscape-1200x900.jpeg";
import email from "../../../images/email.jpg";
import pass from "../../../images/pass.png";
import { useNavigate } from "react-router-dom";
function SignUpForms() {
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
           <h1>Signup Page</h1>
           <div>
             <img src={email} alt="email" className="email"/>
             <input type="text" placeholder="Name" className="name"/>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="Password" className="name"/>
           </div>
          <div className="login-button">
          <button

        onClick={() => gotoHomepage()}

          
          >Signup</button>
          </div>
           
            <p className="link">
              <a href="#">Create Account</a>
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
  );
}

export default SignUpForms;