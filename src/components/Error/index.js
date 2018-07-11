import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/lib/io";

import { ErrorRed } from "../../utils/Colors";
console.log('ERROR RED', ErrorRed);

const Message = styled.div`
  border: 2px solid ${ErrorRed};
  border-radius: 5px;
  position: relative;
`;

const Icon = styled.div`
  background-color: ${ErrorRed};
  color: white;
  height: 100%;
  left: -2px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 40px;

  &:before {
    content: ' ';
    display: inline-block;
    height: 100%;
    margin-right: -1px;
    overflow: hidden;
    vertical-align: middle;
    width: 1px;
  }
`;

const Text = styled.div`
  color: ${ErrorRed};
  font-weight: 600;
  margin-left: 40px;
  padding: 0.5em;
`;

export default props => {
  if (!props.children) return null;
  return (
    <Message>
      <Icon>
        <IoClose />
      </Icon>
      <Text>{props.children}</Text>
    </Message>
  );
};
