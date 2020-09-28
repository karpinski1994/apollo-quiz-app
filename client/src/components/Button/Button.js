import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: ${props => props.color ? props.color : "palevioletred"};
  padding: 10px;
  line-height: 2;
  border-radius: 5px;
  font-weight: bold;
  border: 4px solid white;
  font-size: inherit;
  cursor: pointer;
`;

const Button = ({ children, onClick, color }) => (
  <ButtonWrapper color={color} onClick={onClick}>{children}</ButtonWrapper>
);

export default Button;
