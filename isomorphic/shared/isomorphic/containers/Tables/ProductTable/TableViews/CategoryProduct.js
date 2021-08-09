import React , { useState }from 'react';
import { Component } from 'react';
import TableWrapper from '../AntTables.styles';
import { Button } from 'antd';

import { Drawer,Descriptions,Badge , Modal} from 'antd';
import category_product from '../category';
import { backgroundColor, color, marginRight } from 'styled-system';
import AddServiceCategoryView from './ModalView/AddServiceCategoryView';
export default function() {
  const [state, setState] = React.useState({
    dataList: category_product.data.data,
    
    filtered: false,
    category:{}
  });
  const [visibleInfo, setVisibleInfo] = React.useState(false);
  const showDrawerInfo =()=>{
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
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleDeleteModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancelDeleteModal = () => {
    console.log('Clicked cancel button');
    setVisibleDeleteModal(false);
  };
  //
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
    
  
  const columns = [
    {
      title: 'Tên loại sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: "30%"  ,
      
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: "30%" ,
      ellipsis:true
    },
    {
        title: '',
        dataIndex: 'action',
        width: '15%',
        render: (_, record) => (
          <>
            {record.name === 'initial' && <Button icon="plus" shape="circle" />}
            {record.name !== 'initial' && (
              <>
              <Button
            key={`${record.id}`}
            
            onClick={() => {
              showDrawerInfo(record.name);
              state.category=record
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
            )}
          </>
        )
      }

  ];
  const myColTitleStyle = {
    textOverflow: 'ellipsis',
    overflow: "hidden",
    whiteSpace: 'nowrap',
  };
  return (
    <>
    
    <Button shape="round"
          onClick={showModal}
          style={{ marginBottom: "3%" ,backgroundColor:"#22D3EE",color:'whitesmoke'  }}>
        Thêm loại mới +
    </Button>
   <TableWrapper dataSource={category_product.data.data} columns={columns}   />
   <Modal
            title="Xác nhận"
            visible={visibleDeleteModal}
            onOk={handleOkDeleteModal}
            onCancel={handleCancelDeleteModal}
            okText="Xác nhận"
            cancelText="Hủy"
            okType="danger"
          >
            Xóa loại sản phẩm này?
      </Modal>
    <Modal
    title="Thêm loại"
    visible={visible}
    confirmLoading={confirmLoading}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="Thêm"
    cancelText="Hủy"
    
    >
      <AddServiceCategoryView/>

    </Modal>
    <Drawer  
        closable={false}
        title="Thông tin  sản phẩm"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Descriptions title="" layout="vertical" bordered>
          <Descriptions.Item label="Tên loại" span={12}>{state.category.name}</Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={1}>{state.category.note}</Descriptions.Item>
          
        </Descriptions>
      </Drawer>
    </>
  );
}
