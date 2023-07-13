import React, { useEffect } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginAction } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../../../../assets/SignIn.jpg";
import "../index.scss";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state && state.Login.token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, token]);
  return (
    <>
      <Formik
        initialValues={{ email: "xyz@abc.com", password: "123@abc" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values, "login jsx");
          dispatch(loginAction(values));
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="loginFoundation">
            <img src={SignIn} />
            {/* <div className="TestClass"> */}
            <form onSubmit={handleSubmit}>
              <div className="formContainer">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                />
                {errors.email && touched.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                {errors.password && touched.password}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </form>
            {/* </div> */}
          </div>
        )}
      </Formik>
      ;
    </>
  );
}

export default Login;
