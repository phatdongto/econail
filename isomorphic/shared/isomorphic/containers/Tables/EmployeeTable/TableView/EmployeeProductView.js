import React from "react";
import { useEffect,useState } from "react";
import TableWrapper from "../../AntTables/AntTables.styles";
import { SearchIcon } from "@iso/components/ScrumBoard/SearchInput/SearchInput.style";
import services from "../../services";
import { Table } from "antd";
import { TabPane } from "@iso/components/uielements/tabs";
import { Descriptions } from "antd";
import { Button, Drawer, Badge } from "antd";
import { backgroundColor, color, marginRight } from "styled-system";
import { FormWrapper, ViewWrapper } from "../../AntTables/AntTables.styles";
import { Form, Input, Checkbox, Modal, Select } from "antd";
import product_employee from "../../product_employee";
import AddEmployeeView from "./ModalView/AddEmployeeView";
import axios from "axios";
const { Search } = Input;
export default function() {
  const [state, setState] = React.useState({
    dataList:{},
    employee: {},
   
  });
  const person=[];
  const [dataList1, setData] = React.useState({
    dataEmployee:[],
    
  });
  // useEffect(() => {
  //   const config = {
  //     headers: { 'authorization': `Bearer `}
  // };
  
  
  //   const getUserAPI = 'http://econail.localhost/api/sub_admin/staff?role=1'
 
  //   //Gọi API bằng axios
  //   axios.get(
  //     getUserAPI,
  //     config,
      
  //   ).then((res) => {
  //     // Cập nhật lại listUser bằng
  //     // Bạn có thể xem lại bài viết về useState()
  //     dataList1.dataEmployee=res.data.data.data;
      
  //   }).catch((err) => {
  //     //Trường hợp xảy ra lỗi
  //     console.log(err);
  //     alert(dataList1.dataEmployee);
  //   })
 
  // }, [])
  useEffect(() => {
     const fetchData = async () => {
       const result = await axios("http://econail.localhost/api/sub_admin/staff?role=1", {
       method: 'GET', 
       headers: {
         
         'authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmRlN2JiYjE3ZjUxNzU1ZTBiOThkZTRkOWU3M2QxMjFmYzYwZDJlOTEyMDM1MzgyMzQwY2RhZWMyMGUwOWVkMjA1YThjOTAxOTEzYTM3YzAiLCJpYXQiOjE2Mjc1MjI3NjQuNTA4OTMxLCJuYmYiOjE2Mjc1MjI3NjQuNTA4OTM1LCJleHAiOjE2NTkwNTg3NjQuNDk1MzI3LCJzdWIiOiIyIiwic2NvcGVzIjpbInN1Yl9hZG1pbiJdfQ.EsUnUWBLvtB_p3Jk8Q85rIiluYTi8KUSKvVWPO6ON2_hORqnlA6f2dUjAV6VKa6u4kWnuWDQkCOOIOjws9P7FYvas2DenwuS8b3MchoBN_K0-vpnwlJ0jOCa7CWnsKJ6BTTE31DK1iUEXR8IVjcaKsbngh4sl-xarbq9mgWUC_OxU-Vk_ZPQU6NkJZrgRGAfnUnHATGrcOqMnNYSYThULz4UbqekEqcTJkCZZT96ISZKXX9xQNRj1D0jp4DpvRlsRYbYd6dVL2rWidDJOdj2oJNpdNhZ5auDe-HyKQ1gUC6VghJitryVY-DVvYO4H-fcfCLpJOVtQACFHQraevW1TusvQwsvFS3tj4ODagJMDxP7T2ppt9SOy4GbraNHUXC-jY2FYTxsCUsLpr3x7MZeebg1fEzTMHajqZE4HoYvbCqYSRAnD87RI_4eG-F6tD6GyJVv6MgtVODBe7TiKdEeVXLbLX9ZncxubSU3eMYUYE1P25ghfjAGb2EiNZNA5xbMNncf4fObhr8sGJUUgISkDIBch6PXQRwf55YcTgSJ_WM66hybuVOj-1gytCTJ_nQWmUixcL21lMPRAIdhSL8M0h5NIxrtyP_NfrLi5AQH2VdysG2gbLmyb9k2M1NG6qIKftUS2NUfPhNn_yG4oJ9qSwY5ANlk0BIXUGQ9qyNHNBM'
       
       },
    
     });
       res=JSON.parse(result.data)
       setData(res.data.data)
      
     };
     fetchData();
   }, []);
  
  
 
  
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

  const handleOkDeleteModal = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleDeleteModal(false);
      setConfirmLoading(false);
    }, 2000);
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
      title: "Tên nhân viên",
      dataIndex: "username",
      key: "name",
      width: "20%",
    },
    {
      title: "Tài khoản nhân viên",
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
              Xem
            </Button>

            <Button
               
                onClick={showModalDelete}
                shape="circle"
                type="danger"
              > <i className="ion-android-delete" /></Button>
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
        <TableWrapper dataSource={dataList1.dataEmployee} columns={columns} />
      </ViewWrapper>
      <Modal
        title="Thêm nhân viên"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <AddEmployeeView />
      </Modal>
      <Drawer
        closable={false}
        title="Thông tin  Nhân viên"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Descriptions title="" layout="vertical" bordered>
          <Descriptions.Item label="Tên nhân viên" span={3}>
            {state.employee.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={1}>
            {state.employee.email}
          </Descriptions.Item>
          <Descriptions.Item label="Làm tại" span={1}></Descriptions.Item>
          <Descriptions.Item label="Vị trí" span={1}>
            {state.employee.role}
          </Descriptions.Item>

          <Descriptions.Item label="Tình trạng" span={3}>
            <Badge status="processing" text="Đang làm" />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}
