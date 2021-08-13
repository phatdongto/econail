import { Button } from "antd";
import React, { Component } from "react";
import ItemsBox from "./ItemsBox";
import { OrderInfoWrapper } from "./Payment.style";

class OrderInfo extends Component {
  state = {
    items: [
      // prettier-ignore
      {
        id: 1, name: "camera", quantity: 3, price: 40, src: "https://picsum.photos/40/40?random=1"
      },
      // prettier-ignore
      { id: 2, name: "sip", quantity: 2, price: 60, src: "https://picsum.photos/40/40?random=2" },
      // prettier-ignore
      { id: 3, name: "smartphone", quantity: 5, price: 50, src: "https://picsum.photos/40/?random=3"},
      // prettier-ignore
      { id: 4, name: "TV", quantity: 7, price: 90, src: "https://picsum.photos/40/40?random=4" },
    ],
  };

  handleSum = () => {
    let sum = 0;
    this.state.items.map((item) => (sum += item.price));
    console.log(sum);
    return sum;
  };

  render() {
    return (
      <OrderInfoWrapper>
        <div className="d-flex">
          <h5>Your items</h5>
          <h5 className="ml-auto" style={{ marginLeft: "auto" }}>
            Total
          </h5>
        </div>

        <ItemsBox items={this.state.items} />

        <div className="d-flex mt-2">
          <h5>Total</h5>
          <h5 className="ml-auto" style={{ marginLeft: "auto" }}>
            {this.handleSum()}
          </h5>
        </div>

        <Button className="w-100" type="primary">
          Paypal
        </Button>
      </OrderInfoWrapper>
    );
  }
}

export default OrderInfo;