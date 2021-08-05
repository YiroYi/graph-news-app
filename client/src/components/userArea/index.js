import React, { Fragment } from "react";
import UserAreaHOC from "../hoc/userAreaHoc";

const UserArea = () => {
  return (
    <Fragment>
      <UserAreaHOC>
        <div className="mt-3">
          Welcome to your user area
        </div>
      </UserAreaHOC>
    </Fragment>
  );
};

export default UserArea;
