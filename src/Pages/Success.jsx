import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { emptyCart } from "../Redux/cartredux";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, rgb(255, 148, 114), rgb(242, 112, 156));
  
`;
const Message = styled.div`
  font-size: 20;
  ${mobile({fontSize:16, marginLeft:20})};
`
const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  cursor:pointer;
  border-radius:5px;
  &:hover { background-color: #bbb; }
`

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  return (
    <Container>
      <Message>Your order was placed successfully.Thank you for Shopping with us..</Message>
      <Button  
        onClick={()=>{
          dispatch(emptyCart());
          navigate('/');
          }}
      >Go to Homepage </Button>
  </Container>
  );
};

export default Success;