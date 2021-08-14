import React, { Fragment, useReducer, useEffect } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../store/actions";

const Articles = (props) => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, newState }),
    { limit: 3, order: "desc", sortBy: "_id", skip: 0 }
  );

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts(sort, [], user.auth._id));
  }, []);

  return (
    <Fragment>
      <UserAreaHOC>
        <Table striped bordered hover>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tbody>
            {user.posts
              ? user.posts.map((post, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.category.name}</td>
                    <td className={post.status === "DRAFT" ? "yell" : "green"}>
                      {post.status}
                    </td>
                    <td className="remove_btn">Remove</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        <div className="mt-3">
          <Button
            onClick={() => {
              let skip = sort.skip + sort.limit;
              dispatch(
                getUserPosts({ ...sort, skip: skip }, user.posts, user.auth._id)
              ).then(() => {
                setSort({ skip: skip });
              });
            }}
          >
            Load More
          </Button>
          <Button className="ml-2" variant="outline-info" onClick={()=>{
            props.history.push('/user_area/create')
          }}>Create new article</Button>
        </div>
      </UserAreaHOC>
    </Fragment>
  );
};

export default Articles;
