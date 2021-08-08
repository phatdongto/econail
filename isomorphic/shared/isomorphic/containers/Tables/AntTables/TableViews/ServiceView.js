import React from "react";
import TableWrapper from "../../AntTables/AntTables.styles";
import { FilterDropdown } from "@iso/components/Tables/HelperCells";
import { Button } from "antd";
import { Icon } from "antd";

import { FormWrapper, ViewWrapper } from "../../AntTables/AntTables.styles";
import { Drawer, Descriptions, Badge, Modal } from "antd";
import services_1 from "../../services";

import AddEmployeeView from "../../EmployeeTable/TableView/ModalView/AddEmployeeView";

export default function() {
  const [state, setState] = React.useState({
    dataList: services_1.data.data,
    filterDropdownVisible: false,
    searchText: "",
    filtered: false,
    service: {},
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
            style={{marginRight: "10px",border:'none'}}
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
          Thêm dịch vụ mới +
        </Button>
        <TableWrapper dataSource={state.dataList} columns={columns} />
      </ViewWrapper>
      <Drawer
        closable={false}
        title="Thông tin  dịch vụ"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Descriptions title="" layout="vertical" bordered>
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
        </Descriptions>
      </Drawer>
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
    </>
  );
}
