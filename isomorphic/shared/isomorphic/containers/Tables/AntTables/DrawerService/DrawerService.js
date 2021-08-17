import React from "react"

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";


import { Drawer, Descriptions, Modal, Radio,Form,Input,Button,Popconfirm } from "antd";
import services_1 from "../../services";
const DrawerService=(props)=>{
   
    return(
        
        <Descriptions title="" layout="vertical" bordered>
          <Descriptions.Item label="Tên dịch vụ" span={12}>
            {props.service.name}
          </Descriptions.Item>
          <Descriptions.Item label="Giá" span={1}>
            {props.service.price}
          </Descriptions.Item>
          <Descriptions.Item label="Giá ưu đãi" span={1}>
            {props.service.price_discount}
          </Descriptions.Item>
          <Descriptions.Item label="Dành cho" span={1}>
            {props.service.sex_type}
          </Descriptions.Item>
          <Descriptions.Item label="Đặt online" span={1}>
            {props.service.can_book_online}
          </Descriptions.Item>
          <Descriptions.Item label="Tình trạng" span={3}></Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {props.service.description}
          </Descriptions.Item>
        </Descriptions>
     
    )
}
export default DrawerService;