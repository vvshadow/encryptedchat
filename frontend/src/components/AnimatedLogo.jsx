import React from 'react';
import styled from 'styled-components';

const AnimatedLogo = () => {
  return (
    <StyledLogo>
      <h1 className="animated-text">ShieldyTalk</h1>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  .animated-text {
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    background: linear-gradient(90deg, #00E487, #00C176, #00E487);
    background-size: 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientMove 3s infinite ease-in-out, float 6s infinite ease-in-out;
  }

  /* Animation de dégradé fluide */
  @keyframes gradientMove {
    0% {
      background-position: 0%;
    }
    50% {
      background-position: 100%;
    }
    100% {
      background-position: 0%;
    }
  }

  /* Animation de flottement fluide */
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export default AnimatedLogo;
