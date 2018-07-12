import React from "react";
import styled from "styled-components";

const Box = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  display: inline-block;
  background-color: ${props => props.color};
  overflow: hidden;
  margin: 5px 2.5px;

  &:before {
    transition: border-color 0.2s ease;
    border-radius: 5px;
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
