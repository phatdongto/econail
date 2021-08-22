import React, { useRef, useEffect, useState } from "react";

const Paypal = (props) => {
  const { products } = props;
  const paypal = useRef();
  console.log("list: ", products);
  const [hasData, setHasData] = useState(false);

  const handlePayment = () => {
    console.log("listE: ", products);
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          let tmp = 0;
          products.forEach((product) => {
            tmp += product.price * product.quantity;
          });
          // console.log("cartitem: ", tmp);
          return actions.order.create({
            intent: "CAPTURE",
            // purchase_units: tmp,
            purchase_units: [
              {
                description: "lecturer Min",
                amount: {
                  currency_code: "USD",
                  value: `${tmp}.0`,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  };

  useEffect(() => {
    if (products.length > 0 && !hasData) {
      setHasData(true);
      handlePayment();
    }
  });

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default Paypal;
