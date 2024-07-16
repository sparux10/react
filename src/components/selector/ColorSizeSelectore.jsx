import { useState } from 'react';

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
    <div>
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

      <button onClick={handleSave}>Save</button>

      <div>
        <h3>Selected pairs:</h3>
        {selected.map((pair, index) => (
          <div key={index}>
            Color: {getColorNameById(pair.color_id)} (ID: {pair.color_id}), Size: {getSizeNameById(pair.size_id)} (ID: {pair.size_id})
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
