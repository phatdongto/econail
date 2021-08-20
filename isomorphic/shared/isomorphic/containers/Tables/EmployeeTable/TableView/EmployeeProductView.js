import React from "react";
import { useEffect,useState } from "react";
import TableWrapper from "../../AntTables/AntTables.styles";

import { Descriptions } from "antd";
import { Button, Drawer, Badge } from "antd";

import { FormWrapper, ViewWrapper } from "../../AntTables/AntTables.styles";
import { Form, Input, Checkbox, Modal, Select } from "antd";
import DrawerEmployee from "./DrawerEmployeeService";
import axios from "axios";
const { Search } = Input;
export default function() {
  const USER_TOKEN = localStorage.getItem("token");
  const AuthStr = "Bearer ".concat(USER_TOKEN);
  const [state, setState] = React.useState({
    dataList:{},
    employee: {},
    employee_id:null,
    employee_name:null
   
  });
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  function getEmployeeProduct() {
    axios
      .get(`http://econail.localhost/api/sub_admin/staff?role=2`, {
        headers: {
          Authorization: AuthStr,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const staff = response.data.data.data;
        setData(staff);
      });
  }
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
      "role" : 2
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
    getEmployeeProduct();
    setVisible(false);
    setConfirmLoading(false);
    
    }
    else{
      setVisible(false);
    }

  }
  useEffect(() => {
    getEmployeeProduct();
  }, []);
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
        getEmployeeProduct()
        
        
        
      }, 2000);
    }
  };
  
 
  
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
      key: "email",
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
      title: "",
      dataIndex: "action",

      width: "10%",
      render: (_, record) => (
        <>
          <>
            <Button
              key={`${record.id}`}
              onClick={() => {
                showDrawerInfo(record.name);
                state.employee = record;
              }}
              shape="round"
              type="text"
              style={{ marginRight: "10px",color:'#1BC5BD',backgroundColor:'#C9F7F5',border:'none' }}
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
        </>
      ),
    },
  ];

  return (
    <>
   
      <ViewWrapper>
      <div className="a">
          <Search placeholder="Nhập tên nhân viên"  style={{ width: 200 }} />
          <Button
            shape="round "
            onClick={showModal}
            style={{ marginBottom: "3%",color:'whitesmoke',backgroundColor:"#22D3EE",border:'none',float:'right' }}
          >
            Thêm nhân viên mới +
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
              <p>Xóa nhân viên này?</p>
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
        <DrawerEmployee employee={state.employee}/>
      </Drawer>
    </>
  );
}
