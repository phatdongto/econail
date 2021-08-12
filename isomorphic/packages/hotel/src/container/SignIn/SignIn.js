import { Button } from "antd";
import React, { Component } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="user" type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="user" type="password" />
        </Form.Group>
      </Form>
      <Button>Login</Button>
    </div>
  );
};

export default SignIn;
