
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTypingTest } from '../hooks/useTypingTest';
import TestResults from './TestResults';

interface TypingTestProps {
  onCompleteTest: () => void;
}

const TypingTest: React.FC<TypingTestProps> = ({ onCompleteTest }) => {
  const [level, setLevel] = React.useState<'easy' | 'medium' | 'hard'>('easy');
  const testContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    text,
    currentIndex,
    isStarted,
    isFinished,
    typedChars,
    wpm,
    accuracy,
    timer,
    startTest,
    resetTest,
    handleTyping,
  } = useTypingTest({ level });

  // Focus the test container when test starts
  useEffect(() => {
    if (isStarted && testContainerRef.current) {
      testContainerRef.current.focus();
    }
  }, [isStarted]);

  // Notify parent component when test is finished
  useEffect(() => {
    if (isFinished) {
      onCompleteTest();
    }
  }, [isFinished, onCompleteTest]);

  // Reset test when difficulty level changes
  useEffect(() => {
    resetTest();
  }, [level, resetTest]);

  // Render individual characters with current status
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      
      if (index === currentIndex) {
        className = 'current';
      } else if (index < currentIndex) {
        className = typedChars[index] === char ? 'correct' : 'incorrect';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="my-6">
      {!isFinished ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <p className="font-medium">Difficulty:</p>
              <Select 
                value={level} 
                onValueChange={(value) => setLevel(value as 'easy' | 'medium' | 'hard')}
                disabled={isStarted && !isFinished}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-4">
              <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                <span className="text-sm text-gray-500">WPM</span>
                <p className="font-bold text-brand-purple">{isStarted ? wpm : '-'}</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                <span className="text-sm text-gray-500">Accuracy</span>
                <p className="font-bold text-brand-purple">{isStarted ? `${accuracy}%` : '-'}</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-md shadow-sm">
                <span className="text-sm text-gray-500">Time</span>
                <p className="font-bold text-brand-purple">{timer}s</p>
              </div>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div
                ref={testContainerRef}
                className={`typing-text text-lg p-4 rounded-md mb-4 leading-relaxed bg-white focus:outline-none focus:ring-2 focus:ring-primary ${isStarted ? 'ring-2 ring-primary' : ''}`}
                tabIndex={0}
                onKeyDown={handleTyping}
              >
                {renderText()}
              </div>
              
              {!isStarted && (
                <div className="text-center">
                  <Button 
                    onClick={startTest}
                    className="bg-brand-purple hover:bg-brand-darkPurple text-white font-medium py-2 px-6"
                  >
                    Start Typing Test
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    Click the button or start typing to begin the test
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <TestResults 
          wpm={wpm}
          accuracy={accuracy}
          time={timer}
          onReset={resetTest}
        />
      )}
    </div>
  );
};

export default TypingTest;
