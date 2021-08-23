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
                description: `order_id: ${
                  JSON.parse(localStorage.getItem("current_order_info")).id
                }`,
                amount: {
                  currency_code: "USD",
                  value: `${tmp}.00`,
                  breakdown: {
                    item_total: { value: `${tmp}.00`, currency_code: "USD" },
                  },
                },
                items: products.map((product) => {
                  return {
                    name: product.name,
                    unit_amount: {
                      value: product.price,
                      currency_code: "USD",
                    },
                    quantity: product.quantity,
                  };
                }),
                // items: [
                //   {
                //     name: "Hafer",
                //     unit_amount: { value: "3", currency_code: "USD" },
                //     quantity: "1",
                //     sku: "haf001",
                //   },
                // ],
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          localStorage.setItem("Paypal_res", JSON.stringify(order));
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
