import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert } from "react-bootstrap";
import ToastHandler from '../../utils/toasts';
import { useDispatch, useSelector } from 'react-redux';


const EmailPass = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.auth.email,
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email"),
      password: Yup.string()
        .min(5, "Min length should be 5")
    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  return(
    <div className="mt-3"></div>
  );
}

export default EmailPass;
