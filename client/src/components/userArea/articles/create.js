import React, { Fragment } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";

const Create = () => {
  return (
    <Fragment>
      <UserAreaHOC>
        <div className="mt-3">
          Create a new post! 
        </div>
      </UserAreaHOC>
    </Fragment>
  );
};

export default Create;
