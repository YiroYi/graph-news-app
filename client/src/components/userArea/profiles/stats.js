import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserStats } from "../../../store/actions";
import { Card, CardGroup, Alert } from "react-bootstrap";

const Stats = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserStats(user.auth._id));
  }, [dispatch, user.auth._id]);

  const displayUserStats = user.stats ? (
    <Fragment>
      <h3>
        <CardGroup>
          <Card border="primary">
            <Card.Body>
              <Card.Title>Categories created by you</Card.Title>
              {user.stats.categories.length === 0
                ? "Sorry you dont have categories"
                : user.stats.categories.map((item, index) => (
                    <Alert key={index} variant="primary">
                      {item.name}
                    </Alert>
                  ))}
            </Card.Body>
          </Card>
          <Card border="info">
            <Card.Title>Categories created by you</Card.Title>
            {user.stats.posts.length === 0
              ? "Sorry you dont have posts"
              : user.stats.posts.map((post, index) => (
                  <Alert key={index} variant="primary">
                    {post.title}
                  </Alert>
                ))}
          </Card>
        </CardGroup>
      </h3>
    </Fragment>
  ) : null;
  
  return <Fragment>{displayUserStats}</Fragment>;
};

export default Stats;
