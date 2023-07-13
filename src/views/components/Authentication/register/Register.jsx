import React from "react";
import { Formik } from "formik";
import SignIn from "../../../../assets/SignIn.jpg";
import { registerAction } from "./registerSlice";
import * as yup from "yup";
import "../index.scss";

function Register() {
  return (
    <>
      <Formik
        initialValues={{
          firstName: "Jon",
          lastName: "Doe",
          email: "xyz@abc.com",
          password: "123456",
        }}
        onSubmit={(values, { isSubmitting }) => {
          dispatch(registerAction(values));
          isSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          firstName: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Only letters allowed")
            .max(25, "Exceeding the word limit")
            .required("Last name required!"),
          lastName: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Only letters allowed")
            .max(25, "Exceeding the word limit")
            .required("Last name required!"),

          email: yup
            .string()
            .email()
            .max(50, "Sorry you exceeding the limit")
            .required("Email is required"),
          password: yup
            .string()
            .min(6, "At least 8 characters")
            .matches(/[!@#$%^&*()-+]+/, "Password required special character")
            .required("Password is required"),
        })}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          setFieldTouched,
          handleSubmit,
        }) => (
          <div className="loginFoundation">
            <img src={SignIn} />
            <div className="formContainer">
              <div>
                <input
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={() => {
                    setFieldTouched("firstName");
                  }}
                />
                {touched.firstName && errors.firstName ? (
                  <p>{errors.firstName}</p>
                ) : null}
              </div>

              <div>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={() => {
                    setFieldTouched("lastName");
                  }}
                />

                {touched.lastName && errors.lastName ? (
                  <p>{errors.lastName}</p>
                ) : null}
              </div>

              <div>
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={() => {
                    setFieldTouched("email");
                  }}
                />

                {touched.email && errors.email ? <p>{errors.email}</p> : null}
              </div>
              <div>
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={() => {
                    setFieldTouched("password");
                  }}
                />
                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Register;
