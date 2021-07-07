import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import Loader from '@hotel/components/Loader/Loader';
import ServiceListingWrapper from './Service.style';
import ServiceSectionTitle from './SectionTitle/SectionTitle';
import Container from '@iso/ui/UI/Container/Container';
import ImageCard from '@hotel/components/ImageCard/ImageCard';
import GlideCarousel, { GlideSlide } from '@iso/ui/GlideCarousel/GlideCarousel';
import useDataApi from '@iso/lib/hooks/useDataApi';
import {
  SERVICE_SINGLE_POST_PAGE,
  LISTING_POSTS_PAGE,
} from '../../settings/constant';
import LocationWrapper, {
  CarouselSection,
} from '../Home/Location/Location.style';
const carouselOptions = {
  type: 'carousel',
  perView: 6,
  gap: 30,
  autoplay: 3000,
  hoverpause: true,
  breakpoints: {
    1440: {
      perView: 6,
      gap: 20,
    },
    1200: {
      perView: 5,
      gap: 20,
    },
    991: {
      perView: 4,
    },
    767: {
      perView: 4,
      gap: 15,
    },
    667: {
      perView: 2,
      gap: 20,
    },
    480: {
      perView: 2,
      gap: 15,
    },
  },
};

export default function ServiceListing() {
  const { data } = useDataApi('/data/location.json');
  const { data1 } = useDataApi('/data/location.json');
  return (
    <ServiceListingWrapper>
      <Container fluid="true">
        <ServiceSectionTitle title="Chăm sóc móng tay ,cắt móng" />
        <CarouselSection>
          {data.length !== 0 ? (
            <GlideCarousel
              carouselSelector="explore_carousel"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              <>
                {data.map((post, index) => (
                  <GlideSlide key={index}>
                    <ImageCard
                      link="post-service"
                      imageSrc={post.locationImage.url}
                      title={`Tên dịch vụ`}
                      meta={`100000VND`}
                      sextype={`Dành cho nam`}
                    />
                  </GlideSlide>
                ))}
              </>
            </GlideCarousel>
          ) : (
            <Loader />
          )}
        </CarouselSection>
        <ServiceSectionTitle title="Dịch vụ sơn vẽ móng tay" />
        <CarouselSection>
          {data.length !== 0 ? (
            <GlideCarousel
              carouselSelector="explore_carouse1"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              <>
                {data.map((post, index) => (
                  <GlideSlide key={index}>
                    <ImageCard
                      link="post-service"
                      imageSrc={post.locationImage.url}
                      title={`Tên dịch vụ`}
                      meta={`100000VND`}
                      sextype={`Dành cho nam`}
                    />
                  </GlideSlide>
                ))}
              </>
            </GlideCarousel>
          ) : (
            <Loader />
          )}
        </CarouselSection>
      </Container>
    </ServiceListingWrapper>
  );
}
