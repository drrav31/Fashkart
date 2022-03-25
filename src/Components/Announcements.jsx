import styled from "styled-components"

const Container = styled.div`
height:30px;
background-color:thistle;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size: 14px;
`

const Announcements = () => {
    return (
        <Container>Super Deal!! Free shipping on orders above ₹1000</Container> 

    )
}

export default Announcements
