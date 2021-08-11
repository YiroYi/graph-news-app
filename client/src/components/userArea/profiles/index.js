import React, { Fragment } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";
import EmailPass from "./emailPass";
import Stats from "./stats";

const Profile = props => {
  return (
    <Fragment>
      <UserAreaHOC>
        <EmailPass {...props} />
        <Stats {...props}></Stats>
      </UserAreaHOC>
    </Fragment>
  ); 
};

export default Profile;
