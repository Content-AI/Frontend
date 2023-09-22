import React, { useState, useEffect } from 'react';

function TextTypingAnimation({data}) {
    console.log(data)
  const textToType = data;
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 50; // Adjust typing speed in milliseconds

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setDisplayedText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);



  return (
      "{displayedText}"
  );
}

export default TextTypingAnimation;
