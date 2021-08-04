import React, { useState, useEffect, Fragment } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { signupUser, loginUser } from '../../../store/actions';
import { propTypes } from 'react-bootstrap/esm/Image';
import axios from 'axios';
import ToastHandler from '../../utils/toasts';

const UserAccess = props => {
  const dispatch = useDispatch();
  const [type, setType] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Is required"),
      password: Yup.string()
        .min(5, "Min length should be 5")
        .required("Is required"),
    }),
    onSubmit: values => {
      onSubmitHandler(values);
    },
  });

  const onSubmitHandler = (values) => {
    if (type) {      
      dispatch(loginUser(values))
      .then(({payload}) => {
        successHandler(payload);
      })
      .catch(err => {console.log(err)});
    } else {
      dispatch(signupUser(values))
      .then(({payload}) => {
        successHandler(payload);
      })
      .catch(err => {console.log(err)});
    }
  };

  const successHandler = (payload) => {
    const errors = payload.errors;
    const auth = payload.auth;
    
    if (errors) {
      ToastHandler(errors, 'ERROR')
    }
    if (auth) {
      localStorage.setItem('X-AUTH', auth.token);
      axios.defaults.headers.common["Authorization"] =
    "Bearer " + auth.token;
      ToastHandler('Welcome back', 'SUCCESS')
      props.history.push('/user_area');
    }
  }

  const displayButton = type ? (
    <Button variant="primary" type="submit">
      Sign in
    </Button>
  ) : (
    <Button variant="primary" type="submit">
      Register
    </Button>
  );

  const switchTypeHandler = () => {
    setType((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-4">
          <Col>
            <h1>Sign In / Register</h1>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          { formik.touched.email && formik.errors.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          { formik.touched.password && formik.errors.password ? (
                      <Alert variant="danger">{formik.errors.password}</Alert>
                    ) : null}
        </Form.Group>
        {displayButton}
        <Button
          variant="secondary"
          className="ml-2"
          onClick={switchTypeHandler}
        >
          Already {type ? "Signed in" : "Registered"} ? click here
        </Button>
      </Form>
    </Fragment>
  );
};

export default UserAccess;
