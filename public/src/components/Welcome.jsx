import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/welcome.png";
export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={Robot} alt="Robo" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Start Messaging </h3>
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img{
  height: 20rem;
}
span{
  color: #4e00FF;  
}
`;
