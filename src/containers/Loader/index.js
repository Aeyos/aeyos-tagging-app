import React from "react";
import { connect } from "react-redux";

import { load, create } from "../../redux/Loader/actions";

class Loader extends React.Component {
  state = {
    user: "",
    pass: ""
  };

  create = () => {
    const { props, state } = this;
    props.create(state.user, state.pass);
  };

  load = () => {
    const { props, state } = this;
    props.load(state.user, state.pass);
  };

  inputChange = ({ target: el }) => {
    const name = el.getAttribute("name");
    this.setState({ [name]: el.value });
  };

  render() {
    const { props } = this;

    return (
      <div>
        <h1>
          - Loader -
        </h1>

        <input
          disabled={props.loading}
          name="user"
          onChange={this.inputChange}
        />
        <br />
        <input
          disabled={props.loading}
          name="pass"
          type="password"
          onChange={this.inputChange}
        />
        <br />
        <br />
        <button disabled={props.loading} onClick={this.create}>
          Create
        </button>
        <button disabled={props.loading} onClick={this.load}>
          Load
        </button>
        <br />
        <br />
        {JSON.stringify(this.state)}
        <div>{props.loading && "Loading..."}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loader.isLoading
});

const mapDisptachToProps = dispatch => ({
  create: (user, pass) => dispatch(create(user, pass, {})),
  load: (user, pass) => dispatch(load(user, pass))
});

export default connect(mapStateToProps, mapDisptachToProps)(Loader);
