import React, { useState } from 'react';
import './dropdown.css'; // Import the CSS file for styling
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.name);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (props.handleType) {
      props.handleType(option);
    } else if (props.handleCity) {
      props.handleCity(option);
    } else if (props.handleAge) {
      props.handleAge(option);
    }
  };
  

  return (
    <Dropdown>
      <Dropdown.Toggle variant="custom" id="dropdown-basic" className='dropdown-toggle2'>
        {selectedOption || 'Select an option'}
      </Dropdown.Toggle>

      <Dropdown.Menu className='dropdown-menu'>
        {props.array.map((option, index) => {
          return (
            <Dropdown.Item
              key={index}
              onClick={() => handleOptionSelect(option)}
              className='dropdown-item'
            >
              {option}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;