import React from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";

const Icon = styled.div`
  transition: color ${props => props.theme.transition};
  margin-bottom: 15px;

  ${props => props.active ? '&,' : ''}
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.highlight};
  }

  & a {
    color: inherit;
  }
`;

export default props => (
  <Route
    {...props}
    component={null}
    children={args => (
      <Icon active={args.match}>
        <Link to={props.path}>
          <props.icon />
        </Link>
      </Icon>
    )}
  />
);
