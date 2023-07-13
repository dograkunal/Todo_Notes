import React, { useEffect } from "react";
import { Formik } from "formik";
import SignIn from "../../../../assets/SignIn.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAction } from "./registerSlice";
import * as yup from "yup";
import "../index.scss";

function Register() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.register && state.register.token);
  console.log(token, "Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, token]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "Jon",
          lastName: "Doe",
          email: "xyz@abc.com",
          password: "abc@123",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values, "Register values");
          dispatch(registerAction(values));
          setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          firstName: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Only letters allowed")
            .required("First name cannot be Empty!"),
          lastName: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Only letters allowed")
            .required("Last name cannot be Empty!"),

          email: yup.string().email().required("Email is required"),
          password: yup
            .string()
            .min(6, "Should be 6 Character long")
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
