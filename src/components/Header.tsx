
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-primary">SpeedScribe</h1>
            <div className="h-6 w-1 bg-primary mx-2 animate-pulse"></div>
            <p className="text-sm text-gray-500">Improve your typing skills</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
