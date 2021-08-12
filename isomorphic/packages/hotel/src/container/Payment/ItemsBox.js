import React, { Component } from "react";
import { ItemsBoxWrapper } from "./Payment.style";

const ItemsBox = (props) => {
  return (
    <ItemsBoxWrapper>
      {props.items.map((item) => (
        <div
          key={item.id}
          className="d-flex mb-1"
          style={{
            borderBottom: "0.5px solid rgba(157, 161, 158, 0.9)",
            borderSpacing: "5px",
          }}
        >
          <img src={item.src} />
          <span style={{ color: "grey", marginLeft: "4px" }}>
            {item.name} x {item.quantity}
          </span>
          y
          <span style={{ marginLeft: "auto", color: "grey" }}>
            {item.price}
          </span>
        </div>
      ))}
    </ItemsBoxWrapper>
  );
};

export default ItemsBox;
