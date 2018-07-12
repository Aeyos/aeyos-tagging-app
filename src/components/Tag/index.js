import React from "react";
import styled from "styled-components";

const Tag = styled.div`
  background: transparent;
  border-radius: ${props => props.theme.borderRadius};
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  display: inline-block;
  font-size: 0.8em;
  font-weight: 400;
  line-height: 1.5em;
  margin: 0 0.25em;
  margin: 0.25em;
  overflow: hidden;
  padding: 0 0.5em;
  transition: background ${props => props.transition}, color ${props => props.transition};

  ${props => (props.hover ? "&" : "&:hover")} {
    background-color: ${props => props.color};
    color: white;
    cursor: pointer;
  }
`;

const Prefix = Tag.extend`
  background: ${props => props.color};
  color: white;
  margin-right: -0.5em;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
  padding-right: 0.7em;
`;

export default props => {
  return (
    <div style={{ display: "inline-block" }}>
      {props.prefix && <Prefix color={props.color}>{props.prefix}</Prefix>}
      <Tag {...props} color={props.color}>
        {props.name}
      </Tag>
    </div>
  );
};
