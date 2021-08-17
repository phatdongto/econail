import { Button, Col, Row } from "antd";
import React, { Component } from "react";
// import { useEffect } from "react";
// import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInForm from "./SignInForm";
import SignInWrapper from "./SignIn.style";

// import { useForms } from "react-hook-form";

class SignIn extends Component {
  state = {};
  render() {
    return (
      <SignInWrapper>
        <Row className=" h-100">
          <Col xs={10} className="h-100">
            <div style={{ marginTop: "30%" }}>
              <SignInForm />
            </div>
          </Col>
          <Col className="bg-secondary"></Col>
        </Row>
      </SignInWrapper>
    );
  }
}

export default SignIn;
