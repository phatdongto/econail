import React, { useState } from 'react';
import { TimePicker } from 'antd';
import { DatePicker} from 'antd';



import Button from '@iso/ui/Antd/Button/Button';
import HtmlLabel from '@iso/ui/HtmlLabel/HtmlLabel';

import ViewWithPopup from '@iso/ui/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from '@iso/ui/InputIncDec/InputIncDec';


import ReservationFormWrapper, {
  FormActionArea,
  FieldWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Reservation.style.js';

const RenderReservationForm = () => {
  // form state
  const [formState, setFormState] = useState({
    startDate: null,
    endDate: null,
    room: 0,
    guest: 0,
  });

  // handle room guest increment decrement
  const handleIncrement = type => {
    setFormState({
      ...formState,
      [type]: formState[type] + 1,
    });
  };

  const handleDecrement = type => {
    if (formState[type] <= 0) {
      return false;
    }
    setFormState({
      ...formState,
      [type]: formState[type] - 1,
    });
  };

  const handleIncDecOnChnage = (e, type) => {
    let currentValue = e.target.value;

    setFormState({
      ...formState,
      [type]: currentValue,
    });
  };

  // handle date data on update
  const updateSearchDataFunc = value => {
    setFormState({
      ...formState,
      startDate: value.setStartDate,
      endDate: value.setEndDate,
    });
  };

  // handleSubmit data
  const handleSubmit = e => {
    e.preventDefault();
    alert(
      `Start Date: ${formState.startDate}\nEnd Date: ${formState.endDate}\nRooms: ${formState.room}\nGuests: ${formState.guest}`
    );
  };
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  return (
    <ReservationFormWrapper className="form-container" onSubmit={handleSubmit}>
      <FieldWrapper>
      <HtmlLabel htmlFor="dates" content="Chọn ngày" />
      <DatePicker className="TimePicker" selected={startDate} onChange={(date) => setStartDate(date)} placeholder="Chọn ngày" />
        
        
      </FieldWrapper>
      <FieldWrapper>
      <HtmlLabel htmlFor="dates" content="Chọn giờ" />
      <TimePicker
        className="TimePicker"
      />
      </FieldWrapper>
      <FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Chọn địa điểm" />
        <ViewWithPopup
          key={200}
          noView={true}
          className={formState.room || formState.guest ? 'activated' : ''}
          view={
            <Button type="default">
              <span>Chọn địa điểm {formState.room > 0 && `: ${formState.room}`}</span>
              
            </Button>
          }
          popup={
            <RoomGuestWrapper>
              <ItemWrapper>
                <strong>Room</strong>
                <InputIncDec
                  id="room"
                  increment={() => handleIncrement('room')}
                  decrement={() => handleDecrement('room')}
                  onChange={e => handleIncDecOnChnage(e, 'room')}
                  value={formState.room}
                />
              </ItemWrapper>

              <ItemWrapper>
                <strong>Guest</strong>
                <InputIncDec
                  id="guest"
                  increment={() => handleIncrement('guest')}
                  decrement={() => handleDecrement('guest')}
                  onChange={e => handleIncDecOnChnage(e, 'guest')}
                  value={formState.guest}
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          }
        />
      </FieldWrapper>
      <FormActionArea>
        <Button htmlType="submit" type="primary">
          Đặt lịch
        </Button>
      </FormActionArea>
    </ReservationFormWrapper>
  );
};

export default RenderReservationForm;
