import React from 'react';
//import { IoIosArrowBack } from 'react-icons/io';
//import { IoIosArrowForward } from 'react-icons/io';
//import Loader from '@hotel/components/Loader/Loader';
import Container from '@iso/ui/UI/Container/Container';
import Heading from '@iso/ui/Heading/Heading';
import TextLink from '@iso/ui/TextLink/TextLink';
import SectionTitle from '@hotel/components/SectionTitle/SectionTitle';
//import ImageCard from '@hotel/components/ImageCard/ImageCard';
///import GlideCarousel, { GlideSlide } from '@iso/ui/GlideCarousel/GlideCarousel';
//import useDataApi from '@iso/lib/hooks/useDataApi';
import { LISTING_POSTS_PAGE } from '../../../settings/constant';
import LocationWrapper from '../Location/Location.style';
import products from '../Grid/products'
import Test from './Test';
//import LocationWrapper, { CarouselSection } from './Location.style';
const hi = <h1>asdasd</h1>
const productCom =products.data.data.map((product) => (<Heading key={product.id} content={product.name} />));
const Combo = () => {
  return (

    <LocationWrapper>
      
      <Container fluid={true}>
         
        <SectionTitle
          title={<Heading content="Các ưu đãi hiện có" />}
          link={<TextLink link={LISTING_POSTS_PAGE} content="Xem thêm" />}
        />
      </Container>
    </LocationWrapper>
  );
};
export default Combo;
