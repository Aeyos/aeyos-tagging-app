import React from "react";
import { connect } from "react-redux";
import { create } from "../../redux/Loader/actions";

class Viewer extends React.Component {
  state = {
    alteredValue: null,
    error: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.alteredValue) {
      return {
        alteredValue: null,
        error: null
      };
    }
    return null;
  }

  onChange = evt => {
    this.setState(
      {
        alteredValue: evt.target.value
      },
      () => {
        this.validateJSON();
      }
    );
  };

  validateJSON() {
    try {
      JSON.parse(this.state.alteredValue);
      this.setState({ error: null });
      return true;
    } catch (e) {
      this.setState({ error: e.message });
      return false;
    }
  }

  save = evt => {
    const { props, state } = this;

    if (state.error) return;

    this.props.update(props.user, props.pass, JSON.parse(state.alteredValue));
  };

  render() {
    const { props, state } = this;

    return (
      <div>
        <h1>- Viewer -</h1>
        <textarea
          onChange={this.onChange}
          value={
            state.alteredValue === null
              ? JSON.stringify(props.data)
              : state.alteredValue
          }
        />
        <div style={{ color: "red" }}>{state.error}</div>
        {state.alteredValue}
        {state.alteredValue && (
          <button type="button" onClick={this.save}>
            Save
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.loader.loadedData,
  user: state.user.username,
  pass: state.user.password
});

const mapDisptachToProps = dispatch => ({
  update: (...args) => dispatch(create(...args))
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
