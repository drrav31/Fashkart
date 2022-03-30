import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    flex: 1;
    margin:3px;
    height:70vh;
    position:relative;
`
const Image = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    ${mobile({height:"100vh"})};
`
const Info = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;

`
const Title = styled.h1`
    color:mediumspringgreen; 
    margin-bottom:30px;
    ${mobile({marginBottom:"25px",color:"#b8ff4d"})};

`
const Button = styled.button`
    border:none;
    padding:10px;
    background-color:cornsilk;
    font-weight:500;
    cursor: pointer;
    border-radius:10px;
    color:black;
    margin-top:10px;
`

const CategoryItem = ({item}) => {
  return (
  <Container>
      <Image src = {item.img}></Image>
      <Info>
          <Title>{item.title}</Title>
          <Link to = {item.id === 1 ? `/products/shirts` : item.id===2 ? `/products/casual` : `/products/jackets`}><Button>Shop Now</Button></Link>
      </Info>


  </Container>
  )
  ;
};

export default CategoryItem;
