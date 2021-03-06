import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import {publicRequest} from "../requestMethods"
import { addProduct } from "../Redux/cartredux";
import {useDispatch, useSelector} from 'react-redux'
// import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 80%;
  height: 110vh;
  object-fit: cover;
  ${mobile({ height: "75vh",width:"70%" })};
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px 0" })}
`;

const Title = styled.h1`
  font-weight: 200;
  ${mobile({fontSize:18, fontWeight:400})}
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  ${mobile({fontSize:24})}
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "80%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "90%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid coral;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid coral;
  background-color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover{
      background-color: #d8b9c4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [prod,setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() =>{
    const getProduct = async () => {
      try{
        const res = await publicRequest.get("/products/find/"+id);
        setProduct(res.data);
        
      }
      catch{}
    }
    getProduct();
   

  },[id]);

  const handleQuantity = (type) =>{
    if(type === "dec"){
      quantity > 1 && setQuantity(quantity - 1);

    }
    else{
      setQuantity(quantity+1)
    }
  }

  const handleClick = ()=>{
    dispatch(addProduct({...prod, quantity, color, size}))
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      
      <Wrapper>
        <ImgContainer>
          <Image src={prod.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{prod.title}</Title>
          <Desc>
          {prod.desc}
          </Desc>
          <Price>??? {prod.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {prod.color?.map(c=>(
                <FilterColor color={c} key = {c} onClick = {()=>setColor(c)} />

              ))}
              
    
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {prod.size?.map(s=>(
                  <FilterSizeOption key = {s}>{s}</FilterSizeOption>

                ))}
                
        
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick = {()=>handleQuantity("dec")}/>
              <Amount>{quantity}</Amount>
              <Add onClick = {()=>handleQuantity("inc")}/>
            </AmountContainer>
            {user?<Button onClick = {handleClick}>ADD TO CART</Button>:<div><a href = '/login'>Login</a> to add to cart</div>}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;