import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from '@iso/lib/hooks/useLocation';

import Row from '@iso/ui/Antd/Grid/Row';
import Col from '@iso/ui/Antd/Grid/Col';
import Modal from '@iso/ui/Antd/Modal/Modal';
import Button from '@iso/ui/Antd/Button/Button';
import Container from '@iso/ui/UI/Container/Container';
import Loader from '@hotel/components/Loader/Loader';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import Description from '../SinglePage/Description/Description';
import Sticky from 'react-stickynode';
import Location from '../SinglePage/Location/Location';
import Review from '../SinglePage/Review/Review';
import { SERVICE_ORDER } from '../../settings/constant';
import Reservation from '../SinglePage/Reservation/Reservation';
import TopBar from '../SinglePage/TopBar/TopBar';
import SinglePageWrapper, { PostImage } from './ServiceSinglePage.style';
import PostImageGallery from '../SinglePage/ImageGallery/ImageGallery';
import useDataApi from '@iso/lib/hooks/useDataApi';
import isEmpty from 'lodash/isEmpty';
import BottomReservation from '../SinglePage/Reservation/BottomReservation';
import Image from './post-image-1.jpg';
import Amenities from '../SinglePage/Amenities/Amenities';
import SinglePageServiceWrapper, {
  FormActionArea,
  DescriptionArea,
  ProcessArea,
  TextArea,
  ImageArea,
  CostArea,
} from './ServiceSinglePage.style';
const ServiceSinglePage = ({ match }) => {
  
  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  // useWindowSize hook
  const { width } = useWindowSize();

  let url = '/data/hotel-single.json';
  if (!match.params.slug) {
    url += match.params.slug;
  }
  

  return (
    <SinglePageServiceWrapper>
      <PostImage>
        <Button type="primary" className="image_gallery_button">
          View Photos
        </Button>
      </PostImage>
      <CostArea>
        <h4 class="normalcost">Giá 205k</h4>
        <h4>Giá ưu đãi 105k</h4>
      </CostArea>
      {/* <DescriptionArea>
        In South Williamsburg only a few blocks inland from the East River,
        Marlo &Sons is a rustic respite with nice wine, good cocktails, and
        excellent snacking fare such as oysters, local cheese, and potato
        tortilla. But thereâ€™s more: seasonal salads and soups, the famous
        brick chicken, a dimly lit space outfitted in various types of wood(this
        is an Andrew Tarlow restaurant, after all). In many ways.
      </DescriptionArea>
      <DescriptionArea>Thời gian: 30 phút</DescriptionArea>
     
      <Link to={SERVICE_ORDER}>

      <FormActionArea>
        <button>
          Đặt lịch ngay
        </button>
      </FormActionArea>
      </Link> */}
      <Container>
        <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
          <Col xl={16}>
          <DescriptionArea>
        In South Williamsburg only a few blocks inland from the East River,
        Marlo &Sons is a rustic respite with nice wine, good cocktails, and
        excellent snacking fare such as oysters, local cheese, and potato
        tortilla. But thereâ€™s more: seasonal salads and soups, the famous
        brick chicken, a dimly lit space outfitted in various types of wood(this
        is an Andrew Tarlow restaurant, after all). In many ways.
      </DescriptionArea>
      <DescriptionArea>Thời gian: 30 phút</DescriptionArea>
          </Col>
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky
                innerZ={999}
                activeClass="isSticky"
                top={202}
                bottomBoundary="#reviewSection"
              >
                <Reservation />
              </Sticky>
            ) : (
              <BottomReservation
                
              />
            )}
          </Col>
        </Row>
        </Container>
    </SinglePageServiceWrapper>
  );
};

export default ServiceSinglePage;
