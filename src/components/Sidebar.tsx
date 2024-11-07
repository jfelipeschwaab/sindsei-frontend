// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { FaStar, FaClock, FaCog } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="w-64 h-full p-4 bg-white border-r border-gray-200">
      <ul className="space-y-4">
        <li
          onClick={() => handleItemClick('Favoritos')}
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${
            selectedItem === 'Favoritos' ? 'bg-gray-200 text-gray-700' : 'text-gray-700'
          }`}
        >
          <FaStar className="h-5 w-5 text-gray-500" />
          <span>Favoritos</span>
        </li>
        <li
          onClick={() => handleItemClick('Calendário')}
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${
            selectedItem === 'Calendário' ? 'bg-gray-200 text-gray-700' : 'text-gray-700'
          }`}
        >
          <FaClock className="h-5 w-5 text-gray-500" />
          <span>Calendário</span>
        </li>
        <li
          onClick={() => handleItemClick('Configurações')}
          className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${
            selectedItem === 'Configurações' ? 'bg-gray-200 text-gray-700' : 'text-gray-700'
          }`}
        >
          <FaCog className="h-5 w-5 text-gray-500" />
          <span>Configurações</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
