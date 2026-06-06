import React, { useState, useEffect } from 'react';

const Typewriter = ({ words, typingSpeed = 100, deletingSpeed = 50, delay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => 
          isDeleting 
            ? activeWord.substring(0, prev.length - 1) 
            : activeWord.substring(0, prev.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="border-r-2 border-emerald-500 pr-1 animate-[pulse_1s_ease-in-out_infinite] text-emerald-400">
      {currentText}
    </span>
  );
};

export default Typewriter;
