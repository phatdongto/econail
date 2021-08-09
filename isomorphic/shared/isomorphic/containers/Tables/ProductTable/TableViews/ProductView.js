import React from "react";
import TableWrapper from "../AntTables.styles";

import { Icon } from 'antd';
import { FilterDropdown } from '@iso/components/Tables/HelperCells';
import { Button } from "antd";
import DrawerDetailService from "./Drawer";
import { backgroundColor, color, marginRight } from "styled-system";
import { ViewWrapper } from "../../../CustomerSinglePage/AntTables/AntTables.styles";
import { Drawer, Descriptions, Badge, Modal } from "antd";
import services_1 from "../../services";
import products from "../../product";
import service_employee from "../../service_employee";

//import AddEmployeeView from "../../EmployeeTable/TableView/ModalView/AddEmployeeView";

export default function(props) {
  const [state, setState] = React.useState({
    dataList: products.data.data,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    product:{},
  });

  function onSearch() {
    let { searchText } = state;
    searchText = searchText.toUpperCase();
    const dataList = products.data.data
      .filter(data => data['name'].toUpperCase().includes(searchText));
    setState({
      dataList,
      filterDropdownVisible: false,
      searchText: '',
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
  let name1;
  const showDrawerInfo = (name) => {
    name1=name;
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "10%",
      filterDropdown,
    filterIcon: (
      <Icon
        type="search"
        style={{ color: state.filtered ? '#108ee9' : '#aaa' }}
      />
    ),
    filterDropdownVisible: state.filterDropdownVisible,
    onFilterDropdownVisibleChange: visible => {
      setState({ ...state, filterDropdownVisible: visible });
      document.getElementById('tableFilterInput').focus();
    }
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
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (text, record ) => (
        <>
          <Button
            key={`${record.id}`}
            
            onClick={() => {
              showDrawerInfo(record.name);
              state.product=record
            }}
            type="primary"
            shape="round"
            style={{marginRight: "10px",border:'none'}}
          >Chi tiết</Button>
        
          <Button
            icon="delete"
            onClick={showModalDelete}
            shape="circle"
            type="danger"
          />
          
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
        <Button
          shape="round"
          onClick={showModal}
          style={{ marginBottom: "3%" ,backgroundColor:"#22D3EE",color:"whitesmoke"  }}
        >
          Thêm sản phẩm mới +
        </Button>
        <TableWrapper  rowKey={record => record.id} dataSource={state.dataList} columns={columns} />
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
            Xóa sản phẩm này?
          </Modal>
      <Modal
        title="Thêm nhân viên"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        
      </Modal>
      <Drawer  
        closable={false}
        title="Thông tin  sản phẩm"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <img width="100px" height="100px" src="https://source.unsplash.com/random" style={{marginBottom:"20px",marginLeft:"auto",marginRight:"auto",display:"block"}}></img>
        <Descriptions title="" layout="vertical" bordered>
          
          <Descriptions.Item label="Tên sản phẩm" span={12}>{state.product.name}</Descriptions.Item>
          <Descriptions.Item label="Giá" span={1}>{state.product.price}</Descriptions.Item>
          <Descriptions.Item label="Giá ưu đãi" span={1}>{state.product.price_discount}</Descriptions.Item>
          <Descriptions.Item label="Đơn vị" span={1}>{state.product.unit}</Descriptions.Item>
          <Descriptions.Item label="Số lượng" span={1}>{state.product.amount}</Descriptions.Item>
          <Descriptions.Item label="Hình ảnh" span={1}>
          {state.product.picture}
          </Descriptions.Item>
          <Descriptions.Item label="Stock" span={1}>
          {state.product.stock}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span="3">{state.product.description}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}
