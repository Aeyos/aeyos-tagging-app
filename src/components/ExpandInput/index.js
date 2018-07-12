import React from "react";

import { Border, Container, Input, Measure, Prefix } from "./style";

export default class ExpandInput extends React.Component {
  state = { width: 0 };

  componentDidMount() {
    this.setState({ width: this.measure.clientWidth });
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (prevProps.value !== props.value) {
      this.setState({ width: this.measure.clientWidth });
    }
  }

  render() {
    const { props, state } = this;

    return (
      <Container size={props.size}>
        <Prefix>
          {props.icon}
        </Prefix>
        <div>
          <Input value={props.value} width={state.width} {...props} />
          <Border width={state.width} />
        </div>
        <Measure
          innerRef={e => {
            this.measure = e;
          }}
        >
          {props.value}M
        </Measure>
      </Container>
    );
  }
}

ExpandInput.defaultProps = {
  value: ""
};
