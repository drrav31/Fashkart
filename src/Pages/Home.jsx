import React from 'react'
import styled from 'styled-components'
import Announcements from '../Components/Announcements'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import Slider from '../Components/Slider'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    `

const Heading = styled.h2`
    text-align: center;
    margin-top: 35px;
`
const All = styled.a`
    font-size: 20px;
    color:chocolate;
    margin-bottom: 25px;
    font-weight: 600;
    &:hover{
        color:cornflowerblue;
    }
`

const Home = () => {
    return (
        <div>
            <Announcements/>
            <Navbar />
            <Slider/>
            <Categories/>
            <Heading>Popular Products </Heading> 
            <Products/>
            <Container><All href = "/products">See all products</All></Container>
            <Footer/>
        </div>
    )
}

export default Home
