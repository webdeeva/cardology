import React, { useState } from 'react';
import './App.css';
import birthdayCardMapping from './birthdayCardMapping.json'; // Ensure this path is correct

const initialSpread = [
  [{ value: '', staticData: ['', ''] }, { value: '', staticData: ['', ''] }, { value: 'K♠', staticData: ['K♠', 'K♠'] }, { value: '8♦', staticData: ['Q♠', '8♦'] }, { value: '10♣', staticData: ['J♠', '10♣'] }, { value: '', staticData: ['', ''] }, { value: '', staticData: ['', ''] }, { value: '☉', staticData: ['', ''] }],
  [{ value: 'A♠', staticData: ['7♥', 'A♠'] }, { value: '3♦', staticData: ['6♥', '3♦'] }, { value: '5♣', staticData: ['5♥', '4♣'] }, { value: '10♠', staticData: ['4♥', '10♠'] }, { value: 'Q♣', staticData: ['3♥', 'Q♣'] }, { value: 'A♣', staticData: ['2♥', 'A♣'] }, { value: '3♥', staticData: ['A♥', '3♥'] }, { value: '☿', staticData: ['', ''] }],
  [{ value: '2♥', staticData: ['A♣', '2♥'] }, { value: '9♠', staticData: ['K♥', '9♠'] }, { value: '9♣', staticData: ['Q♥', '9♣'] }, { value: 'J♥', staticData: ['J♥', 'J♥'] }, { value: '5♠', staticData: ['10♥', '5♠'] }, { value: '7♦', staticData: ['9♥', '7♦'] }, { value: '7♥', staticData: ['8♥', '7♥'] }, { value: '♀', staticData: ['', ''] }],
  [{ value: '8♣', staticData: ['8♣', '8♣'] }, { value: 'J♠', staticData: ['7♣', 'J♠'] }, { value: '2♦', staticData: ['6♣', '2♦'] }, { value: '4♣', staticData: ['5♣', '4♣'] }, { value: '6♥', staticData: ['4♣', '6♥'] }, { value: 'K♦', staticData: ['3♣', 'K♦'] }, { value: 'K♥', staticData: ['2♣', 'K♥'] }, { value: '♂', staticData: ['', ''] }],
  [{ value: 'A♦', staticData: ['2♦', 'A♦'] }, { value: 'A♥', staticData: ['A♦', 'A♥'] }, { value: '8♠', staticData: ['K♣', '8♠'] }, { value: '10♦', staticData: ['Q♣', '10♦'] }, { value: '10♥', staticData: ['J♣', '10♥'] }, { value: '4♠', staticData: ['10♣', '4♠'] }, { value: '6♦', staticData: ['9♣', '6♦'] }, { value: '♃', staticData: ['', ''] }],
  [{ value: '5♦', staticData: ['9♦', '5♦'] }, { value: '7♣', staticData: ['8♦', '7♣'] }, { value: '9♥', staticData: ['7♦', '9♥'] }, { value: '3♠', staticData: ['6♦', '3♠'] }, { value: '3♣', staticData: ['5♦', '3♣'] }, { value: '5♥', staticData: ['4♦', '5♥'] }, { value: 'Q♦', staticData: ['3♦', 'Q♦'] }, { value: '♄', staticData: ['', ''] }],
  [{ value: 'J♦', staticData: ['3♠', 'J♦'] }, { value: 'K♣', staticData: ['2♠', 'K♣'] }, { value: '2♣', staticData: ['A♠', '2♣'] }, { value: '7♠', staticData: ['K♦', '7♠'] }, { value: '9♦', staticData: ['Q♦', '9♦'] }, { value: 'J♣', staticData: ['J♦', 'J♣'] }, { value: 'Q♠', staticData: ['10♦', 'Q♠'] }, { value: '♅', staticData: ['', ''] }],
  [{ value: 'Q♥', staticData: ['10♠', 'Q♥'] }, { value: '6♠', staticData: ['9♠', '6♠'] }, { value: '6♣', staticData: ['8♠', '6♣'] }, { value: '8♥', staticData: ['7♠', '8♥'] }, { value: '2♠', staticData: ['6♠', '2♠'] }, { value: '4♦', staticData: ['5♠', '4♦'] }, { value: '4♥', staticData: ['4♠', '4♥'] }, { value: '♆', staticData: ['', ''] }]
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

const getNextCardInSuccession = (card) => {
  const index = lineOfSuccession.indexOf(card);
  if (index !== -1 && index < lineOfSuccession.length - 1) {
    return lineOfSuccession[index + 1];
  } else if (index === lineOfSuccession.length - 1) {
    return lineOfSuccession[0];
  }
  return card;
};

const generateNextSpread = (currentSpread) => {
  const nextSpread = JSON.parse(JSON.stringify(currentSpread));

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

  nextSpread.forEach(row => {
    row.forEach(card => {
      if (!fixedCards.includes(card.value) && !semiFixedPairs.some(pair => pair.value1 === card.value || pair.value2 === card.value)) {
        card.value = getNextCardInSuccession(card.value);
      }
    });
  });

  return nextSpread;
};

const generateAllSpreads = () => {
  const spreads = [initialSpread];
  for (let i = 1; i < 90; i++) {
    spreads.push(generateNextSpread(spreads[i - 1]));
  }
  return spreads;
};

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

const Modal = ({ isVisible, onClose, content }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        {content && (
          <div>
            <h2>{content.card}</h2>
            <p><strong>Keywords:</strong> {content.keywords}</p>
            <p><strong>Dates:</strong> {content.dates}</p>
            <p><strong>Static Card Position:</strong> {content.staticPosition}</p>
            <p><strong>Static Keywords:</strong> {content.staticKeywords}</p>
            <p><strong>Static Dates:</strong> {content.staticDates}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [selectedPlate, setSelectedPlate] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const spreads = generateAllSpreads();

  const handlePlateChange = (e) => {
    setSelectedPlate(Number(e.target.value));
  };

  const handleBirthdateChange = (e) => {
    const inputBirthdate = e.target.value;
    setBirthdate(inputBirthdate);
    const card = getCardForBirthday(inputBirthdate);
    console.log('Birthday card:', card); // Debugging log
    if (card) {
      setHighlightedCards([card]);
    } else {
      setHighlightedCards([]);
    }
    const age = calculateAge(inputBirthdate);
    console.log('Age:', age); // Debugging log
    setSelectedPlate(age % 90); // Ensure age cycles back after 89
  };

  const handleCardClick = (card) => {
    if (clickedCards.includes(card)) {
      handleCardDoubleClick(card);
    } else {
      setClickedCards(prevClickedCards => {
        if (prevClickedCards.includes(card)) {
          return prevClickedCards.filter(clickedCard => clickedCard !== card);
        } else {
          return [...prevClickedCards, card];
        }
      });
    }
  };

  const handleCardDoubleClick = (card) => {
    // Mock data for the modal content. Replace with actual data fetching logic.
    const content = {
      card: card,
      keywords: 'Example keywords for ' + card,
      dates: 'Example dates for ' + card,
      staticPosition: 'Example position for ' + card,
      staticKeywords: 'Example static keywords for ' + card,
      staticDates: 'Example static dates for ' + card,
    };

    setModalContent(content);
    setModalVisible(true);
  };

  const getCardColor = (card) => {
    if (card.includes('♥') || card.includes('♦')) {
      return 'red';
    } else if (card.includes('♠') || card.includes('♣')) {
      return 'black';
    }
    return 'black';
  };

  const isPlanetSymbol = (symbol) => {
    return /[☉☿♀♂♃♄♅♆]/.test(symbol);
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
          {spreads[selectedPlate]?.map((row, rowIndex) => (
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
                    position: 'relative'
                  }}
                >
                  {cell.value !== 'x' ? (
                    <>
                      {cell.value}
                      {!isPlanetSymbol(cell.value) && (rowIndex !== spreads[selectedPlate].length - 1 || cellIndex !== row.length - 1) && (
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
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        content={modalContent}
      />
    </div>
  );
};

export default App;
