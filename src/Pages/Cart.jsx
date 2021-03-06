import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import {useNavigate} from "react-router-dom"
import { emptyCart } from "../Redux/cartredux";

const KEY = process.env.REACT_APP_STRIPE_KEY;


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${mobile({alignItems: 'flex-end', marginRight:100})};
`;

const ProductAmountContainer = styled.div`
  margin-bottom: 20px;
  
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  font-weight: 600;
  ${mobile({margin:"5px 20px", fontSize: 16})};
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 600;
  ${mobile({ marginBottom: "20px", marginLeft:"280px", fontSize: 16 })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-bottom:60px;
  ${mobile({ height: "25vh"})}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const CardDetails = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
  padding-top: 20px;
  margin-top: 25px;
`;
const Text = styled.span`
  text-align: center;
  font-size:13px;
  color:#8a8a8a;
  ${mobile({ fontSize: "0.8rem" })};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border:none;
  border-radius:7px;
  cursor: pointer;
  &:hover{
    opacity:0.6;
  }
`;

const Empty = styled.div`
  text-align: center;
  align-items: center;
  color: rgb(112, 108, 105);
  font-size: 1.5em;
  margin: 100px auto;
  ${mobile({margin:"70px auto", fontSize:"1em"})};
  
`;

const Cart = () => {
  const cart = useSelector(state=>state.cart);
  const [stripeToken, setStripeTOken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onToken = (token) => {
    setStripeTOken(token);
  }
  useEffect(() => {
    const makeRequest = async () =>{
      try{
        const res = await userRequest.post("/checkout/payment",{
          tokenId:stripeToken.id,
          amount:cart.totalPrice * 100,
          paymentMethodType:"card"
        })

        navigate("/success",{state:{stripeData:res.data, products:cart}});

      } catch(err){
          console.log(err);

      }
    }
    stripeToken && makeRequest();

  },[stripeToken, cart.totalPrice,navigate, cart])


  const handleClick = () => {
    dispatch(emptyCart())
  }

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <Title>YOUR SHOPPING BAG</Title>
        <Top>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText onClick={handleClick}>Empty your cart</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            { cart.products.length > 0 ? cart.products.map(product =>(
            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                <ProductAmount>Qty: {product.quantity}</ProductAmount>
                </ProductAmountContainer>
                <ProductPrice>Amount: ??? {product.price * product.quantity}</ProductPrice>
              </PriceDetail>
              <Hr />
            </Product>))
            :<Empty>Your Cart is Empty. Click <a style={{textDecoration:"none", fontWeight:700, color:"palevioletred"}}href= "/products">here</a> to add products</Empty>}
            </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>??? {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>??? {cart.totalPrice?99.90:0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-??? {cart.totalPrice?99.90:0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>??? {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name = "FASHKART"
              billingAddress
              shippingAddress
              description = {`Your total is ??? ${cart.totalPrice}`}
              amount = {cart.totalPrice * 100}
              token = {onToken}
              stripeKey = {KEY}
              currency = 'INR'
              payment
            >
            {cart.totalPrice>0?<Button>Checkout Now</Button>:<Button disabled>Checkout Now</Button>} 
            </StripeCheckout>
            <CardDetails>
              <Text>
                For payment use 4242 4242 4242 4242 as your card number with any CVC and future date
              </Text>
            </CardDetails>
          </Summary>
          
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;