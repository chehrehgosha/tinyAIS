import React, { useState, createRef } from "react";
import { login } from "../actions/login";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ login, loggedIn }) => {
  let emailRef = createRef();
  let passwordRef = createRef();

  if (loggedIn) return <Redirect to="/profile" />;

  const onSubmit = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    login(email, password);
  };
  return (
    <div style={{ padding: "10% 20%" }}>
      {/* <form> */}
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={emailRef}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      {/* </form> */}
    </div>
  );
};
Landing.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, {
  login,
})(Landing);
