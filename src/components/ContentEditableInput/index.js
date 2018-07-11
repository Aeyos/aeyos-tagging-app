import React from "react";
import styled from 'styled-components';

const Input = styled.span`
  background: transparent;
  border-bottom: 2px solid #333;
  display: inline-block;
  font-size: 0.80em;
  font-weight: 400;
  line-height: 1.5em;
  margin: 0 0.25em;
  min-width: 50px;
  outline: none
  overflow: hidden;
  padding: 0 0.5em;
`;

export default props => (
  <Input
    contentEditable
    {...props}
  />
);
