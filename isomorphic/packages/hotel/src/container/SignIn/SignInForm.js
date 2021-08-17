import React, { Component, useContext } from "react";
import { SignInFormWrapper } from "./SignIn.style";
import { Formik } from "formik";
// import * as EmailValidation from "email-validator";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/AuthProvider";

const apiUrl = "http://econail.localhost/api";

const api = axios.create({
  baseUrl: "http://econail.localhost/api",
});

// class SignInForm extends Component {
//   state = {
//     users: [],
//   };

//   // componentWillMount() {
//   //   api.get("http://econail.localhost/api/g/user").then((res) => {
//   //     // this.setState({ users: res.data.data.data });
//   //     this.state.users = [...res.data.data.data];
//   //     // console.log(this.state.users);
//   //   });
//   // }

//   handleLogin = (values) => {
//     api
//       .get(
//         `${apiUrl}/login?username=${values.username}&password=${values.password}`
//       )
//       .then((res) => {
//         console.log(res.data);
//       });
//   };

//   render() {
//     console.log(this.props.users);
//     return (
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         //call api here
//         onSubmit={(values, { setSubmitting }) => {
//           this.handleLogin(values);
//           setTimeout(() => {
//             // console.log("Logging in", values);
//             setSubmitting(false);
//           }, 500);
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().required(),
//           password: Yup.string()
//             .required()
//             .min(4, "password is too short"),
//           //   .matches(),
//         })}
//       >
//         {(props) => {
//           const {
//             values,
//             touched,
//             errors,
//             isSubmitting,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//           } = props;
//           return (
//             <SignInFormWrapper>
//               <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Email</label>
//                 <input
//                   name="username"
//                   placeholder="Username"
//                   type="text"
//                   value={values.username}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={errors.username && touched.username && "error"}
//                 />
//                 {errors.username && touched.username && (
//                   <div className="input-feedback">{errors.username}</div>
//                 )}
//                 <input
//                   name="password"
//                   placeholder="Password"
//                   type="password"
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {errors.password && touched.password && (
//                   <div className="input-feedback">{errors.password}</div>
//                 )}
//                 <button type="submit" disabled={isSubmitting}>
//                   Login
//                 </button>
//               </form>
//             </SignInFormWrapper>
//           );
//         }}
//       </Formik>
//     );
//   }
// }

const handleLogin = (values) => {
  api
    .get(
      `${apiUrl}/login?username=${values.username}&password=${values.password}`
    )
    .then((res) => {
      console.log(res.data);
    });
};

const SignInForm = () => {
  const { signIn, loggedIn } = useContext(AuthContext);
  if (loggedIn) return <Redirect to={{ pathname: "/" }} />;

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      //call api here
      onSubmit={(values, { setSubmitting }) => {
        // handleLogin(values);
        signIn(values);
        setTimeout(() => {
          // console.log("Logging in", values);
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string()
          .required()
          .min(4, "password is too short"),
        //   .matches(),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <SignInFormWrapper>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Email</label>
              <input
                name="username"
                placeholder="Username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.username && touched.username && "error"}
              />
              {errors.username && touched.username && (
                <div className="input-feedback">{errors.username}</div>
              )}
              <input
                name="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </form>
          </SignInFormWrapper>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
