'use client'
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import EmailList from '../../components/EmailList';
import EmailDetail from '../../components/EmailDetail';
import CategoryNav from '../../components/CategoryNav';
import Header from '../../components/Header';
import emailsData from '../../data/emailsData'; 
import { Email } from '../types/types';

const HomePage: React.FC = () => {
  const [emailSelecionado, setEmailSelecionado] = useState<Email | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');
  const [termoPesquisa, setTermoPesquisa] = useState<string>(''); 
  const [emailsLidos, setEmailsLidos] = useState<Set<string>>(new Set()); 

  const handleSelecionarEmail = (email: Email) => {
    setEmailSelecionado(email);
    setEmailsLidos(prevEmailsLidos => new Set(prevEmailsLidos).add(email.id.toString())); 
  };

  const handleSelecionarCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setEmailSelecionado(null); 
  };

  const handleMudancaPesquisa = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(event.target.value);
  };

  const emailsFiltrados = emailsData
    .filter(email => categoriaSelecionada === 'Todos' || email.tag === categoriaSelecionada)
    .filter(email => email.subject.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                     email.sender.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                     email.body.toLowerCase().includes(termoPesquisa.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm={termoPesquisa} onSearchChange={handleMudancaPesquisa} />
      <CategoryNav selectedCategory={categoriaSelecionada} onSelectCategory={handleSelecionarCategoria} />
      <div className="flex flex-1">
        <Sidebar />
        <EmailList emails={emailsFiltrados} onSelectEmail={handleSelecionarEmail} emailsLidos={emailsLidos} emailSelecionado={emailSelecionado} />
        <EmailDetail email={emailSelecionado} />
      </div>
    </div>
  );
};

export default HomePage;
