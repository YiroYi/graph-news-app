import React, { Fragment, useState, useEffect } from "react";
import UserAreaHOC from "../../hoc/userAreaHoc";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Form, Button, Alert } from "react-bootstrap";
import ToastHandler from "../../utils/toasts";

import { getCategories } from "../../../api";
import { useDispatch } from "react-redux";

import { createPost, clearCreatePost } from "../../../store/actions";

const Create = () => {
  const [categories, setCategories] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      const response = await getCategories();
      console.log(response);
      setCategories(response.data.categories);
    };

    func();
  }, [setCategories]);

  useEffect(() => {
    dispatch(clearCreatePost())
  },[dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      excerpt: "",
      content: "",
      status: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field is required"),
      excerpt: Yup.string().required("This field is required"),
      content: Yup.string().required("This field is required"),
      status: Yup.string()
        .required("This field is required")
        .matches(/(DRAFT|PUBLIC)/, {
          message: "It should be DRAFT or PUBLIC",
          excludeEmptyString: true,
        }),
      category: Yup.string().required("This field is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createPost(values))
        .then(({ payload }) => {
          if (payload.createdPost.post) {
            ToastHandler("Done", "SUCCESS");
            resetForm();
          }

          if (payload.createdPost.error) {
            ToastHandler(payload.createdPost.errors, "ERROR");
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Fragment>
      <UserAreaHOC>
        <div className="mt-3">Create a new post!</div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <Alert variant="danger">{formik.errors.title}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Excerpt</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter the excerpt"
              id="excerpt"
              name="excerpt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.excerpt}
            />
            {formik.touched.excerpt && formik.errors.excerpt ? (
              <Alert variant="danger">{formik.errors.excerpt}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter the content"
              id="content"
              name="content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
            />
            {formik.touched.content && formik.errors.content ? (
              <Alert variant="danger">{formik.errors.content}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option></option>
              {categories
                ? categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : null}
            </Form.Control>
            {formik.touched.category && formik.errors.category ? (
              <Alert variant="danger">{formik.errors.category}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option></option>
              <option values="DRAFT">DRAFT</option>
              <option values="PUBLIC">PUBLIC</option>
            </Form.Control>
            {formik.touched.status && formik.errors.status ? (
              <Alert variant="danger">{formik.errors.status}</Alert>
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit">
            Add post
          </Button>
        </Form>
      </UserAreaHOC>
    </Fragment>
  );
};

export default Create;
