import React, { useContext } from "react";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import RenderSignUpForm from "@hotel/components/SignUp/RenderSignUpForm";
import { AuthContext } from "../../context/AuthProvider";
import MyRenderSignUpForm from "./MyRenderSignUpForm";
import { MyFormWrapper } from "./SignUp.style";

const initialValues = {
  // email: "",
  username: "",
  // phoneNumber: "",
  password: "",
  confirmPassword: "",
  // termsAndConditions: false,
  // rememberMe: false,
};

const formStyle = {
  border: "1px solid gray",
  marginTop: "10px",
  height: "6vh",
  borderRadius: "3px",
};

const loginButtonStyle = {
  height: "6vh",
  borderRadius: "3px",
  backgroundColor: "#0C8A8F",
  textColor: "white",
  marginTop: "14px",
};

const getRegisterValidationSchema = () => {
  return Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Username is Required!"),
    // email: Yup.string()
    //   .email("Invalid email")
    //   .required("Email is Required!"),
    password: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .max(20, "Too Long!")
      .required("Password is required!"),
    // phoneNumber: Yup.string()
    //   .min(10, "Too short!")
    //   .max(11, "Too long!")
    //   .required("Phone number is require!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords are not the same!")
      .required("Password confirmation is required"),
    // termsAndConditions: Yup.bool()
    //   .test(
    //     "consent",
    //     "You have to agree with our Terms and Conditions!",
    //     (value) => value === true
    //   )
    //   .required("You have to agree with our Terms and Conditions!"),
  });
};

export default () => {
  const { signUp, loggedIn } = useContext(AuthContext);
  if (loggedIn) return <Redirect to={{ pathname: "/" }} />;
  const handleSubmit = (values, { setSubmitting }) => {
    signUp(values);
    // console.log(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={getRegisterValidationSchema}
      render={MyRenderSignUpForm}
    />
  );
};
