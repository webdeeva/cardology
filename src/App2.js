import React, { useState } from 'react';
import './App.css';
import birthdayCardMapping from './birthdayCardMapping.json'; // Ensure this path is correct
import cardData from './cardData.json'; // Ensure this path is correct
import Modal from 'react-modal';

// Static Data Mapping
const staticDataMapping = {
  1: { value1: 'J♠', value2: '10♣' },
  2: { value1: 'Q♠', value2: '8♦' },
  3: { value1: 'K♠', value2: 'K♠' },
  4: { value1: 'A♥', value2: '3♥' },
  5: { value1: '2♥', value2: 'A♣' },
  6: { value1: '3♥', value2: 'Q♣' },
  7: { value1: '4♥', value2: '10♠' },
  8: { value1: '5♥', value2: '4♣' },
  9: { value1: '6♥', value2: '3♦' },
  10: { value1: '7♥', value2: 'A♠' },
  11: { value1: '8♥', value2: '7♥' },
  12: { value1: '9♥', value2: '7♦' },
  13: { value1: '10♥', value2: '5♠' },
  14: { value1: 'J♥', value2: 'J♥' },
  15: { value1: 'Q♥', value2: '9♣' },
  16: { value1: 'K♥', value2: '9♠' },
  17: { value1: 'A♣', value2: '2♥' },
  18: { value1: '2♣', value2: 'K♥' },
  19: { value1: '3♣', value2: 'K♦' },
  20: { value1: '4♣', value2: '6♥' },
  21: { value1: '5♣', value2: '4♣' },
  22: { value1: '6♣', value2: '2♦' },
  23: { value1: '7♣', value2: 'J♠' },
  24: { value1: '8♣', value2: '8♣' },
  25: { value1: '9♣', value2: '6♦' },
  26: { value1: '10♣', value2: '4♠' },
  27: { value1: 'J♣', value2: '10♥' },
  28: { value1: 'Q♣', value2: '10♦' },
  29: { value1: 'K♣', value2: '8♠' },
  30: { value1: 'A♦', value2: 'A♥' },
  31: { value1: '2♦', value2: 'A♦' },
  32: { value1: '3♦', value2: 'Q♦' },
  33: { value1: '4♦', value2: '5♥' },
  34: { value1: '5♦', value2: '3♣' },
  35: { value1: '6♦', value2: '3♠' },
  36: { value1: '7♦', value2: '9♥' },
  37: { value1: '8♦', value2: '7♣' },
  38: { value1: '9♦', value2: '5♦' },
  39: { value1: '10♦', value2: 'Q♠' },
  40: { value1: 'J♦', value2: 'J♣' },
  41: { value1: 'Q♦', value2: '9♦' },
  42: { value1: 'K♦', value2: '7♠' },
  43: { value1: 'A♠', value2: '2♣' },
  44: { value1: '2♠', value2: 'K♣' },
  45: { value1: '3♠', value2: 'J♦' },
  46: { value1: '4♠', value2: '4♥' },
  47: { value1: '5♠', value2: '4♦' },
  48: { value1: '6♠', value2: '2♠' },
  49: { value1: '7♠', value2: '8♥' },
  50: { value1: '8♠', value2: '6♣' },
  51: { value1: '9♠', value2: '6♠' },
  52: { value1: '10♠', value2: 'Q♥' },
};


