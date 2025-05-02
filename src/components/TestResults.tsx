
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, CheckCircle } from 'lucide-react';

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  time: number;
  onReset: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({ wpm, accuracy, time, onReset }) => {
  // Format time as minutes:seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Get rating based on WPM
  const getRating = (wpm: number): string => {
    if (wpm < 30) return 'Beginner';
    if (wpm < 50) return 'Average';
    if (wpm < 70) return 'Good';
    if (wpm < 90) return 'Fast';
    return 'Professional';
  };

  return (
    <div className="my-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-brand-lightPurple p-3 rounded-full mb-3">
                <TrendingUp className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-lg font-medium mb-1">Speed</h3>
              <p className="text-3xl font-bold text-brand-purple">{wpm} WPM</p>
              <p className="text-sm text-muted-foreground">{getRating(wpm)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-brand-lightPurple p-3 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-lg font-medium mb-1">Accuracy</h3>
              <p className="text-3xl font-bold text-brand-purple">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">
                {accuracy >= 98 ? 'Excellent' : accuracy >= 95 ? 'Great' : accuracy >= 90 ? 'Good' : 'Needs improvement'}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="bg-brand-lightPurple p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-lg font-medium mb-1">Time</h3>
              <p className="text-3xl font-bold text-brand-purple">{formatTime(time)}</p>
              <p className="text-sm text-muted-foreground">minutes:seconds</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center">
        <Button 
          onClick={onReset}
          className="bg-brand-purple hover:bg-brand-darkPurple text-white font-medium py-2 px-6"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default TestResults;
