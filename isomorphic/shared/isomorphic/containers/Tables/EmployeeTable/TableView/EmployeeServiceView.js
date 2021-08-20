import React, { useEffect, useState } from "react";
import TableWrapper from "../../AntTables/AntTables.styles";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { FormWrapper, ViewWrapper } from "../../AntTables/AntTables.styles";
import {
  Drawer,
  Descriptions,
  Badge,
  Modal,
  Tag,
  Input,
  Form,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import DrawerEmployee from "./DrawerEmployeeService";
import service_employee from "../../service_employee";
import axios from "axios";
const { Search } = Input;
const { TextArea } = Input;
export default function() {
  const USER_TOKEN = localStorage.getItem("token");
  const AuthStr = "Bearer ".concat(USER_TOKEN);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [state, setState] = React.useState({
    dataList: service_employee.data.data,
    searchText: "",
    employee: {},
    employee_id: null,
    employee_name: null
  });
  
  
  
  // Get Employee Service

  function getEmployeeService() {
    axios
      .get(`http://econail.localhost/api/sub_admin/staff?role=3`, {
        headers: {
          Authorization: AuthStr,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if(response.data.status){
        const staff = response.data.data.data;
        setData(staff);
        console.log(data);
        }
      });
  }
  useEffect(() => {
   getEmployeeService();
  },[]);
  //Add Employee
  const [name,setName]=useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [fullname,setFullname] = useState();
  const [phone,setPhone] = useState();
  async function AddEmployee(){
    return axios.post('http://econail.localhost/api/sub_admin/staff',
    {
      "username" : name, 
      "email" : email,
      "password" : password, 
      "fullname" : fullname,
      "phone" : phone,
      "role" : 3
  } ,{ headers: { Authorization: AuthStr,'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS','Access-Control-Allow-Origin' : '*' }}  
    ).then(res=>res.data.status);
    
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setConfirmLoading(true);
    const statusAdd =  await AddEmployee();
    console.log(statusAdd);
    if(statusAdd == true){
    form.resetFields();
    getEmployeeService();
    setVisible(false);
    setConfirmLoading(false);
    
    }
    else{
      setVisible(false);
    }

  }
  // Delete Employee
  async function DeleleEmployee(employee_id) {  
    return axios.get(`http://econail.localhost/api/sub_admin/staff/${employee_id}/delete`,
    { headers: { Authorization: AuthStr,'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS','Access-Control-Allow-Origin' : '*' }})
    .then(res=>res.data.status);

  }
  const handleOkDeleteModal = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    const statusDelete = await DeleleEmployee(state.employee_id);
    if(statusDelete==true){
      setTimeout(() => {
        
        setVisibleDeleteModal(false);
        setConfirmLoading(false);
        getEmployeeService()
        
        
        
      }, 2000);
    }
  };
  function onSearch() {
    let { searchText } = state;
    searchText = searchText.toUpperCase();
    const dataList = data.filter((data) =>
      data["name"].toUpperCase().includes(searchText)
    );
    setState({
      dataList,

      searchText: "",
      filtered: false,
    });
  }
  function onInputChange(event) {
    setState({ ...state, searchText: event.target.value });
  }
  const { initialInvoices, invoices } = useSelector((state) => state.Invoices);
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

  

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "name",
      width: "20%",
    },
    {
      title: "Tài khoản email",
      dataIndex: "email",
      key: "price",
      width: "20%",
      ellipsis: true,
    },

    {
      title: "Vị trí",
      dataIndex: "role",
      key: "description",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Tình trạng",

      key: "status",
      width: "20%",
      render: () => {
        return <Tag color="blue">Đang làm</Tag>;
      },
    },

    {
      title: "",
      dataIndex: "action",
      width: "15%",
      render: (_, record) => (
        <>
          {record.name === "initial" && <Button icon="plus" shape="circle" />}
          {record.name !== "initial" && (
            <>
              <Button
                className="button-detail"
                key={`${record.id}`}
                onClick={() => {
                  showDrawerInfo(record.name);
                  state.employee = record;
                }}
                shape="round"
                style={{
                  marginRight: "10px",
                  color: "#1BC5BD",
                  backgroundColor: "#C9F7F5",
                  border: "none",
                }}
              >
                Chi tiết
              </Button>

              <Button
                  onClick={() => {
                    showModalDelete();
                    state.employee_id = record.id;
                    state.employee_name = record.username;
                  }}
                  shape="circle"
                  type="danger"
                >
                  <i className="ion-android-delete" />
                </Button>
              
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <ViewWrapper>
        <div className="a">
          <Search placeholder="Nhập tên nhân viên" style={{ width: 200 }} />

          <Button
            shape="round "
            onClick={showModal}
            style={{
              marginBottom: "3%",
              color: "whitesmoke",
              backgroundColor: "#22D3EE",
              border: "none",
              float: "right",
            }}
          >
            Thêm nhân viên dịch vụ +
          </Button>
        </div>
        <TableWrapper dataSource={data} columns={columns} />
      </ViewWrapper>
      <Modal
                title="Xác nhận"
                visible={visibleDeleteModal}
                onOk={handleOkDeleteModal}
                onCancel={handleCancelDeleteModal}
                okText="Xác nhận"
                cancelText="Hủy"
                okType="danger"
              >
                Xóa nhân viên {state.employee_name}?
              </Modal>
      <Modal
        title="Thêm nhân viên"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <FormWrapper>
          <Form form={form} name="basic" layout="vertical" hideRequiredMark>
            <Form.Item label="Tên nhân viên" name="name">
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password">
              <Input.Password
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Tên đầy đủ" name="fullname">
              <Input
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Item>
            
          </Form>
        </FormWrapper>
      </Modal>
      <Drawer
        closable={false}
        title="Thông tin  Nhân viên"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        
        <DrawerEmployee employee={state.employee} />
      </Drawer>
    </>
  );
}