// Initial setup for Age 0 spread
const initialSpread = [
  [{ value: '', staticData: ['', '', ''] }, { value: '', staticData: ['', '', ''] }, { value: 'K♠', staticData: ['K♠', 'K♠', 3] }, { value: '8♦', staticData: ['Q♠', '8♦', 2] }, { value: '10♣', staticData: ['J♠', '10♣', 1] }, { value: '', staticData: ['', '', ''] }, { value: '', staticData: ['', '', ''] }, { value: '☉', staticData: ['', '', ''] }],
  [{ value: 'A♠', staticData: ['7♥', 'A♠', 10] }, { value: '3♦', staticData: ['6♥', '3♦', 9] }, { value: '5♣', staticData: ['5♥', '4♣', 8] }, { value: '10♠', staticData: ['4♥', '10♠', 7] }, { value: 'Q♣', staticData: ['3♥', 'Q♣', 6] }, { value: 'A♣', staticData: ['2♥', 'A♣', 5] }, { value: '3♥', staticData: ['A♥', '3♥', 4] }, { value: '☿', staticData: ['', '', ''] }],
  [{ value: '2♥', staticData: ['A♣', '2♥', 17] }, { value: '9♠', staticData: ['K♥', '9♠', 16] }, { value: '9♣', staticData: ['Q♥', '9♣', 15] }, { value: 'J♥', staticData: ['J♥', 'J♥', 14] }, { value: '5♠', staticData: ['10♥', '5♠', 13] }, { value: '7♦', staticData: ['9♥', '7♦', 12] }, { value: '7♥', staticData: ['8♥', '7♥', 11] }, { value: '♀', staticData: ['', '', ''] }],
  [{ value: '8♣', staticData: ['8♣', '8♣', 24] }, { value: 'J♠', staticData: ['7♣', 'J♠', 23] }, { value: '2♦', staticData: ['6♣', '2♦', 22] }, { value: '4♣', staticData: ['5♣', '4♣', 21] }, { value: '6♥', staticData: ['4♣', '6♥', 20] }, { value: 'K♦', staticData: ['3♣', 'K♦', 19] }, { value: 'K♥', staticData: ['2♣', 'K♥', 18] }, { value: '♂', staticData: ['', '', ''] }],
  [{ value: 'A♦', staticData: ['2♦', 'A♦', 31] }, { value: 'A♥', staticData: ['A♦', 'A♥', 30] }, { value: '8♠', staticData: ['K♣', '8♠', 29] }, { value: '10♦', staticData: ['Q♣', '10♦', 28] }, { value: '10♥', staticData: ['J♣', '10♥', 27] }, { value: '4♠', staticData: ['10♣', '4♠', 26] }, { value: '6♦', staticData: ['9♣', '6♦', 25] }, { value: '♃', staticData: ['', '', ''] }],
  [{ value: '5♦', staticData: ['9♦', '5♦', 38] }, { value: '7♣', staticData: ['8♦', '7♣', 37] }, { value: '9♥', staticData: ['7♦', '9♥', 36] }, { value: '3♠', staticData: ['6♦', '3♠', 35] }, { value: '3♣', staticData: ['5♦', '3♣', 34] }, { value: '5♥', staticData: ['4♦', '5♥', 33] }, { value: 'Q♦', staticData: ['3♦', 'Q♦', 32] }, { value: '♄', staticData: ['', '', ''] }],
  [{ value: 'J♦', staticData: ['3♠', 'J♦', 45] }, { value: 'K♣', staticData: ['2♠', 'K♣', 44] }, { value: '2♣', staticData: ['A♠', '2♣', 43] }, { value: '7♠', staticData: ['K♦', '7♠', 42] }, { value: '9♦', staticData: ['Q♦', '9♦', 41] }, { value: 'J♣', staticData: ['J♦', 'J♣', 40] }, { value: 'Q♠', staticData: ['10♦', 'Q♠', 39] }, { value: '♅', staticData: ['', '', ''] }],
  [{ value: 'Q♥', staticData: ['10♠', 'Q♥', 52] }, { value: '6♠', staticData: ['9♠', '6♠', 51] }, { value: '6♣', staticData: ['8♠', '6♣', 50] }, { value: '8♥', staticData: ['7♠', '8♥', 49] }, { value: '2♠', staticData: ['6♠', '2♠', 48] }, { value: '4♦', staticData: ['5♠', '4♦', 47] }, { value: '4♥', staticData: ['4♠', '4♥', 46] }, { value: '♆', staticData: ['', '', ''] }]
];

