import React, { useState } from 'react';
import './App.css';

const plates = [
  // Plate 0
  [
    ['x', 'x', '4♠', '7♣', 'K♠', 'x', 'x', '☉'],
    ['2♣', 'Q♦', '4♣', 'Q♥', '10♦', '2♥', 'Q♣', '☿'],
    ['7♠', '9♠', 'A♣', '6♠', '6♦', 'J♥', '4♦', '♀'],
    ['3♠', '8♣', '10♣', 'A♦', '6♥', '3♦', '7♠', '♂'],
    ['Q♠', '5♠', '4♥', '3♠', '8♣', '10♣', 'A♦', '♃'],
    ['J♠', '7♦', 'J♦', 'K♦', '5♣', '9♦', 'A♥', '♄'],
    ['5♥', '10♠', 'J♣', '8♠', 'K♥', '8♥', '5♦', '♅'],
    ['9♣', '2♠', '2♦', '7♥', 'K♣', '5♥', '10♠', '♆'],
    ['♆', '♅', '♄', '♃', '♂', '♀', '☿', '']
  ],
  // Add more plates as needed
];

const App = () => {
  const [selectedPlate, setSelectedPlate] = useState(0);

  const handlePlateChange = (e) => {
    setSelectedPlate(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>Planetary Table</h1>
      <label>
        Select Plate:
        <select onChange={handlePlateChange}>
          {plates.map((_, index) => (
            <option value={index} key={index}>
              Plate {index}
            </option>
          ))}
        </select>
      </label>
      <table border="1">
        <tbody>
          {plates[selectedPlate].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: '1px solid black',
                    padding: '10px',
                    textAlign: 'center',
                    color: cell.match(/[☉☿♀♂♃♄♅♆]/) ? 'red' : 'black'
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
