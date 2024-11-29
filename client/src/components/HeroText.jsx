import React from 'react';
import styled from 'styled-components';

const HeroText = () => {
  return (
    <TextWrapper>
      <h1 className="title">GrowByte</h1>
      <p className="subtitle">Smart Plant Monitoring Made Simple</p>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: #F7F4E9;

  .title {
    font-size: 3rem;
    font-weight: bold;
    color: #4A6041;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #D2B48C;
  }
`;

export default HeroText;
