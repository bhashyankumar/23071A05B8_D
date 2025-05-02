
export interface TestResult {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  time: number;
  level: string;
}

// Calculate words per minute (WPM)
export const calculateWPM = (
  typedChars: number,
  timeInSeconds: number
): number => {
  // Standard: 5 characters = 1 word
  const words = typedChars / 5;
  const minutes = timeInSeconds / 60;
  return Math.round(words / minutes);
};

// Calculate accuracy percentage
export const calculateAccuracy = (
  correctChars: number,
  totalChars: number
): number => {
  if (totalChars === 0) return 0;
  return Math.round((correctChars / totalChars) * 100);
};

// Save test result to local storage
export const saveResult = (result: TestResult): void => {
  const savedResults = getResults();
  savedResults.push(result);
  localStorage.setItem('typingResults', JSON.stringify(savedResults));
};

// Get all saved test results from local storage
export const getResults = (): TestResult[] => {
  const savedResults = localStorage.getItem('typingResults');
  return savedResults ? JSON.parse(savedResults) : [];
};

// Get the latest test results, limited by count
export const getLatestResults = (count: number = 10): TestResult[] => {
  const results = getResults();
  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
};
