import { Divider } from "rc-menu";
import React, { Component, useState } from "react";

import BillingForm from "./BillingForm";
import OrderInfo from "./OrderInfo";

import PaymentWrapper from "./Payment.style";

import axios from "axios";

import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = () => {
  const [checkoutData, setCheckoutData] = useState({});

  const [products, setProducts] = React.useState([]);
  const apiUrl = "http://econail.localhost/api";

  const getItem = async () => {
    let itemsInCart = JSON.parse(localStorage.getItem("items_in_cart"));
    let cart = Promise.all(
      await itemsInCart.map(async (item) => {
        let test = await axios.get(`${apiUrl}/g/product/${item.id}`);
        test = test.data.data;
        test.quantity = item.amount;
        // console.log("testtt", test);
        return test;
      })
    );
    return cart;
  };

  React.useEffect(() => {
    const hi = async () => {
      let cart = await getItem();
      setProducts(cart);
    };
    hi();
  }, []);

  React.useEffect(() => {
    return setProducts([]);
  }, []);

  const updateInput = (event, lable) => {
    let tmpData = { ...checkoutData };
    tmpData[lable] = event.target.value;
    setCheckoutData(tmpData);
  };

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
      {/* {console.log(products)} */}
      <PaymentWrapper>
        <BillingForm
          className="bill"
          onInput={updateInput}
          checkoutData={checkoutData}
        />
        <OrderInfo products={products} />
      </PaymentWrapper>
    </div>
  );
};

export default Payment;
