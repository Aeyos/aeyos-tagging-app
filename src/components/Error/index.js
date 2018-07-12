import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/lib/io";

const Message = styled.div`
  border: 2px solid ${props => props.theme.errorColor};
  border-radius: ${props => props.theme.borderRadius};
  position: relative;
`;

const Icon = styled.div`
  background-color: ${props => props.theme.errorColor};
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
  color: ${props => props.theme.errorColor};
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
