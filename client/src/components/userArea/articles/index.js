import React, { Fragment } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";

const Articles = () => {
  return (
    <Fragment>
      <UserAreaHOC>
        <div className="mt-3">
          Welcome to your articles
        </div>
      </UserAreaHOC>
    </Fragment>
  );
};

export default Articles;
