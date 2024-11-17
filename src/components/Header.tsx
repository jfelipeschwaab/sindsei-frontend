// src/components/Header.tsx
import React from 'react';

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
      <img src="sindesei-png.png" alt="Sindesei DF Logo" className="h-20" width={200} />
      </div>

      <div className="flex-1 flex justify-center mx-8">
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={onSearchChange}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center space-x-4">
      </div>
    </header>
  );
};

export default Header;
