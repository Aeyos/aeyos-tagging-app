import styled from 'styled-components';

export const Column = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.inverseMainColor};
  font-size: ${props => props.theme.sideMenuIconSize};
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.theme.sideMenuWidth};
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
`;
