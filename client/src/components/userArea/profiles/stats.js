import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getUserStats } from '../../../store/actions';

const Stats = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Im going to run user stats");
    dispatch(getUserStats(user.auth._id))
  },[dispatch, user]);

  return <p> Stats </p>
}

export default Stats;
