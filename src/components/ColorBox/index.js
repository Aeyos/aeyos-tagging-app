import React from "react";
import styled from "styled-components";

const Box = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: ${props => props.theme.borderRadius};
  display: inline-block;
  background-color: ${props => props.color};
  overflow: hidden;
  margin: 5px 2.5px;

  &:before {
    transition: border-color ${props => props.theme.transition};
    border-radius: ${props => props.theme.borderRadius};
    box-sizing: border-box;
    content: " ";
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }

  &:hover:before {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export default props => <Box {...props} />;
