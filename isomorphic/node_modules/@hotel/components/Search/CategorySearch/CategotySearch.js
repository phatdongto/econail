import React, { useState } from 'react';
import moment from 'moment';
import Button from '@iso/ui/Antd/Button/Button';
import Slider from '@iso/ui/Antd/Slider/Slider';
import Checkbox from '@iso/ui/Antd/Checkbox/Checkbox';
import ViewWithPopup from '@iso/ui/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from '@iso/ui/InputIncDec/InputIncDec';
import DateRangePickerBox from '@iso/ui/DatePicker/ReactDates';
import { setStateToUrl, getStateFromUrl } from '../url_handler';
import { priceInit, getPropertyType } from '../SearchParams';
import CategroySearchWrapper, {
  RoomGuestWrapper,
  ItemWrapper,
  ActionWrapper,
} from './CategorySearch.style';

const CategotySearch = ({ history, location }) => {
  const searchParams = getStateFromUrl(location);
  const state = {
    amenities: searchParams.amenities || [],
    property: searchParams.property || [],
    date_range: searchParams.date_range || {
      setStartDate: null,
      setEndDate: null,
    },
    price: searchParams.price || {
      min: 0,
      max: 100,
      defaultMin: 0,
      defaultMax: 100,
    },
    location: searchParams.location || {
      lat: null,
      lng: null,
    },
    room: parseInt(searchParams.room) || 0,
    guest: parseInt(searchParams.guest) || 0,
  };
  const { amenities, property, date_range, price, room, guest } = state;

  // Room guest state
  const [countRoom, setRoom] = useState(room);
  const [countGuest, setGuest] = useState(guest);

  // data handling
  const onChange = (value, type) => {
    const query = {
      ...state,
      [type]: value,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestApply = () => {
    const query = {
      ...state,
      room: countRoom,
      guest: countGuest,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestCancel = () => {
    setRoom(0);
    setGuest(0);
    const query = {
      ...state,
      room: 0,
      guest: 0,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  // Clear search data
  const onSearchReset = () => {
    setRoom(0);
    setGuest(0);
    const search = setStateToUrl({ reset: '' });
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  return (
    <CategroySearchWrapper>
      <ViewWithPopup
        className={property.length ? 'activated' : ''}
        key={getPropertyType.id}
        noView={true}
        view={
          <Button type="default">
            {getPropertyType.name}
            {property.length > 0 && `: ${property.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getPropertyType.options}
            defaultValue={property}
            onChange={value => onChange(value, 'property')}
          />
        }
      />

      <ViewWithPopup
        className={
          price.min === price.defaultMin && price.max === price.defaultMax
            ? ''
            : 'activated'
        }
        key={300}
        noView={true}
        view={
          <Button type="default">
            {price.min > 0 || price.max < 100
              ? `Price: ${price.min}, ${price.max}`
              : `Giá`}
          </Button>
        }
        popup={
          <Slider
            range
            marks={priceInit}
            min={price.defaultMin}
            max={price.defaultMax}
            defaultValue={[price.min, price.max]}
            onAfterChange={value => onChange(value, 'price')}
          />
        }
      />

      <div className="view_with__popup">
        <div className="popup_handler">
          <Button type="default" onClick={onSearchReset}>
            Lọc
          </Button>
        </div>
      </div>
      <div className="view_with__popup">
        <div className="popup_handler">
          <Button type="default" onClick={onSearchReset}>
            Cài lại
          </Button>
        </div>
      </div>
    </CategroySearchWrapper>
  );
};

export default CategotySearch;
