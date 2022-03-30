import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 115vh;
  background-image: linear-gradient(to top, rgb(255, 148, 114), rgb(242, 112, 156));
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  ${mobile({ width: "75%", height: "90%", flexDirection: "column"})}
  background-image: linear-gradient( to right, rgba(180,123,160,0.7) 11.2%, rgba(186,170,180,0.7) 91.1%);
  box-shadow: 0 10px 15px rgba(249, 159, 115, 1);
  border-radius:7px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 5px;
  border:none;
  outline: none;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  border-radius:7px;
  margin:10px auto;

  cursor: pointer;
  ${mobile({ width: "75%", height: "40%" })}
  &:hover{
    opacity: 0.7;
  }
`;

const PasswordCheck = styled.div`
  color:black;
  font-size: 14px;
  margin-top:20px;
  font-weight: 600;
`;

const Agreement = styled.label`
  display: block;
  padding-left: 15px;
  text-indent: -15px;
  font-size: 14px;
  color: black;
`;

const CheckBox = styled.input`
  width: 12px;
  height: 12px;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClick = async () =>{
    const res = await publicRequest.post('/auth/register/',{
      username,
      email,
      password,

    })
    console.log(res.data)
  }

  return (
    
    <Container>
      <Wrapper>
        <Title>Create a New  Account</Title>
        <Form>
          <Input placeholder="name" required/>
          <Input placeholder="last name" />
          <Input placeholder="username" required onChange = {e=>setUserName(e.target.value)}/>
          <Input placeholder="email" required onChange = {e=>setEmail(e.target.value)}/>
          <Input type = "password" placeholder="password" required onChange = {e=>setPassword(e.target.value)} />
          <Input type = "password" placeholder="confirm password" required onChange = {e=>setConfirmPassword(e.target.value)}/>
          {password.length>=8 && confirmPassword.length>=1 && password!==confirmPassword?<PasswordCheck>Password's don't match</PasswordCheck>:<PasswordCheck/>}
          {password.length<8? <PasswordCheck>Password should contain atleast 8 characters</PasswordCheck>:<PasswordCheck/>}
          <Agreement style={{ marginTop: "10px" }}>
              <CheckBox
                type="checkbox"
                required
              />
              I have read and agree to the Privacy policy and Terms of Fashkart.
            </Agreement>
          <Button onClick = {handleClick}>CREATE ACCOUNT</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;