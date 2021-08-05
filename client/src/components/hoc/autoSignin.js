import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoSignIn } from "../../store/actions";

const AutoSign = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(autoSignIn()).then(() => {
      setLoading(false);
    });
  },[]);

  if (loading) {
    return (
      <div className="main_loader">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    );
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
};

export default AutoSign;
