import { Button, Col, Row } from "antd";
import React, { Component } from "react";
// import { useEffect } from "react";
// import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInForm from "./SignInForm";
import SignInWrapper from "./SignIn.style";
import DemoLogo from "@hotel/assets/images/logo_transparent.png";
import Logo from "@iso/ui/Logo/Logo";

// import { useForms } from "react-hook-form";

class SignIn extends Component {
  state = {};
  render() {
    return (
      <SignInWrapper>
        <Row className=" h-100">
          <Col xs={10} className="h-100">
            <div className="logo">
              <Logo withLink linkTo="/" src={DemoLogo} title="Hotel Logo" />
            </div>
            <div style={{ marginTop: "10%" }}>
              <SignInForm />
            </div>
          </Col>
          <Col xs={14} className="bg-secondary h-100"></Col>
        </Row>
      </SignInWrapper>
    );
  }
}

export default SignIn;
