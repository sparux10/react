import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import "./selector.css"

export default function ColorSizeSelector({ colors, sizes, selected, setSelected }) {
  const [currentSelection, setCurrentSelection] = useState({ color_id: '', size_id: '' });

  function handleColorChange(e) {
    const colorId = parseInt(e.target.value, 10);
    setCurrentSelection((prev) => ({ ...prev, color_id: colorId }));
  }

  function handleSizeChange(e) {
    const sizeId = parseInt(e.target.value, 10);
    setCurrentSelection((prev) => ({ ...prev, size_id: sizeId }));
  }

  function handleSave() {
    if (currentSelection.color_id && currentSelection.size_id) {
      setSelected((prev) => [...prev, currentSelection]);
      setCurrentSelection({ color_id: '', size_id: '' }); // Reset current selection
    } else {
      alert('Please select both color and size.');
    }
  }

  function handleDelete(index) {
    setSelected((prev) => prev.filter((_, i) => i !== index));
  }

  function getColorNameById(id) {
    const colorItem = colors.find((item) => item.id === id);
    return colorItem ? colorItem.color_name : 'Unknown';
  }

  function getSizeNameById(id) {
    const sizeItem = sizes.find((item) => item.id === id);
    return sizeItem ? sizeItem.size_name : 'Unknown';
  }

  return (
    <div className='selector_cs'>
      <div className='add_line'>
      <select value={currentSelection.color_id} onChange={handleColorChange}>
        <option hidden value="">
          Select color
        </option>
        {colors.map((item) => (
          <option key={item.id} value={item.id}>
            {item.color_name}
          </option>
        ))}
      </select>

      <select value={currentSelection.size_id} onChange={handleSizeChange}>
        <option hidden value="">
          Select size
        </option>
        {sizes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.size_name}
          </option>
        ))}
      </select>

      <div className='add' onClick={handleSave}><FontAwesomeIcon color='green' icon={faAdd} /></div>
</div>
      <div>
        <h3>Selected pairs:</h3>
        <div  className='selected_pairs'>
        {selected.map((pair, index) => (
          <div className='one_pair' key={index}>
            <span>Color : </span> {getColorNameById(pair.color_id)} , <span>Size : </span> {getSizeNameById(pair.size_id)} 
            <div onClick={() => handleDelete(index)}><FontAwesomeIcon color='red' icon={faRemove}/> </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
