
import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomText } from '../utils/textData';
import { calculateWPM, calculateAccuracy, saveResult } from '../utils/typingUtils';

interface UseTypingTestProps {
  level: 'easy' | 'medium' | 'hard';
}

interface UseTypingTestReturn {
  text: string;
  currentIndex: number;
  isStarted: boolean;
  isFinished: boolean;
  typedChars: string[];
  correctChars: number;
  wpm: number;
  accuracy: number;
  timer: number;
  startTest: () => void;
  resetTest: () => void;
  handleTyping: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const useTypingTest = ({ level }: UseTypingTestProps): UseTypingTestReturn => {
  const [text, setText] = useState('');
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize text based on level
  useEffect(() => {
    const selectedText = getRandomText(level);
    setText(selectedText.text);
    resetTest();
  }, [level]);

  // Timer logic
  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    
    startTimeRef.current = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimer(elapsedTime);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Calculate WPM and accuracy in real-time
  useEffect(() => {
    if (isStarted && !isFinished && currentIndex > 0) {
      const wpm = calculateWPM(currentIndex, timer || 1);
      const accuracy = calculateAccuracy(correctChars, currentIndex);
      
      setWpm(wpm);
      setAccuracy(accuracy);
    }
  }, [timer, currentIndex, correctChars, isStarted, isFinished]);

  // Save result when test is finished
  useEffect(() => {
    if (isFinished && timer > 0) {
      const result = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        wpm,
        accuracy,
        time: timer,
        level,
      };
      
      saveResult(result);
    }
  }, [isFinished, wpm, accuracy, timer, level]);

  // Start the test
  const startTest = useCallback(() => {
    if (!isStarted && !isFinished) {
      setIsStarted(true);
      startTimer();
    }
  }, [isStarted, isFinished, startTimer]);

  // Reset the test
  const resetTest = useCallback(() => {
    stopTimer();
    setTypedChars([]);
    setCurrentIndex(0);
    setCorrectChars(0);
    setIsStarted(false);
    setIsFinished(false);
    setTimer(0);
    setWpm(0);
    setAccuracy(0);
    
    // Get a new random text
    const selectedText = getRandomText(level);
    setText(selectedText.text);
  }, [level, stopTimer]);

  // Handle typing
  const handleTyping = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isStarted) {
      startTest();
    }
    
    if (isFinished) return;
    
    // Only process if it's a single character key
    if (e.key.length === 1) {
      const char = e.key;
      const currentChar = text[currentIndex];
      
      // Update typed characters
      const newTypedChars = [...typedChars];
      newTypedChars[currentIndex] = char;
      setTypedChars(newTypedChars);
      
      // Check if typed character is correct
      if (char === currentChar) {
        setCorrectChars(prev => prev + 1);
      }
      
      // Move to next character
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      
      // Check if test is complete
      if (nextIndex >= text.length) {
        setIsFinished(true);
        stopTimer();
      }
    } else if (e.key === 'Backspace' && currentIndex > 0) {
      // Handle backspace
      const prevIndex = currentIndex - 1;
      const newTypedChars = [...typedChars];
      
      // Check if the character being removed was correct
      if (newTypedChars[prevIndex] === text[prevIndex]) {
        setCorrectChars(prev => prev - 1);
      }
      
      // Remove the character
      newTypedChars[prevIndex] = '';
      setTypedChars(newTypedChars);
      setCurrentIndex(prevIndex);
    }
  }, [isStarted, isFinished, text, currentIndex, typedChars, startTest, stopTimer]);

  return {
    text,
    currentIndex,
    isStarted,
    isFinished,
    typedChars,
    correctChars,
    wpm,
    accuracy,
    timer,
    startTest,
    resetTest,
    handleTyping,
  };
};
