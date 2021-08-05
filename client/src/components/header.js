import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../store/actions'

const Header = (props) => {
  const { history } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  }

  return (
    <Fragment>
      <Navbar className="bg-custom" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Graph News</Navbar.Brand>
        </LinkContainer>
      </Navbar>
      <Navbar className="bg-custom-small" variant="dark">
        <Nav>
          {user.auth ? (
            <Fragment>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

              <LinkContainer to="/user_are">
                <Nav.Link>User</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <LinkContainer to="/sign_in">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  );
};

export default withRouter(Header);
