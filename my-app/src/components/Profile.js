import React, { useState, createRef, Fragment } from "react";
import { upload } from "../actions/file";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Profile = ({ upload, loggedIn, file }) => {
  const formData = new FormData();
  if (!loggedIn) return <Redirect to="/" />;

  const onSubmit = () => {
    upload(formData);
  };
  return (
    <div style={{ padding: "10% 20%" }}>
      <div class="form-group">
        <label for="exampleFormControlFile1">Example file input</label>
        <input
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
          onChange={async (e) => {
            formData.append("file", e.target.files[0], e.target.files[0].name);
          }}
        />
      </div>
      {file === "ready" && (
        <Fragment>
          <img src={"/output.png"}></img>
          <a href={"/output.csv"} download>Click here to access to the CSV output</a>
        </Fragment>
      )}
      <button className="btn btn-primary" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};
Profile.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  file: state.auth.file,
});

export default connect(mapStateToProps, {
  upload,
})(Profile);
