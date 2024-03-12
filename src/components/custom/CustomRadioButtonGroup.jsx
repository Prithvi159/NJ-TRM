import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './CustomRadioButtonGroup.css'
import BusIcon from '../../assets/images/bus.png'
import TrainIcon from '../../assets/images/train.png'
import BothIcon from '../../assets/images/Both.png'

const types = {
  Bus: BusIcon,
  Train: TrainIcon,
  Both: BothIcon,
};

const CustomButton = (props) => {
  const { value, selectedValue, onClick } = props
  const icon = types[value];

  return (
    <Button
      onClick={() => onClick(value)}
      variant={selectedValue === value ? 'contained' : 'outlined'}
      className='custom-button'
    >
      {icon && <img src={icon} alt={`${value} icon`} className="button-icon" />}
      {value}
    </Button>
  );
};

const CustomRadioButtonGroup = (props) => {
  const {jsonDataArray} = props;
  const [selectedValue, setSelectedValue] = useState('');

  const handleButtonClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      {jsonDataArray?.length && jsonDataArray.map((jsonData, index) => (
        <ButtonGroup key={index} className='custom-radio-btn-grp'>
          {jsonData.buttons.map((btn, btnIndex) => (
            <CustomButton
              key={btnIndex}
              value={btn.label}
              selectedValue={selectedValue}
              onClick={handleButtonClick}
            />
          ))}
        </ButtonGroup>
      ))}
    </div>
  );
};

export default CustomRadioButtonGroup;
