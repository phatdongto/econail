import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import Loader from '@hotel/components/Loader/Loader';
import ServiceOrderWrapper, {
  Title,
  SubTitle,
  Component,
} from './ServiceOrder.style';

const ServiceListing = () => {
  return (
    <ServiceOrderWrapper>
      <Title>THÔNG TIN ĐẶT LỊCH</Title>
      <Component>
        <SubTitle>Chọn Salon</SubTitle>
        <div class="chooseSalon">
          <FaHome size={16} /> Chọn Salon
        </div>
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
        <div class="chooseSalon">
          <FaRegCalendarAlt /> Chọn ngày,giờ
        </div>
      </Component>
      <button>Hoàn tất</button>
    </ServiceOrderWrapper>
  );
};
export default ServiceListing;
