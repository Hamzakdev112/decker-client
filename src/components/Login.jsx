import React, {  useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  GhostButton,
  Input,
  LeftOverlayPanel,
  Overlay,
  OverlayContainer,
  Paragraph,
  RightOverlayPanel,
  SignUpContainer,
  Title,
  SignInContainer,
  Anchor,
  Pfp,
} from "..//styles/Login";
import { CircularProgress } from "@mui/material";
import { login, register } from "../apiCalls/userApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {


// const {user} = useSelector(state=>state.user)

    const isFetching = false
  const [signIn, toggle] = React.useState(true);
  const [pfp, setPfp] = useState(null);
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  const registerFirstNameRef = useRef();
  const registerLastNameRef = useRef();
  const registerEmailRef = useRef();
  const registerPhoneRef = useRef();
  const registerPasswordRef = useRef();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loginLoading} = useSelector((state)=>state.user)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [registerMessage, setRegisterMessage] = useState(false)
  console.log(registerLoading)
  console.log(registerError)
const handleLogin = (e)=>{
  e.preventDefault();
  login(dispatch, loginEmailRef.current.value, loginPasswordRef.current.value, navigate)
}

const handleRegister = (e)=>{
  const payload = {
    firstName: registerFirstNameRef.current.value,
    lastName: registerLastNameRef.current.value,
    email: registerEmailRef.current.value,
    phone: registerPhoneRef.current.value,
    password: registerPasswordRef.current.value
  };
  e.preventDefault();
    register(payload, setRegisterLoading,setRegisterError,setRegisterMessage)
}



  return (
    <div className="w-[500px] h-[400px]">
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form onSubmit={handleRegister} >
          <Title>Create Account</Title>
          <div className="w-[100%] flex gap-[15px]">
          <Input
            ref={registerFirstNameRef}
            required
            type="text"
            placeholder="First Name"
            />
          <Input
            ref={registerLastNameRef}
            required
            type="text"
            placeholder="Last Name"
            />
            </div>
          <Input
            ref={registerEmailRef}
            required
            type="email"
            placeholder="Email"
          />
          <Input
            ref={registerPhoneRef}
            required
            type="tel"
            placeholder="Phone"
          />
          <Input
            ref={registerPasswordRef}
            required
            type="password"
            placeholder="Password"
          />
          <label htmlFor="pfp-input">
            <Pfp src={pfp ? URL.createObjectURL(pfp) : "/assets/pfp.png"} />
          </label>
          <Input
            type="file"
            onChange={(e) => setPfp(e.target.files[0])}
            id="pfp-input"
            style={{ display: "none" }}
          />
         {registerLoading ? (
           <ClipLoader color="#d41a0c" size="25px" />
           ) : (
             <Button type="submit">Sign Up</Button>
             )}
             {
              registerError ?
               <span className="text-[red] mt-2">{registerError}</span>
               : registerMessage && 
               <span className="text-[#13cf13] mt-2">{registerMessage}</span>
             }
        </Form>
      </SignUpContainer>

      <SignInContainer signinIn={signIn}>
        <Form onSubmit={handleLogin} >
          <Title>Sign in</Title>
          <Input ref={loginEmailRef} type="email" placeholder="Email" />
          <Input
            ref={loginPasswordRef}
            type="password"
            placeholder="Password"
          />
          <Anchor href="#">Forgot your password?</Anchor>
          {loginLoading ? (
            <ClipLoader color="#d41a0c" size="25px" />
          ) : (
            <Button type="submit">Sign In</Button>
          )}
        </Form>
      </SignInContainer>

      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <Title>LOGIN</Title>
            <Paragraph>Stay Connected</Paragraph>
            <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signinIn={signIn}>
            <Title>NEED AN ACCOUNT?</Title>
            <Paragraph>Click below button to join</Paragraph>
            <GhostButton onClick={() => toggle(false)}>
              Register Now
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
    </div>
  );
};

export default Login;