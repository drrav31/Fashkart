import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../Redux/apiCalls'
import logo from "../FashLogo.png"

const Container = styled.div`
    height: 80px;
    /* background-color:coral; */
    border-bottom: 1px solid #ccc;
    ${mobile({height:"50px"})};
`
const Wrapper = styled.div`
    display: flex;
    padding:20px 15px;
    justify-content:space-between;
    align-items:center;
    ${mobile({padding:"10px 5px"})};
    

`
const Left = styled.div`
    flex: 1;

`
const Logo = styled.a`
text-decoration:none;
`

const Logoimg = styled.img`
    width:250px;
    height:50px;
    ${mobile({width:"100px",height:"40px"})};
`

const Center = styled.div`
flex:2;
${mobile({flex:1})}
`
const SearchContainer = styled.div`
    
    display:flex;
    margin-left: 20px;
    padding:0px;
    align-items:center;
    border-radius:5px;
    border: 2px solid black;

`
const SearchInput = styled.input`
    /* border:2px solid black; */
    width:100%;
    height:30px;
    border:none;
    font-size: 16px;
    outline:none;
    border-radius: 3px;
    ${mobile({width:"50px"})};
    


`
const Right = styled.div`
    display:flex;
    flex:1;
    align-items:center;
    justify-content: flex-end;
    margin-right:20px;
    ${mobile({justifyContent:"center",marginRight:"10px",flex:2})};
    
`
const Login = styled.button`
color:black;
font-size:16px;
padding:0.25em 1em;

border:none;
text-decoration:none;
font-weight:bold;
${mobile({fontSize:"12px"})};
`
const Logout = styled.button`
color:black;
font-size:16px;
padding:0.25em 1em;
border:2px solid peachpuff;
text-decoration:none;
font-weight:bold;
margin-right: 20px;
background-color:palevioletred;
border-radius:5px;
cursor:pointer;
${mobile({fontSize:"12px"})};`

const Signup = styled.button`
color:white;
background-color:palevioletred;
font-size:1em;
padding:7px;
&:hover{
    background-color:palegoldenrod;
    color:black;
}

border-radius:15px;
text-decoration:none;
border:2px solid coral;
${mobile({fontSize:"12px"})};
`
const Greeting = styled.span`
    margin-right: 20px;
    font-size: 1em;
    font-weight: 600;
    ${mobile({fontSize:"12px", marginLeft:"5px", fontWeight:500,marginRight:"5px"})};
`

const Navbar = () => {

    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const quantity = useSelector(state => state.cart.quantity);
    const handleClick = ()=>{
        logout(dispatch)
        navigate('/')
    }
    return (
        <Container>
            <Wrapper>
                <Left><Logo href = "/"><Logoimg src = {logo} alt ="FASHKART"/></Logo></Left>
                <Center><SearchContainer><SearchInput placeholder="Search for Items,Brands or Styles..."/><Search style = {{color:"grey", height:"30px",borderRadius:"3px", cursor:"pointer"}}/></SearchContainer></Center>
                {!user?(<Right><Signup as="a" href="/register">Sign Up</Signup>
                       <Login as="a" href="/login">Login</Login>
                       <Link to = '/cart'>
                       <Badge badgeContent={quantity} color="primary">
                       
                       <ShoppingCartOutlined/>    
                </Badge></Link></Right>)
                :(<Right><Greeting>Hi, {user.username}</Greeting><Logout onClick={handleClick}>Logout</Logout>
                    <Link to = '/cart'>
                    <Badge badgeContent={quantity} color="primary">
                       
                    <ShoppingCartOutlined/></Badge></Link></Right>)}
                
            </Wrapper>
        </Container>
    )
}
export default Navbar;

