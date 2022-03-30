import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Twitter,
  } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import logo from "../FashLogoFooter.png";
import { useSelector } from "react-redux";

  
  const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
    background-color: thistle;
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.a`

    text-decoration:none;
    padding-bottom: 10px;
    ${mobile({})}
 `
  const Logoimg = styled.img`
    width:250px;
    height:50px;
    ${mobile({width:"200px", height:"50px"})};
  `
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    /* ${mobile({width:"20px", height:"20px"})} */
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    /* ${mobile({ display: "none" })} */
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    /* ${mobile({ backgroundColor: "#fff8f8" })} */
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;

  const Link = styled.a`
    text-decoration: none;
    color: orangered;
  `
  
  const Footer = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
      <Container>
        <Left>
          <Logo href="#"><Logoimg src = {logo} alt = "FASHKART"/></Logo>
          
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem><Link href="/">Home</Link></ListItem>
            <ListItem>{user?<Link href="/cart">Cart</Link>:<Link href="/">Cart</Link>}</ListItem>
            <ListItem><Link href="/products/men">Men's Fashion</Link></ListItem>
            <ListItem><Link href="/products/women">Women's Fashion</Link></ListItem>
            <ListItem><Link href="/">Accessories</Link></ListItem>
            <ListItem><Link href="/">My Account</Link></ListItem>
            <ListItem><Link href="/">Order Tracking</Link></ListItem>
            <ListItem><Link href="/">Wishlist</Link></ListItem>
            <ListItem><Link href="/">Terms</Link></ListItem>
            <ListItem><Link href="/">Privacy Policy</Link></ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> support@fashkart.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;