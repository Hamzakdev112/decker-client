import React, { useEffect, useRef, useState } from "react";
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
import { login } from "../apiCalls/userApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {


// const {user} = useSelector(state=>state.user)

    const isFetching = false
  const [signIn, toggle] = React.useState(true);
  const [pfp, setPfp] = useState(null);
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const registerNameRef = useRef();
  const registerEmailRef = useRef();
  const registerPasswordRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()

const handleLogin = (e)=>{
  e.preventDefault();
  login(dispatch, loginEmailRef.current.value, loginPasswordRef.current.value, navigate)
}





  return (
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form >
          <Title>Create Account</Title>
          <Input
            ref={registerNameRef}
            required
            type="text"
            placeholder="Name"
          />
          <Input
            ref={registerEmailRef}
            required
            type="email"
            placeholder="Email"
          />
          <Input
            ref={registerPasswordRef}
            required
            type="password"
            placeholder="Password"
          />
          <label htmlFor="pfp-input">
            <Pfp src={pfp ? URL.createObjectURL(pfp) : "pfp.jpg"} />
          </label>
          <Input
            type="file"
            onChange={(e) => setPfp(e.target.files[0])}
            id="pfp-input"
            style={{ display: "none" }}
          />
          {isFetching ? (
            <CircularProgress />
          ) : (
            <Button type="submit">Sign Up</Button>
          )}
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
          {isFetching ? (
            <CircularProgress />
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
  );
};

export default Login;