// src/app/home/page.tsx
'use client'
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import EmailList from '../../components/EmailList';
import EmailDetail from '../../components/EmailDetail';
import CategoryNav from '../../components/CategoryNav';
import Header from '../../components/Header';
import emailsData from '../../data/emailsData'; // Importe o arquivo de dados
import { Email } from '../types/types';

const HomePage: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para o termo de pesquisa

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedEmail(null); // Limpa a seleção de email ao mudar de categoria
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtra os emails com base na categoria e no termo de pesquisa
  const filteredEmails = emailsData
    .filter(email => selectedCategory === 'Todos' || email.tag === selectedCategory)
    .filter(email => email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     email.body.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Categoria */}
      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />

      {/* Conteúdo principal */}
      <div className="flex flex-1">
        <Sidebar />
        <EmailList emails={filteredEmails} onSelectEmail={handleSelectEmail} />
        <EmailDetail email={selectedEmail} />
      </div>
    </div>
  );
};

export default HomePage;
