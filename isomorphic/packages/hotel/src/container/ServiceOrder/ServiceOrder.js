import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import Loader from '@hotel/components/Loader/Loader';
import { DatePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import { Form } from "react-bootstrap";


import ServiceOrderWrapper, {
  Title,
  SubTitle,
  Component,
  styles,
  colourStyles
} from './ServiceOrder.style';

const options = [
  {label : "Lucy", value : 'Lucy'},
  {label : "Jake", value : 'Jack'},
  {label : "Vance", value : 'Vance'},
];

// const Option = {Select}

const ServiceListing = () => {
  return (
    <div style = {{position:"relative", top:"0", left:"0", width: '100%', height: '100vh'}}>
      <ServiceOrderWrapper>
        <Title>THÔNG TIN ĐẶT LỊCH</Title>
        <Component>
          <SubTitle>Chọn Salon</SubTitle>
          {/* <Form.Item > */}
          <Select 
            options = {options}
            style={styles}
            placeholder="Chọn Salon"
          />  
          {/* </Form.Item> */}
            {/* <Option value = 'Kim'> Kim </Option>
          </Select> */}

          <SubTitle>Dịch vụ</SubTitle>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Sơn móng tay"
          ></input>
        </Component>
        <Component>
          <SubTitle>Chọn thời gian</SubTitle>
          <DatePicker style={styles} />
        </Component>
        <button>Hoàn tất</button>
      </ServiceOrderWrapper>
    </div>
  );
};
export default ServiceListing;
