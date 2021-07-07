import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import Rating from '@iso/ui/Rating/Rating';
import Heading from '@iso/ui/Heading/Heading';
import Text from '@iso/ui/Text/Text';
import Button from '@iso/ui/Antd/Button/Button';
import DescriptionWrapper from './Description.style';
import { RatingMeta, TextButton, Cost, Amount } from '../SinglePageView.style';
import AmountBar from '../AmountBar/AmountBar';
import FormActionArea from '../Reservation/Reservation.style';
const Description = ({
  title,
  location,
  content,
  rating,
  ratingCount,
  titleStyle,
  locationMetaStyle,
  contentStyle,
  linkStyle,
}) => {
  return (
    <Element name="overview" className="overview">
      <DescriptionWrapper>
        <Heading as="h2" content={title} {...titleStyle} />
        <RatingMeta>
          <Rating rating={rating} ratingCount={ratingCount} type="bulk" />
        </RatingMeta>
        <Cost>150000đ</Cost>
        <Amount>
          Số lượng: <AmountBar />{' '}
        </Amount>
      </DescriptionWrapper>
      <FormActionArea>
        <button htmlType="submit" type="primary">
          Thêm vào giỏ hàng
        </button>
      </FormActionArea>
    </Element>
  );
};

Description.propTypes = {
  titleStyle: PropTypes.object,
  locationMetaStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

Description.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: '4px',
  },
  locationMetaStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#909090',
  },
  contentStyle: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: '1.6',
  },
};

export default Description;
