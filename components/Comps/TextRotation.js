import React, { useState, useEffect } from 'react';

const TextRotation = ({ words, period }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLetterIndex((prevIndex) => (prevIndex + 1) % words[currentWordIndex].length);
    }, period);

    return () => clearInterval(intervalId);
  }, [period, words, currentWordIndex]);

  useEffect(() => {
    if (currentLetterIndex === 0) {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  }, [currentLetterIndex, words]);

  return (
    <>
      {words[currentWordIndex].substring(0, currentLetterIndex + 1)}
      </>
  );
};

export default TextRotation;