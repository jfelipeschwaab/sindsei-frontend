'use client';

import React, { useEffect, useState } from 'react';
import CategoryNav from '../../components/CategoryNav';
import EmailDetail from '../../components/EmailDetail';
import EmailList from '../../components/EmailList';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Email } from '@/app/types/types';

const HomePage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [emailSelecionado, setEmailSelecionado] = useState<Email | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');
  const [termoPesquisa, setTermoPesquisa] = useState<string>(''); 
  const [emailsLidos, setEmailsLidos] = useState<Set<string>>(new Set());
  
  // URL da API (backend Django)
  const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  // -----------------------------
  // CARREGA OS EMAILS (SEM TOKEN)
  // -----------------------------
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`${URL_API}/api/emails/get-emails/`);

        if (!response.ok) {
          console.error('Erro ao buscar emails. Status:', response.status);
          return;
        }

        const data: Email[] = await response.json();
        console.log('Emails carregados:', data);
        setEmails(data);
      } catch (error) {
        console.error('Erro ao buscar emails:', error);
      }
    };

    fetchEmails();
  }, [URL_API]);

  // Seleciona email na lista
  const handleSelecionarEmail = (email: Email) => {
    setEmailSelecionado(email);
    const emailKey = `${email.subject}-${email.date}`;
    setEmailsLidos(prev => new Set(prev).add(emailKey));
  };

  // Troca de categoria (Financeiro, RH, Reuniões, etc.)
  const handleSelecionarCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setEmailSelecionado(null);
  };

  // Mudança do texto de pesquisa
  const handleMudancaPesquisa = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(event.target.value);
  };

  // Filtra emails pela categoria e pelo termo de pesquisa
  const emailsFiltrados = emails
    .filter(e => categoriaSelecionada === 'Todos' || e.tag === categoriaSelecionada)
    .filter(e =>
      e.subject.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      e.sender.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      e.summary.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm={termoPesquisa} onSearchChange={handleMudancaPesquisa} />

      <CategoryNav
        selectedCategory={categoriaSelecionada}
        onSelectCategory={handleSelecionarCategoria}
      />

      <div className="flex flex-1">
        <Sidebar />

        <EmailList
          emails={emailsFiltrados}
          onSelectEmail={handleSelecionarEmail}
          emailsLidos={emailsLidos}
          emailSelecionado={emailSelecionado}
        />

        <EmailDetail email={emailSelecionado} />
      </div>
    </div>
  );
};

export default HomePage;
