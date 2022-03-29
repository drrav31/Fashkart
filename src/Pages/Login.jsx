import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../Redux/apiCalls";
import {mobile} from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* background-image: linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% ); */
  background-image: linear-gradient( 109.6deg,  rgba(110,123,251,0.8) 11.2%, rgba(156,252,248,1) 91.1% );


  
`;

const Wrapper = styled.div`
  width: 320px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: 0 10px 15px rgba(159, 159, 159, 0.7);
  background-image: linear-gradient(to right, rgb(255, 148, 114), rgb(242, 112, 156));

  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border:transparent;

`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  height: 50px;
  margin: 10px 0;
  padding: 10px;
  /* border:2px solid rgba(178, 182, 186,0.7); */
  border: none;
  outline: none;
  border-radius:5px;
`;

const Button = styled.button`
  width:50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  border-radius:20px;
  color: white;
  margin:auto;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: turquoise;
    cursor: not-allowed;

  }
  &:hover{
    opacity:0.8;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: none;
  color:blueviolet;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;

`
const Welcome = styled.h4`
  text-align: center;
  font-weight: 400;

`
const Show = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
`

const Login = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isFetching, error} = useSelector((state) => state.user)

  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, {username, password})
    navigate(-1);
  }

  const togglePass = () => {
    const pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text"
    }
    else{
      pass.type = "password"
    }

  }
  return (
    <Container>
      
      <Wrapper>
        <Title>Sign In</Title>
        <Welcome>Welcome back. Login to Continue</Welcome>
        <Form>
          <Input placeholder="Username" required onChange = {(e) => setUserName(e.target.value)} />
          <Input id = "password" type = "password" placeholder="Password" required onChange = {(e) => setPassword(e.target.value)}/>
          <Show><input id = "show-or-hide" type = "checkbox" onClick = {togglePass} style = {{"cursor": "pointer"}}/>Show Password</Show>

  
          <Link>Forgot Password?</Link>

          <Button onClick = {handleClick} disabled = {isFetching}>LOGIN</Button>
          {error ? <Error>Something went wrong!!</Error>:<></>}
          
          <span>Don't have an account yet? <Link href = '/register'>Register now</Link></span>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;