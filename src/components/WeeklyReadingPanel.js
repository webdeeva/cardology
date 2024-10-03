import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, CloseButton, Spinner } from '@chakra-ui/react';

const WeeklyReadingPanel = ({ isOpen, onClose, weeklyCards, cardData }) => {
  const [reading, setReading] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('weeklyCards:', weeklyCards);
    console.log('cardData:', cardData);
  }, [weeklyCards, cardData]);

  const mapCardToFullName = (card) => {
    const ranks = {
      'A': 'Ace', 'K': 'King', 'Q': 'Queen', 'J': 'Jack',
      '10': 'Ten', '9': 'Nine', '8': 'Eight', '7': 'Seven',
      '6': 'Six', '5': 'Five', '4': 'Four', '3': 'Three', '2': 'Two'
    };
    const suits = {
      '♠': 'Spades', '♥': 'Hearts', '♦': 'Diamonds', '♣': 'Clubs'
    };
    
    const rank = card.slice(0, -1);
    const suit = card.slice(-1);
    
    return `${ranks[rank]} of ${suits[suit]}`;
  };

  const generateReading = async () => {
    if (!weeklyCards || !cardData) {
      console.error('weeklyCards or cardData is undefined');
      setReading('Error: Unable to generate reading due to missing data.');
      return;
    }

    setIsLoading(true);
    setReading('');

    const cardInfo = weeklyCards.map(card => {
      const fullCardName = mapCardToFullName(card);
      const cardDetails = cardData.find(c => c.Card === fullCardName);
      if (!cardDetails) {
        console.warn(`No details found for card: ${fullCardName}`);
        return fullCardName;
      }
      return `${fullCardName}: ${cardDetails.Description}`;
    }).join('\n\n');

    const prompt = `Based on the following cards for a weekly reading, provide an insightful and detailed interpretation for the week ahead:\n\n${cardInfo}`;

    try {
      console.log('Sending prompt:', prompt);
      const response = await fetch('/api/generate-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response not OK:', response.status, errorText);
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('API response:', data);
      setReading(data.reading);
    } catch (error) {
      console.error('Error generating reading:', error);
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
        <Text fontSize="xl" fontWeight="bold">Weekly Reading</Text>
        <Button 
          colorScheme="blue" 
          onClick={generateReading} 
          isLoading={isLoading}
          loadingText="Generating..."
        >
          Generate Reading
        </Button>
        {isLoading && <Spinner />}
        {reading && (
          <Box mt={4}>
            <Text whiteSpace="pre-wrap">{reading}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default WeeklyReadingPanel;