const lineOfSuccession = [
  'Q♠', '8♦', '7♣', 'J♠', '10♣', '4♠', '4♥', '10♠', 'Q♥', '9♣', '6♦', '3♠',
  'J♦', 'J♣', '10♥', '5♠', '4♦', '5♥', '5♣', '4♣', '6♥', '3♦', 'Q♦', '9♦',
  '5♦', '3♣', 'K♦', '7♠', '8♥', '7♥', 'A♠', '2♣', 'K♥', '9♠', '6♠', '2♠',
  'K♣', '8♠', '6♣', '2♦', 'A♦', 'A♥', '3♥', 'Q♣', '10♦'
];

const fixedCards = ['K♠', '8♣', 'J♥'];
const semiFixedPairs = [
  { value1: 'A♣', value2: '2♥' },
  { value1: '7♦', value2: '9♥' }
];

// Function to get the next card in the line of succession
const getNextCardInSuccession = (card) => {
  const index = lineOfSuccession.indexOf(card);
  if (index !== -1 && index < lineOfSuccession.length - 1) {
    return lineOfSuccession[index + 1];
  } else if (index === lineOfSuccession.length - 1) {
    return lineOfSuccession[0];
  }
  return card;
};

// Function to generate the next spread based on the current spread
const generateNextSpread = (currentSpread) => {
  const nextSpread = JSON.parse(JSON.stringify(currentSpread));

  // Handle semi-fixed cards
  semiFixedPairs.forEach(pair => {
    nextSpread.forEach(row => {
      row.forEach(card => {
        if (card.value === pair.value1) {
          card.value = pair.value2;
        } else if (card.value === pair.value2) {
          card.value = pair.value1;
        }
      });
    });
  });

  // Handle regular cards
  nextSpread.forEach(row => {
    row.forEach(card => {
      if (!fixedCards.includes(card.value) && !semiFixedPairs.some(pair => pair.value1 === card.value || pair.value2 === card.value)) {
        card.value = getNextCardInSuccession(card.value);
      }
    });
  });

  return nextSpread;
};

// Function to generate all spreads
const generateAllSpreads = () => {
  const spreads = [initialSpread];
  for (let i = 1; i < 90; i++) {
    spreads.push(generateNextSpread(spreads[i - 1]));
  }
  return spreads;
};

// Function to get the card for a given birthday
const getCardForBirthday = (birthday) => {
  const [year, month, day] = birthday.split('-');
  const birthDateString = `${parseInt(day)}-${new Date(year, month - 1).toLocaleString('default', { month: 'short' })}`;
  console.log('Formatted Birthday:', birthDateString); // Debugging log
  const entry = birthdayCardMapping.find(entry => entry.birthday === birthDateString);
  return entry ? entry.card : null;
};

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const findCardPositionInSpread = (card, spread) => {
  for (let rowIndex = 0; rowIndex < spread.length; rowIndex++) {
    for (let colIndex = 0; colIndex < spread[rowIndex].length; colIndex++) {
      if (spread[rowIndex][colIndex].value === card) {
        return { rowIndex, colIndex };
      }
    }
  }
  return null;
};


const isPlanetSymbol = (symbol) => {
  return /[☉☿♀♂♃♄♅♆]/.test(symbol);
};

const getCardColor = (card) => {
  if (card.includes('♥') || card.includes('♦')) {
    return 'red';
  } else if (card.includes('♠') || card.includes('♣')) {
    return 'black';
  }
  return 'black';
};

