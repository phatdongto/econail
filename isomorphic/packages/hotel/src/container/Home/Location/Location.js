import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Loader from "@hotel/components/Loader/Loader";
import Container from "@iso/ui/UI/Container/Container";
import Heading from "@iso/ui/Heading/Heading";
import TextLink from "@iso/ui/TextLink/TextLink";
import SectionTitle from "@hotel/components/SectionTitle/SectionTitle";
import ImageCard from "@hotel/components/ImageCard/ImageCard";
import GlideCarousel, { GlideSlide } from "@iso/ui/GlideCarousel/GlideCarousel";
import useDataApi from "@iso/lib/hooks/useDataApi";
import axios from "axios";
import {
  SERVICE_SINGLE_POST_PAGE,
  LISTING_POSTS_PAGE,
} from "../../../settings/constant";
import LocationWrapper, { CarouselSection } from "./Location.style";
const carouselOptions = {
  type: "carousel",
  perView: 6,
  gap: 50,
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

const handleServiceClick = (id) => {
  console.log(id);
};

const LocationGrid = () => {
  const { data } = useDataApi("/data/location.json");

  const [products, setProducts] = useState([]);

  const apiUrl = "http://econail.localhost/api";

  let test = [];
  useEffect(() => {
    axios.get(`${apiUrl}/g/service`).then((res) => {
      // console.log(res.data.status);
      // console.log(res.data.data.data);
      if (res.data.status) {
        test = [...res.data.data.data];
        // setProducts(res.data.data.data);
        // console.log(res.data.status);
        setProducts(test);
        // console.log(test);
        // console.log(products);
      }
      // console.log(products);
    });
  }, []);

  return (
    <LocationWrapper>
      {/* {console.log(products.slice(0, 6))} */}
      <Container fluid={true}>
        <SectionTitle
          title={<Heading content="Dịch vụ nổi bật" />}
          link={<TextLink link={LISTING_POSTS_PAGE} content="Xem thêm" />}
        />
        <CarouselSection>
          {products.length !== 0 ? (
            <GlideCarousel
              carouselSelector="explore_carousel"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              <>
                {/* {data.map((post, index) => (
                  <GlideSlide key={index}>
                    <ImageCard
                      link="post-service"
                      // imageSrc={post.locationImage.url}
                      imageSrc={"https://picsum.photos/177/280"}
                      title={`Tên dịch vụ`}
                      meta={`100000VND`}
                      sextype={`Dành cho nam`}
                    />
                  </GlideSlide>
                ))} */}
                {products.slice(0, 6).map((post) => (
                  <GlideSlide key={post.id}>
                    <ImageCard
                      onClick={() => handleServiceClick(post.id)}
                      serviceID={post.id}
                      link="post-service"
                      imageSrc={post.picture}
                      title={`${post.name}`}
                      meta={`${post.price} VND`}
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
    </LocationWrapper>
  );
};

export default LocationGrid;
