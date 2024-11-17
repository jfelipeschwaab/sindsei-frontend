'use client'
import React, { useEffect, useState } from 'react';
import CategoryNav from '../../components/CategoryNav';
import EmailDetail from '../../components/EmailDetail';
import EmailList from '../../components/EmailList';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Email } from '../types/types';

const HomePage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [emailSelecionado, setEmailSelecionado] = useState<Email | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');
  const [termoPesquisa, setTermoPesquisa] = useState<string>(''); 
  const [emailsLidos, setEmailsLidos] = useState<Set<string>>(new Set());
  
  const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`${URL_API}/api/emails/get-emails/`);
        const data = await response.json();
        setEmails(data); // Apenas armazena os emails uma vez
      } catch (error) {
        console.error('Erro ao buscar emails:', error);
      }
    };
    fetchEmails();
  }, []);

  const handleSelecionarEmail = (email: Email) => {
    setEmailSelecionado(email);
    const emailKey = `${email.subject}-${email.date}`;
    setEmailsLidos(prevEmailsLidos => new Set(prevEmailsLidos).add(emailKey));
  };

  const handleSelecionarCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setEmailSelecionado(null); // Limpa a seleção de email
  };

  const handleMudancaPesquisa = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(event.target.value);
  };

  const emailsFiltrados = emails
    .filter(email => categoriaSelecionada === 'Todos' || email.tag === categoriaSelecionada)
    .filter(email => 
      email.subject.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      email.sender.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      email.summary.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

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
