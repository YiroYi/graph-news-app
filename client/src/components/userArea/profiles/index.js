import React, { Fragment } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";

const Profile = () => {
  return (
    <Fragment>
      <UserAreaHOC>
        <div className="mt-3">
          Welcome to your profile
        </div>
      </UserAreaHOC>
    </Fragment>
  );
};

export default Profile;
