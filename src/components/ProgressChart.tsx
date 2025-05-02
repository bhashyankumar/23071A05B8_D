
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TestResult } from '../utils/typingUtils';

interface ProgressChartProps {
  results: TestResult[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ results }) => {
  // Exit early if no results
  if (!results.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-medium mb-2">No typing data yet</h3>
        <p className="text-muted-foreground">Complete a typing test to see your progress!</p>
      </div>
    );
  }

  // Format dates for x-axis
  const formattedData = results.map(result => ({
    ...result,
    formattedDate: new Date(result.date).toLocaleDateString(),
  })).reverse();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Progress Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 12 }} 
              tickCount={5}
            />
            <YAxis yAxisId="left" domain={[0, 'dataMax + 10']} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
              formatter={(value, name) => [value, name === 'wpm' ? 'WPM' : 'Accuracy (%)']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="wpm" 
              name="WPM" 
              stroke="#9b87f5" 
              fill="#E5DEFF" 
              activeDot={{ r: 8 }} 
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="accuracy" 
              name="Accuracy" 
              stroke="#7E69AB" 
              fill="#F1F0FB" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
