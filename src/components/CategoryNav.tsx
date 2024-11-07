// src/components/CategoryNav.tsx
import React from 'react';
import { FaUsers, FaGavel, FaHandshake, FaCalendarAlt, FaBullhorn, FaUserTie, FaMoneyBillWave, FaBoxOpen } from 'react-icons/fa';

type CategoryNavProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const categories = [
  { name: 'Todos', icon: FaUsers, color: 'text-gray-600' },
  { name: 'Jurídicas', icon: FaGavel, color: 'text-blue-600' },
  { name: 'Contratos', icon: FaHandshake, color: 'text-green-600' },
  { name: 'Reuniões', icon: FaCalendarAlt, color: 'text-yellow-600' },
  { name: 'Marketing', icon: FaBullhorn, color: 'text-purple-600' },
  { name: 'RH', icon: FaUserTie, color: 'text-red-600' },
  { name: 'Financeiro', icon: FaMoneyBillWave, color: 'text-teal-600' },
  { name: 'Outros', icon: FaBoxOpen, color: 'text-gray-600' },
];

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-white shadow p-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.name}
            className={`flex items-center text-sm font-medium ${category.color} ${
              selectedCategory === category.name ? 'underline' : ''
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <IconComponent className="h-5 w-5 mr-1" />
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryNav;
