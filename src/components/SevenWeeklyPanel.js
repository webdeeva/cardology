import React, { useState } from 'react';
import { Box, Button, Text, VStack, CloseButton, Spinner } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import birthdayCardMapping from '../birthdayCardMapping.json';
import cardData from '../cards.json';
import cardDataWithDescriptions from '../cards.json'; // For descriptions

const getCardForBirthday = (birthday) => {
  const [year, month, day] = birthday.split('-');
  const birthDateString = `${parseInt(day)}-${new Date(year, month - 1).toLocaleString('default', { month: 'short' })}`;
  console.log('Formatted Birthday:', birthDateString); // Debugging log
  const entry = birthdayCardMapping.find(entry => entry.birthday === birthDateString);
  return entry ? entry.card : null;
};

const mapCardToFullName = (card) => {
  // Implement the logic to map card to full name
  return card; // Placeholder
};

const SevenWeeklyPanel = ({ isOpen, onClose, weeklyCards, cardData }) => {
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const generateReading = async (birthdate) => {
    if (!weeklyCards || !cardData || !birthdate) {
      console.error('weeklyCards, cardData, or birthdate is undefined');
      setReading('Error: Unable to generate reading due to missing data.');
      return;
    }
  
    setIsLoading(true);
    setReading('');
  
  
    // Map weekly cards to their full names and get their descriptions
    const cardInfo = weeklyCards.map(card => {
      const fullCardName = mapCardToFullName(card);
      const cardDetails = cardData.find(c => c.Card === fullCardName);
      if (!cardDetails) {
        console.warn(`No details found for card: ${fullCardName}`);
        return fullCardName;
      }
      return `${fullCardName}: ${cardDetails.Description}`;
    }).join('\n\n');
  
    const prompt = `Based on the following cards for a 7 week reading, provide an insightful and detailed interpretation for the 7 week cycle ahead:\n\n${cardInfo} each card has a label and should be used to give more insight to the interpretation - ( in the following order ) Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune( the obvious astrological influences)- then the remaining cards Pluto, Reward ( the gift for overcoming the challenges of the Pluto card), Peak ( the high point of the week), Moon ( astrological influence), Earth/X ( what we transform into over the course of the 7 weeks). Do not use "In the realm of"`;
    
    const API_URL = 'https://weeklyserver-tavoniaevans.replit.app/api';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      setReading(data.reading);
    } catch (error) {
      setReading(`Failed to generate reading. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <Box
      position="fixed"
      right={0}
      top={0}
      width="400px"
      height="100%"
      bg="white"
      boxShadow="-2px 0 10px rgba(0, 0, 0, 0.1)"
      p={4}
      overflowY="auto"
    >
      <CloseButton position="absolute" right={2} top={2} onClick={onClose} />
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">7 Week Reading</Text>
        <Button 
          colorScheme="red" 
          onClick={generateReading} // Removed hardcoded birthdate
          isLoading={isLoading}
          loadingText="Generating..."
        >
          Generate Reading
          </Button>
        {isLoading && <Spinner />}
        {reading && (
          <Box mt={4}>
            <ReactMarkdown>{reading}</ReactMarkdown>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SevenWeeklyPanel;
