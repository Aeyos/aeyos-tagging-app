import styled from 'styled-components';

import { range } from '../../utils/Math';

const calcColor = props => {
  const percent = Math.round(range(props.width / 600, 0, 1) * 100);

  // const gradient = 120 - (120 * percent);
  return `hsl(0, ${range(percent, 20, 65)}%, ${range(percent, 20, 60)}%)`;
}

export const Container = styled.div`
  position: relative;
  font-size: ${props => props.size};
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  box-sizing: border-box;
  font-size: inherit;
  min-width: 1.6em;
  max-width: 100%;
  outline: none
  padding-left: 0.8em;
  width: ${props => props.width}px;
`;

export const Border = styled.div`
  border-bottom: 2px solid ${calcColor};
  padding-left: 0.8em;
  transition: width 0.2s ease;
  width: ${props => props.width}px;
`

export const Measure = styled.div`
  display: inline-block;
  font-size: inherit;
  left: 0;
  opacity: 0;
  position: absolute;
  whiteSpace: pre;
  z-index: -1;
`;