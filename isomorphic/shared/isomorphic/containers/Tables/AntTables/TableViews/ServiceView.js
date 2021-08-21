import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import TableWrapper from "../../AntTables/AntTables.styles";
import { FilterDropdown } from "@iso/components/Tables/HelperCells";

import { Icon } from "antd";
import DrawerService from "../DrawerService/DrawerService";
import { FormWrapper, ViewWrapper } from "../../AntTables/AntTables.styles";
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

import AddServiceView from "./ModalView/AddServiceView";

import axios from "axios";
const { TextArea } = Input;
export default function() {
  let history = useHistory();

  const USER_TOKEN = localStorage.getItem("token");
  const AuthStr = "Bearer ".concat(USER_TOKEN);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [price_discount, setPriceDiscount] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [picture, setPicture] = useState();
  const [timeEstimate, setTimeEstimate] = useState();
  const [book_online, setBookOnline] = React.useState(true);
  const [value, setValue] = React.useState(1);
  const [data, setData] = useState([]);
  const service =[];
  async function DeleleService(serviceID) {
    return axios
      .get(`http://econail.localhost/api/admin/service/${serviceID}/delete`, {
        headers: {
          Authorization: AuthStr,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => res.data.status);
  }
  async function AddService() {
    return axios
      .post(
        "http://econail.localhost/api/admin/service",
        {
          name: name,
          price: parseInt(`${price}`),
          price_discount: parseInt(`${price_discount}`),
          description: `${description}`,
          stock: parseInt(`${stock}`),
          picture: null,
          time_estimate: parseInt(`${timeEstimate}`),
          can_book_online: book_online,
          sex_type: value,
          services_categories_id: 1,
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
  
  
  function getService() {
    axios.get("http://econail.localhost/api/admin/service", {
        headers: {
          Authorization: AuthStr,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const total_pages = response.data.data.meta["last_page"];
        console.log(total_pages);
        let page = 1;
        while(page <= total_pages){
          axios.get(`http://econail.localhost/api/admin/service?page=${page}`, {
              headers: {
                Authorization: AuthStr,
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Origin": "*",
              },
            })
            .then((res) => {
               
                setData(old => [...old, ...res.data.data.data]);
            }
          );
          page++;
        }
        
      });
  }
  useEffect(() => {
     getService();
  }, []);
  const [state, setState] = React.useState({
    dataList: services_1.data.data,
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    service: {},
    service_id: null,
    service_name: null,
  });

  function onSearch() {
    let { searchText } = state;
    searchText = searchText.toUpperCase();
    const dataList = services_1.data.data.filter((data) =>
      data["name"].toUpperCase().includes(searchText)
    );
    setState({
      dataList,
      filterDropdownVisible: false,
      searchText: "",
      filtered: false,
    });
  }
  function onInputChange(event) {
    setState({ ...state, searchText: event.target.value });
  }
  let { searchText } = state;

  const filterDropdown = (
    <FilterDropdown
      searchText={searchText}
      onInputChange={onInputChange}
      onSearch={onSearch}
    />
  );

  const [visibleInfo, setVisibleInfo] = React.useState(false);
  const showDrawerInfo = () => {
    setVisibleInfo(true);
  };
  const handleCancelDrwerInfo = () => {
    setVisibleInfo(false);
  };
  const [visibleDeleteModal, setVisibleDeleteModal] = React.useState(false);
  const showModalDelete = () => {
    setVisibleDeleteModal(true);
  };

  const handleOkDeleteModal = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    const statusDelete = await DeleleService(state.service_id);
    if (statusDelete == true) {
      setTimeout(() => {
        setVisibleDeleteModal(false);
        setConfirmLoading(false);
        getService();
      }, 2000);
    }
  };

  const handleCancelDeleteModal = () => {
    console.log("Clicked cancel button");
    setVisibleDeleteModal(false);
  };
  //
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handleDeleteService = () => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      width: "12%",
      filterDropdown,
      filterIcon: (
        <Icon
          type="search"
          style={{ color: state.filtered ? "#108ee9" : "#aaa" }}
        />
      ),
      filterDropdownVisible: state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        setState({ ...state, filterDropdownVisible: visible });
        document.getElementById("tableFilterInput").focus();
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Giá ưu đãi",
      dataIndex: "price_discount",
      key: "price_discount",
      width: "7%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Thời gian thực hiện",
      dataIndex: "time_estimate",
      key: "time-estimate",
      width: "10%",
    },
    {
      title: "Dành cho",
      dataIndex: "sex_type",
      key: "sex_type",
      width: "10%",

      ellipsis: true,
      render: (sextype) => {
        if (sextype == 1) {
          return <td>Nữ</td>;
        } else {
          return <td>Nam</td>;
        }
      },
    },
    {
      title: "",
      dataIndex: "action",
      width: "15%",
      render: (text, record) => (
        <>
          <Button
            key={`a-${record.name}`}
            onClick={() => {
              showDrawerInfo();
              state.service = record;
            }}
            type="primary"
            shape="round"
            style={{ marginRight: "10px", border: "none" }}
          >
            Chi tiết
          </Button>

          <Button
            onClick={() => {
              showModalDelete();
              state.service_id = record.id;
              state.service_name = record.name;
            }}
            shape="circle"
            type="danger"
          >
            <i className="ion-android-delete" />
          </Button>
        </>
      ),
    },
  ];

  const onChangeBookOnline = (e) => {
    console.log("radio checked", e.target.value);
    setBookOnline(e.target.value);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusAdd = await AddService();
    console.log(statusAdd);
    if (statusAdd == true) {
      
      setData([]);
      getService();
      setVisible(false);
      setConfirmLoading(false);
    } else {
      history.push("/dashboard");
    }
  };  
  return (
    <>
    {console.log(data)}
      <ViewWrapper>
        <Button
          shape="round"
          onClick={showModal}
          style={{
            marginBottom: "3%",
            backgroundColor: "#22D3EE",
            color: "whitesmoke",
          }}
        >
          Thêm dịch vụ mới +
        </Button>
        <TableWrapper dataSource={data} columns={columns} />
      </ViewWrapper>

      <Drawer
        closable={false}
        title="Thông tin  dịch vụ"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <DrawerService service={state.service} />
        {/* <Descriptions title="" layout="vertical" bordered>
          <Descriptions.Item label="Tên dịch vụ" span={12}>
            {state.service.name}
          </Descriptions.Item>
          <Descriptions.Item label="Giá" span={1}>
            {state.service.price}
          </Descriptions.Item>
          <Descriptions.Item label="Giá ưu đãi" span={1}>
            {state.service.price_discount}
          </Descriptions.Item>
          <Descriptions.Item label="Dành cho" span={1}>
            {state.service.sex_type}
          </Descriptions.Item>
          <Descriptions.Item label="Đặt online" span={1}>
            {state.service.can_book_online}
          </Descriptions.Item>
          <Descriptions.Item label="Tình trạng" span={3}></Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {state.service.description}
          </Descriptions.Item>
        </Descriptions> */}
      </Drawer>
      <Modal
        title="Xác nhận"
        visible={visibleDeleteModal}
        onOk={handleOkDeleteModal}
        onCancel={handleCancelDeleteModal}
        okText="Xác nhận"
        cancelText="Hủy"
        okType="danger"
      >
        Xóa dịch vụ {state.service_name}?
      </Modal>
      <Modal
        title="Thêm dịch vụ"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <FormWrapper>
          <Form name="basic" layout="vertical" hideRequiredMark>
            <Form.Item label="Tên dịch vụ" name="name">
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Giá" name="price">
              <Input onChange={(e) => setPrice(e.target.value)} />
            </Form.Item>
            <Form.Item label="Giá ưu đãi" name="price_discount">
              <Input onChange={(e) => setPriceDiscount(e.target.value)} />
            </Form.Item>
            <Form.Item label="Số lượng" name="stock">
              <Input onChange={(e) => setStock(e.target.value)} />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <TextArea
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Hình ảnh" name="picture">
              <Input onChange={(e) => setPicture(e.target.value)} />
            </Form.Item>
            <Form.Item label="Thời gian thực hiện" name="time_estimate">
              <Input onChange={(e) => setTimeEstimate(e.target.value)} />
            </Form.Item>
            <Form.Item label="Có đặt được online" name="bookonline">
              <Radio.Group onChange={onChangeBookOnline} value={book_online}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Dành cho" name="sex_type">
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Modal>
    </>
  );
}
