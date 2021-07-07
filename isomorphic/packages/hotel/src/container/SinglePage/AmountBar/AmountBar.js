import React from 'react';
import AmountWrapper from './AmoutBar.style';

const AmountBar = () => {
  return (
    <AmountWrapper>
      <form>
        <div
          class="value-button"
          id="decrease"
          onclick="decreaseValue()"
          value="Decrease Value"
        >
          -
        </div>
        <div>
          <input type="number" id="number" value="0" />
        </div>
        <div
          class="value-button"
          id="increase"
          onclick="increaseValue()"
          value="Increase Value"
        >
          +
        </div>
      </form>
    </AmountWrapper>
  );
};
export default AmountBar;
