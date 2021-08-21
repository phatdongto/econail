import React, { Component } from "react";
import { ItemsBoxWrapper } from "./Payment.style";

const ItemsBox = (props) => {
  const { items } = props;
  return (
    <ItemsBoxWrapper>
      {items.map((item) => (
        <div
          key={item.id}
          className="d-flex mb-1"
          style={{
            borderBottom: "0.5px solid rgba(157, 161, 158, 0.9)",
            borderSpacing: "5px",
          }}
        >
          <img style={{ width: "30px", height: "30px" }} src={item.picture} />
          <span style={{ color: "grey", marginLeft: "4px" }}>
            {item.name} x {item.quantity}
          </span>

          <span style={{ marginLeft: "auto", color: "grey" }}>
            {item.price * item.quantity}
          </span>
        </div>
      ))}
    </ItemsBoxWrapper>
  );
};

export default ItemsBox;
