import React from "react";

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Drawer,
  Descriptions,
  Modal,
  Radio,
  Form,
  Input,
  Button,
  Popconfirm,
} from "antd";
import services_1 from "../../services";
import axios from "axios";
import { API_URL } from "../../../../config/url/url";
const {TextArea} =Input;
const DrawerProduct = (props) => {
  const id_string = props.service.id;
  const id_category = props.service.products_categories_id;
  const update_url=`${API_URL}/admin/product/${id_string}`;
  const [url,setUrl] = useState(update_url);
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const [editing, setEditing] = useState(false);
  const edit = () => {
    setEditing(!editing);
  };

  const USER_TOKEN = localStorage.getItem("token");
  const AuthStr = "Bearer ".concat(USER_TOKEN);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [price_discount, setPriceDiscount] = useState();
  const [description, setDescription] = useState();
  const [picture, setPicture] = useState();
  const [stock, setStock] = useState();

  const [amount, setAmount] = useState();

  const [unit, setUnit] = useState();

  function getCategory(id_category) {
    axios
      .get(
        `${API_URL}/admin/product_category/${id_category}`,
        {
          headers: {
            Authorization: AuthStr,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        const category = response.data.data;
        setCategory(category);
      });
  }
  function getOneProduct(id_number) {
    //const id =  id_number.toString();
    axios
      .get(`${API_URL}/admin/product/${id_number}`, {
        headers: {
          Authorization: AuthStr,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const product = response.data.data;
        setData(product);
      });
  }
  useEffect(() => {
    const fetchData = () => {
      const b = getCategory(id_category);
      const a = getOneProduct(id_string);
    };
    fetchData();
  }, [id_string,url]);
  
  async function UpdateProduct(id_number) {
    return axios.post(`${API_URL}/admin/product/${id_number}/update`,
    {
        "name" : name,
        "price" : parseInt(`${price}`),  
        "price_discount" : parseInt(`${price_discount}`),
        "description" : `${description}`, 
        "stock" :stock, 
        "amount" : amount,
        "unit" : unit,
        "products_categories_id" :1
    },
        {
          headers: {
            Authorization: AuthStr,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => res.data.status);
  }
  const handleUpdate = async () => {
    const statusUpdate = await UpdateProduct(props.service.id);

    if (statusUpdate == true) {
       setUrl(update_url);
       const a = await getOneProduct(id_string);
      setEditing(!editing);
    }
  };
  return (
    <>
      {editing == false ? (
        <>
          <Button
            type="primary"
            onClick={edit}
            className="mateAddInvoiceBtn"
            style={{ marginBottom: "20px" }}
          >
            Ch???nh s???a
          </Button>
          <img
            width="100px"
            height="100px"
            src="https://source.unsplash.com/random"
            style={{
              marginBottom: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          ></img>
          <Descriptions title="" layout="vertical" bordered>
            <Descriptions.Item label="T??n s???n ph???m" span={12}>
              {data.name}
            </Descriptions.Item>
            <Descriptions.Item label="Lo???i" span={1}>
              {category.name}
            </Descriptions.Item>
            <Descriptions.Item label="Gi??" span={1}>
              {data.price}
            </Descriptions.Item>
            <Descriptions.Item label="Gi?? ??u ????i" span={1}>
              {data.price_discount}
            </Descriptions.Item>
            <Descriptions.Item label="Stock" span={1}>
              {data.stock}
            </Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng" span={1}>
              {data.amount}
            </Descriptions.Item>
            <Descriptions.Item label="????n v???" span={1}>
              {data.unit}
            </Descriptions.Item>

            <Descriptions.Item label="M?? t???">
              {data.description}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <>
          <Button
            type="primary"
            onClick={handleUpdate}
            className="mateAddInvoiceBtn"
            style={{ marginBottom: "20px", marginRight: "20px" }}
          >
            L??u
          </Button>
          <Button
            onClick={edit}
            className="mateAddInvoiceBtn"
            style={{ marginBottom: "20px" }}
          >
            H???y
          </Button>
          <img
            width="100px"
            height="100px"
            src="https://source.unsplash.com/random"
            style={{
              marginBottom: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          ></img>
          <Descriptions title="" layout="vertical" bordered>
            <Descriptions.Item label="T??n s???n ph???m" span={12}>
              <Input
                defaultValue={data.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Lo???i" span={1}>
              <Input defaultValue={category.name} />
            </Descriptions.Item>
            <Descriptions.Item label="Gi??" span={1}>
              <Input
                defaultValue={data.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Gi?? ??u ????i" span={1}>
              <Input
                defaultValue={data.price_discount}
                onChange={(e) => setPriceDiscount(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Stock" span={1}>
              <Input
                defaultValue={data.stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng" span={1}>
              <Input
                defaultValue={data.amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label="????n v???" span={1}>
              
              <Input
                defaultValue={data.unit}
                onChange={(e) => setUnit(e.target.value)}
              />    
            </Descriptions.Item>

            <Descriptions.Item label="M?? t???">
              <Input
                defaultValue={data.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </>
  );
};
export default DrawerProduct;
