import { Divider } from "rc-menu";
import React, { Component } from "react";

import BillingForm from "./BillingForm";
import OrderInfo from "./OrderInfo";

import PaymentWrapper from "./Payment.style";

import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Payment extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          position: "relative",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
        }}
      >
        <PaymentWrapper>
          <BillingForm className="bill" />
          <OrderInfo />
        </PaymentWrapper>
      </div>
    );
  }
}

export default Payment;
