
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import TypingTest from '@/components/TypingTest';
import ProgressChart from '@/components/ProgressChart';
import { getLatestResults } from '@/utils/typingUtils';

const Index = () => {
  const [results, setResults] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load results from local storage
  useEffect(() => {
    const latestResults = getLatestResults(10);
    setResults(latestResults);
  }, [refreshTrigger]);

  // Refresh results when a test is completed
  const handleTestComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-brand-softGray">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">Speed<span className="text-brand-purple">Scribe</span></h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Improve your typing speed and accuracy with our interactive typing tests.
              Track your progress and see your improvement over time.
            </p>
          </div>
          
          <Tabs defaultValue="test" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="test">Typing Test</TabsTrigger>
              <TabsTrigger value="progress">Your Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="test">
              <TypingTest onCompleteTest={handleTestComplete} />
            </TabsContent>
            
            <TabsContent value="progress">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Typing Progress</h2>
                <ProgressChart results={results} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