const App = () => {
  const [selectedPlate, setSelectedPlate] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCardData, setModalCardData] = useState(null);
  const spreads = generateAllSpreads();

  const handlePlateChange = (e) => {
    setSelectedPlate(Number(e.target.value));
  };

  const handleBirthdateChange = (e) => {
    const inputBirthdate = e.target.value;
    setBirthdate(inputBirthdate);
    const card = getCardForBirthday(inputBirthdate);
    if (card) {
      setHighlightedCards([card]);
    } else {
      setHighlightedCards([]);
    }
    const age = calculateAge(inputBirthdate);
    setSelectedPlate(age % 90); // Ensure age cycles back after 89
  };

  const handleCardClick = (card) => {
    setClickedCards((prevClickedCards) => {
      if (prevClickedCards.includes(card)) {
        const { rowIndex, colIndex } = findCardPositionInSpread(card, spreads[selectedPlate]);
        const staticDataPosition = spreads[selectedPlate][rowIndex][colIndex].staticData[2];
        const staticData = staticDataMapping[staticDataPosition];

        setModalCardData({
          value: card,
          staticData: staticData || { value1: '', value2: '' },
          ...cardData[card],
          displacingCard: cardData[staticData.value2],
          staticCard1: cardData[staticData.value1],
        });
        setModalIsOpen(true);
        return prevClickedCards.filter((clickedCard) => clickedCard !== card);
      } else {
        return [...prevClickedCards, card];
      }
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalCardData(null);
  };

  return (
    <div className="App">
      <h1>Planetary Table</h1>
      <label>
        Select Plate:
        <select onChange={handlePlateChange} value={selectedPlate}>
          {spreads.map((_, index) => (
            <option value={index} key={index}>
              Plate {index}
            </option>
          ))}
        </select>
      </label>
      <label>
        Enter Birthdate:
        <input type="date" value={birthdate} onChange={handleBirthdateChange} />
      </label>
      <table border="1">
        <tbody>
          {spreads[selectedPlate].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  onClick={() => handleCardClick(cell.value)}
                  style={{
                    border: '1px solid black',
                    padding: '10px',
                    textAlign: 'center',
                    color: isPlanetSymbol(cell.value) ? 'red' : getCardColor(cell.value),
                    backgroundColor: highlightedCards.includes(cell.value) || clickedCards.includes(cell.value) ? 'yellow' : 'white',
                    position: 'relative',
                  }}
                >
                  {cell.value !== 'x' ? (
                    <>
                      {cell.value}
                      {!isPlanetSymbol(cell.value) && (
                        <div className="static-data">
                          <div style={{ color: getCardColor(cell.staticData[0]) }}>{cell.staticData[0]}</div>
                          <div style={{ color: getCardColor(cell.staticData[1]) }}>{cell.staticData[1]}</div>
                        </div>
                      )}
                    </>
                  ) : (
                    cell.value
                  )}
                </td>
              ))}
            </tr>
          ))}
<tr>
            {['♆', '♅', '♄', '♃', '♂', '♀', '☿', ''].map((planet, index) => (
              <td
                key={index}
                style={{
                  border: '1px solid black',
                  padding: '10px',
                  textAlign: 'center',
                  color: 'red', // All planets are in red
                  position: 'relative'
                }}
              >
                {planet}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          maxWidth: '600px',
          margin: '0 auto',
        },
      }}
    >
      {modalCardData && (
        <div>
          <h2>{modalCardData.value}</h2>
          <p><strong>Keywords:</strong> {modalCardData.keywords}</p>
          <p><strong>Dates:</strong> {modalCardData.dates}</p>
          <h3>Displacing: {modalCardData.staticData.value2}</h3>
          {modalCardData.displacingCard && (
            <>
              <p><strong>Displacing Card Position:</strong> {modalCardData.displacingCard.position}</p>
              <p><strong>Displacing Keywords:</strong> {modalCardData.displacingCard.keywords}</p>
              <p><strong>Displacing Dates:</strong> {modalCardData.displacingCard.dates}</p>
            </>
          )}
             <h3>Static Card Position: {modalCardData.staticData.value1}</h3>
          {modalCardData.staticCard1 && (
            <>
              <p><strong>Static Card Position:</strong> {modalCardData.staticCard1.position}</p>
              <p><strong>Static Keywords:</strong> {modalCardData.staticCard1.keywords}</p>
              <p><strong>Static Dates:</strong> {modalCardData.staticCard1.dates}</p>
            </>
          )}
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </Modal>
    </div>
  );
};

export default App;
