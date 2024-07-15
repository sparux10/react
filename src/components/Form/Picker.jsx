import React, { useState } from 'react';

export default function Picker({props}) {
  const [availableColorSizes, setAvailableColorSizes] = useState([
    'red - m',
    'green - s',
    'green - s',
  ]);

  const [chosenColorSizes, setChosenColorSizes] = useState([]);

  const moveItems = (source, setSource, target, setTarget, items) => {
    setSource(source.filter(item => !items.includes(item)));
    setTarget([...target, ...items]);
  };

  return (
    <div className="color-size-picker">
      <div className="list-container">
        <h3>Available color sizes</h3>
        <select multiple>
          {availableColorSizes.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <button
          onClick={() => {
            const selectedOptions = Array.from(document.querySelectorAll('.list-container select')[0].selectedOptions).map(option => option.value);
            moveItems(availableColorSizes, setAvailableColorSizes, chosenColorSizes, setChosenColorSizes, selectedOptions);
          }}
        >
          &gt;&gt;
        </button>
      </div>
      <div className="list-container">
        <h3>Chosen color sizes</h3>
        <select multiple>
          {chosenColorSizes.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <button
          onClick={() => {
            const selectedOptions = Array.from(document.querySelectorAll('.list-container select')[1].selectedOptions).map(option => option.value);
            moveItems(chosenColorSizes, setChosenColorSizes, availableColorSizes, setAvailableColorSizes, selectedOptions);
          }}
        >
          &lt;&lt;
        </button>
      </div>
    </div>
  );
};

