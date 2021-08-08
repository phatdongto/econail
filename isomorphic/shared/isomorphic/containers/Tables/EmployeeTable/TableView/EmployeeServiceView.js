import React,{useEffect,useState} from "react";
import TableWrapper from "../../AntTables/AntTables.styles";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { FormWrapper, ViewWrapper } from "../../AntTables/AntTables.styles";
import { Drawer, Descriptions, Badge, Modal, Tag ,Input} from "antd";
import { useSelector } from "react-redux";

import AddEmployeeView from "./ModalView/AddEmployeeView";
import service_employee from "../../service_employee";
import axios from "axios";
const { Search } = Input;
export default function() {

  const [dataList1, setData] = useState({ data: [] });
  useEffect(() => {
     const fetchData = async () => {
       const result = await axios("http://econail.localhost/api/sub_admin/staff?role=1", {
       method: 'GET', 
       
    
     });
       res=JSON.parse(result.data)
       setData(res.data.data)
      
     };
     fetchData();
   }, []);

  const [state, setState] = React.useState({
    dataList: service_employee.data.data,
    searchText: '',
    employee: {},
  });
  function onSearch() {
    let { searchText } = state;
    searchText = searchText.toUpperCase();
    const dataList = products.data.data
      .filter(data => data['name'].toUpperCase().includes(searchText));
    setState({
      dataList,
      
      searchText: '',
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
        return (
          <Tag color="blue">Đang làm</Tag>
        );
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
                icon="delete"
                onClick={showModalDelete}
                shape="circle"
                type="danger"
              />
              <Modal
                title="Xác nhận"
                visible={visibleDeleteModal}
                onOk={handleOkDeleteModal}
                onCancel={handleCancelDeleteModal}
                okText="Xác nhận"
                cancelText="Hủy"
                okType="danger"
              >
                Xóa nhân viên này?
              </Modal>
            </>
          )}
        </>
      ),
    },
  ];
  const myColTitleStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

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
        {state.dataList.length > 0 ?( <TableWrapper dataSource={state.dataList} columns={columns} />)
        :
        (<div>Không có sản phẩm</div>)}
       
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
