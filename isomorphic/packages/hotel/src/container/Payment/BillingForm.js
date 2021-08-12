import React, { Component } from "react";
import InputBox from "./InputBox";

import "bootstrap/dist/css/bootstrap.min.css";

import { BillingFormWrapper } from "./Payment.style";
import { Label } from "@hotel/components/Review/RendarReviewForm.style";
// import { Col } from "antd";
import { Row, Col } from "react-bootstrap";

class BillingForm extends Component {
  state = {};
  render() {
    console.log("reach here");
    return (
      <BillingFormWrapper>
        <h5 className={""}>Billing detail</h5>

        <Row>
          <Col>
            <InputBox label="FirstName" important />
          </Col>
          <Col>
            <InputBox label="LastName" important />
          </Col>
        </Row>

        <Row>
          <Col>
            <InputBox label="E-mail address" important />
          </Col>
          <Col>
            <InputBox label="Phone Number" important />
          </Col>
        </Row>

        <Row>
          <Col>
            <InputBox label="Country" important />
          </Col>
          <Col>
            <InputBox label="City" />
          </Col>
        </Row>

        <InputBox label="Address" important addressNotice />

        <label className="mt-3">
          <input
            name="isGoing"
            type="checkbox"
            className="mr-1"
            // checked={this.state.isGoing}
            // onChange={this.handleInputChange}
          />
          Create account?
        </label>
      </BillingFormWrapper>
    );
  }
}

export default BillingForm;
