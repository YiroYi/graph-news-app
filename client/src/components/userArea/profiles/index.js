import React, { Fragment } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";
import EmailPass from "./emailPass";

const Profile = props => {
  return (
    <Fragment>
      <UserAreaHOC>
        <EmailPass {...props} />
      </UserAreaHOC>
    </Fragment>
  ); 
};

export default Profile;
