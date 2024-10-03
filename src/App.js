import React, { useState } from 'react';
import './App.css';
import birthdayCardMapping from './birthdayCardMapping.json';
import cardData from './cardData.json';
import Modal from 'react-modal';
import { ChakraProvider, Box, Heading, Select, Input, Flex, VStack, Button } from '@chakra-ui/react';
import WeeklyReadingPanel from './components/WeeklyReadingPanel';
import SevenWeeklyPanel from './components/SevenWeeklyPanel';
import cardData2 from './cards.json';

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
  [{ value: 'A♠', staticData: ['7♥', 'A♠', 10] }, { value: '3♦', staticData: ['6♥', '3♦', 9] }, { value: '5♣', staticData: ['5♥', '5♣', 8] }, { value: '10♠', staticData: ['4♥', '10♠', 7] }, { value: 'Q♣', staticData: ['3♥', 'Q♣', 6] }, { value: 'A♣', staticData: ['2♥', 'A♣', 5] }, { value: '3♥', staticData: ['A♥', '3♥', 4] }, { value: '☿', staticData: ['', '', ''] }],
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

const findCardPosition = (card, spread) => {
  for (let row of spread) {
    for (let cell of row) {
      if (cell.value === card) {
        return parseInt(cell.staticData[2]);
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

const getNext12Positions = (startPosition) => {
  const positions = [];
  for (let i = 0; i < 12; i++) {
    positions.push(((startPosition + i) % 52) + 1);
  }
  return positions;
};

// Function to calculate planetary days based on birth day of the week
function calculatePlanetaryDays(birthDate) {
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  // Current date
  const today = new Date();
  
  // Get the day of the week on which the person was born (0 = Sunday, 6 = Saturday)
  const birthDayOfWeek = birthDate.getDay();
  
  // Get today’s day of the week
  const todayDayOfWeek = today.getDay();
  
  // Adjust Mercury day: Find the most recent Mercury day that aligns with the weekly spread's starting day
  let mercuryDay = new Date(today);

  // Adjust the starting day for Mercury (the birth day of the week)
  mercuryDay.setDate(today.getDate() - ((todayDayOfWeek - birthDayOfWeek + 7) % 7) + 1); // Added +1 to push the day forward

  const planetaryDays = [];

  // Loop through planets and assign days based on the Mercury day
  planets.forEach((planet, index) => {
    let planetDay = new Date(mercuryDay);
    planetDay.setDate(mercuryDay.getDate() + index); // Set the next planetary day
    planetaryDays.push({
      planet: planet,
      date: planetDay.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
    });
  });

  return planetaryDays;
}

const App = () => {
  const [selectedPlate, setSelectedPlate] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [highlightedPositions, setHighlightedPositions] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCardData, setModalCardData] = useState(null);
  const [weeklyPlanetCards, setWeeklyPlanetCards] = useState([]);
  const [weeklyPlanetDates, setWeeklyPlanetDates] = useState([]);
  const spreads = generateAllSpreads();
  const [planetaryDays, setPlanetaryDays] = useState([]);
  const [isWeeklyReadingPanelOpen, setIsWeeklyReadingPanelOpen] = useState(false); // Separate state for weekly reading panel
  const [isSevenWeeklyPanelOpen, setIsSevenWeeklyPanelOpen] = useState(false); // Separate state for 7 week reading panel
  const [selectedAction, setSelectedAction] = useState(''); // Added state for selected action
  const [displacingCard, setDisplacingCard] = useState(null); // Track displacing card


  const handlePlateChange = (e) => {
    const newPlate = Number(e.target.value);
    setSelectedPlate(newPlate);
    if (highlightedCards.length > 0) {
      const position = findCardPosition(highlightedCards[0], spreads[newPlate]);
      if (position) {
        setHighlightedPositions([position, ...getNext12Positions(position)]);
      }
    }
  };

  const handleBirthdateChange = (e) => {
    e.preventDefault();
    const inputBirthdate = e.target.value;
    setBirthdate(inputBirthdate);
    localStorage.setItem('birthdate', inputBirthdate); // Store birthdate in local storage
    const card = getCardForBirthday(inputBirthdate);
    if (card) {
      setHighlightedCards([card]);
      const age = calculateAge(inputBirthdate);
      const plate = age % 90;
      setSelectedPlate(plate);
      const position = findCardPosition(card, spreads[plate]);
      if (position) {
        setHighlightedPositions([position, ...getNext12Positions(position)]);
      }
    } else {
      setHighlightedCards([]);
      setHighlightedPositions([]);
    }
  };
  const resetToYearlySpread = () => {
    if (birthdate) {
      const card = getCardForBirthday(birthdate);
      if (card) {
        setHighlightedCards([card]);
        const age = calculateAge(birthdate);
        const plate = age % 90;
        setSelectedPlate(plate);
        const position = findCardPosition(card, spreads[plate]);
        if (position) {
          setHighlightedPositions([position, ...getNext12Positions(position)]);
        }
        // Reset weekly planet cards
        setWeeklyPlanetCards([]);
      } else {
        setHighlightedCards([]);
        setHighlightedPositions([]);
        setWeeklyPlanetCards([]);
      }
    }
  };
  
  const handleCardClick = (card) => {
    setClickedCards((prevClickedCards) => {
      if (prevClickedCards.includes(card)) {
        const { rowIndex, colIndex } = findCardPositionInSpread(card, spreads[selectedPlate]);
        const staticDataPosition = spreads[selectedPlate][rowIndex][colIndex].staticData[2];
        const staticData = staticDataMapping[staticDataPosition];
  
        const displacingCardValue = staticData.value2; // Get displacing card value
        setDisplacingCard(displacingCardValue); // Set the displacing card in state
  
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

  const handleWeeklyPlateClick = () => {
    if (birthdate) {
      const weeklyPlateNumber = calculateWeeklyNumber(birthdate);
      setSelectedPlate(weeklyPlateNumber);
      setClickedCards([]);

      const card = getCardForBirthday(birthdate);
      if (card) {
        setHighlightedCards([card]);
        const position = findCardPosition(card, spreads[weeklyPlateNumber]);
        if (position) {
          const next12Positions = getNext12Positions(position);
          setHighlightedPositions([position, ...next12Positions]);

          const planetCards = next12Positions.slice(0, 12).map(pos => {
            const foundCard = spreads[weeklyPlateNumber].flat().find(cell => parseInt(cell.staticData[2]) === pos);
            return foundCard ? foundCard.value : '';
          });
          setWeeklyPlanetCards(planetCards);

          const birthDateObj = new Date(birthdate);
          const calculatedPlanetaryDays = calculatePlanetaryDays(birthDateObj);
          setPlanetaryDays(calculatedPlanetaryDays);
        }
      } else {
        setHighlightedCards([]);
        setHighlightedPositions([]);
        setWeeklyPlanetCards([]);
        setWeeklyPlanetDates([]);
      }
    }
  };

  const calculateWeeklyNumber = (birthdate) => {
    const birth = new Date(birthdate);
    const now = new Date();
    const diff = now - birth;
    const days = diff / 1000 / 60 / 60 / 24;
    const weeks = days / 7;
    const A = weeks / 90;
    const B = A - Math.floor(A);
    const currentWeeklyNumber = parseInt(B * 90);
    return currentWeeklyNumber;
  };

  const handleSevenWeeklyPlateClick = () => {
    if (birthdate) {
      const weeklySevenPlateNumber = calculateSevenWeeklyNumber(birthdate);
      setSelectedPlate(weeklySevenPlateNumber);
      setClickedCards([]);
  
      const card = getCardForBirthday(birthdate);
      if (card) {
        setHighlightedCards([card]);
        const position = findCardPosition(card, spreads[weeklySevenPlateNumber]);
        if (position) {
          const next12Positions = getNext12Positions(position);
          setHighlightedPositions([position, ...getNext12Positions(position)]);
  
          // Get the cards for the 1st through 12th positions (7 Week Spread)
          const planetCards = next12Positions.slice(0, 12).map(pos => {
            const foundCard = spreads[weeklySevenPlateNumber].flat().find(cell => parseInt(cell.staticData[2]) === pos);
            return foundCard ? foundCard.value : '';
          });
          setWeeklyPlanetCards(planetCards);
  
          // Since you're not showing the planetary days anymore, we don't need to set dates.
          // If you wish to add planetary dates, you can do so here using the same logic as before.
        }
      } else {
        setHighlightedCards([]);
        setHighlightedPositions([]);
        setWeeklyPlanetCards([]);
      }
    }
  };
  

  const calculateSevenWeeklyNumber = (birthdate) => {
    const birth = new Date(birthdate);
    const now = new Date();
    const diff = now - birth;
    const days = diff / 1000 / 60 / 60 / 24;
    const cycle = days / 49;
    const A = cycle / 90;
    const B = A - Math.floor(A);
    const currentSevenWeeklyNumber = parseInt(B * 90);
    return currentSevenWeeklyNumber;
  };

  return (
    <ChakraProvider>
      <Box className="App" p={5}>
        <VStack spacing={4} align="stretch" mb={6} maxWidth="550px" margin="auto">
          <Heading as="h1" size="xl" textAlign="center">
            Planetary Table
          </Heading>
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" wrap="wrap" gap={4}>
            <Box flex="1">
              <Select onChange={handlePlateChange} value={selectedPlate}>
                {spreads.map((_, index) => (
                  <option value={index} key={index}>
                    Plate {index}
                  </option>
                ))}
              </Select>
            </Box>
            <Box flex="1">
              <Input
                type="date"
                value={birthdate}
                onChange={handleBirthdateChange}
                placeholder="Enter Birthdate"
              />
            </Box>
            <Box flex="1">
              <Select
                onChange={(e) => {
                  const action = e.target.value;
                  setSelectedAction(action); // Update selected action
                  if (action === "weekly") {
                    handleWeeklyPlateClick();
                  } else if (action === "sevenWeekly") {
                    handleSevenWeeklyPlateClick();
                  } else if (action === "resetYearly") {
                    resetToYearlySpread();
                  }
                }}
              >
                <option value="">Select an Action</option>
                <option value="weekly">Show Weekly Plate</option>
                <option value="sevenWeekly">Show 7 Weekly Plate</option>
                <option value="resetYearly">Reset to Yearly Spread</option>
              </Select>
            </Box>
          </Flex>
        </VStack>

        <table border="1">
          <tbody>
            {spreads[selectedPlate].map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={() => handleCardClick(cell.value)}
                    style={{
                      border: highlightedCards.includes(cell.value) || highlightedPositions.includes(parseInt(cell.staticData[2]))
                        ? '3px solid black'
                        : '1px solid black',
                      textAlign: 'center',
                      color: isPlanetSymbol(cell.value) ? 'red' : getCardColor(cell.value),
                      backgroundColor: highlightedCards.includes(cell.value)
                        ? 'yellow'
                        : highlightedPositions.includes(parseInt(cell.staticData[2]))
                        ? '#f2f2f2'
                        : clickedCards.includes(cell.value)
                        ? 'yellow'
                        : 'white',
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
                    textAlign: 'center',
                    fontWeight: 'bold',
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

        {weeklyPlanetCards.length > 0 && (
          <div className="weekly-planet-cards" style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>{selectedPlate === calculateSevenWeeklyNumber(birthdate) ? '7 Week Spread' : 'Weekly Planet Cards'}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px' }}>
              {weeklyPlanetCards.slice(0, 7).map((card, index) => (
                <div key={index} style={{ textAlign: 'center', width: '60px' }}>
                  <div style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginBottom: '2px',
                    backgroundColor: highlightedCards.includes(card) ? 'yellow' : 'white',
                    color: getCardColor(card)
                  }}>
                    {card}
                  </div>
                  <div style={{ fontSize: '0.8em' }}>{['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'][index]}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
              {weeklyPlanetCards.slice(7, 12).map((card, index) => (
                <div key={index} style={{ textAlign: 'center', width: '60px' }}>
                  <div style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginBottom: '2px',
                    backgroundColor: highlightedCards.includes(card) ? 'yellow' : 'white',
                    color: getCardColor(card)
                  }}>
                    {card}
                  </div>
                  <div style={{ fontSize: '0.8em' }}>{['Pluto', 'Reward', 'Peak', 'Moon', 'Earth/X'][index]}</div>
                </div>
              ))}
            </div>
            {selectedAction === "weekly" && (
              <Button 
                mt={4} 
                backgroundColor="rgb(229, 62, 62)" 
                color="white" 
                _hover={{ backgroundColor: "rgb(229, 62, 62)", opacity: 0.8 }}
                onClick={() => setIsWeeklyReadingPanelOpen(true)}
              >
                Get Weekly Reading
              </Button>
            )}
            {selectedAction === "sevenWeekly" && (
              <Button 
                mt={4} 
                backgroundColor="rgb(229, 62, 62)" 
                color="white" 
                _hover={{ backgroundColor: "rgb(229, 62, 62)", opacity: 0.8 }}
                onClick={() => setIsSevenWeeklyPanelOpen(true)}
              >
                Get 7 Week Reading
              </Button>
            )}
          </div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              maxWidth: '600px',
              height:'600px',
              margin: '0 auto',
            },
          }}
        >
          {modalCardData && (
            <div>
              <h2>{modalCardData.value}</h2>
              <p><strong>Keywords:</strong> {modalCardData.keywords}</p>
              <p><strong>Dates:</strong> {modalCardData.dates}</p>
              {modalCardData.staticData && (
                <>
                  <hr/>
                  <h3>Displacing: {modalCardData.displacingCard.staticData[1]}</h3>
                  {modalCardData.displacingCard && (
                    <>
                      <p><strong>Displacing Card Position:</strong> {modalCardData.displacingCard.position}</p>
                      <p><strong>Displacing Keywords:</strong> {modalCardData.displacingCard.keywords}</p>
                      <p><strong>Displacing Dates:</strong> {modalCardData.displacingCard.dates}</p>
                    </>
                  )}
                  <hr/>
                  <h3>Next Displacement Card: {modalCardData.displacingCard.staticData[0]}</h3>
                  {modalCardData.staticCard1 && (
                    <>
                      <p><strong>Static Keywords:</strong> {modalCardData.staticCard1.keywords}</p>
                      <p><strong>Static Dates:</strong> {modalCardData.staticCard1.dates}</p>
                    </>
                  )}
                </>
              )}
              <button onClick={closeModal}>Close</button>
            </div>
          )}
        </Modal>
        <WeeklyReadingPanel
  isOpen={isWeeklyReadingPanelOpen}
  onClose={() => setIsWeeklyReadingPanelOpen(false)}
  weeklyCards={weeklyPlanetCards}
  cardData={cardData2}
  displacingCard={displacingCard} // Pass displacing card as a prop
/>

        <SevenWeeklyPanel
          isOpen={isSevenWeeklyPanelOpen}
          onClose={() => setIsSevenWeeklyPanelOpen(false)}
          weeklyCards={weeklyPlanetCards}
          cardData={cardData2}
          displacingCard={displacingCard} // Pass displacing card as a prop
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
