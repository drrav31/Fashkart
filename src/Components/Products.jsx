import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Product from "./Product";

const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const NotAvailable = styled.div`
  font-size: 20px;
  margin:auto;
  margin-bottom:103px;
  
`

const Products = ({cat,filters,sort}) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const[products,setProducts] = useState([]);
  const[filteredProducts,setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async ()=>{
      try{
        const res = await axios.get(cat ? `https://fashkart.herokuapp.com/api/products?category=${cat}`: "https://fashkart.herokuapp.com/api/products");
        setProducts(res.data);


      }catch(err){

      }
      
      
    }
    getProducts();

  },[cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item=>Object.entries(filters).every(([key,value])=>
        item[key].includes(value)
      ))
    )
  },[products,cat,filters]);

  useEffect(() => {
      if(sort === "newest"){
          setFilteredProducts(prev=>
            [...prev].sort((a,b) => a.createdAt - b.createdAt)
          )
      }
      else if(sort === "asc"){
          setFilteredProducts(prev=>
            [...prev].sort((a,b) => a.price - b.price)
          )

      }
      else{
        setFilteredProducts(prev=>
            [...prev].sort((a,b) => b.price - a.price)
        )

      }

  }, [sort]);
  return (
    <Container>
        {cat ? (filteredProducts.length>0 ? filteredProducts.map((item) => 
            <Product item={item} key = {item._id}/>):<NotAvailable>No Products Available!..Please Refresh the Page.</NotAvailable>)
            : path?products.map((item) => <Product item = {item} key = {item._id}/>):products.slice(0,8).map((item) => <Product item = {item} key = {item._id}/>)
        }

    </Container>
)};

export default Products;
