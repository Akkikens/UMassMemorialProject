import { useState, useEffect } from 'react';

const useTypingEffect = (text: string, typingSpeed: number = 150): string => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev: string) => prev + text.charAt(index));
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [text, typingSpeed]);

  return displayedText;
};

export default useTypingEffect;