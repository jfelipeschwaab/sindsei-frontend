import React from 'react';
import { Email } from '../app/types/types';

type EmailListProps = {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  emailsLidos: Set<string>;
  emailSelecionado: Email | null;
};

const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, emailsLidos, emailSelecionado }) => {
  return (
    <div className="flex-[3] p-4 border-r border-gray-200 overflow-y-auto">
      {emails.map(email => {
        const emailKey = `${email.subject}-${email.date}-${email.sender}`; // Gera uma chave única sem o id
        const isSelected = emailSelecionado && `${emailSelecionado.subject}-${emailSelecionado.date}-${emailSelecionado.sender}` === emailKey;

        return (
          <div
            key={emailKey}
            className={`flex justify-between items-center p-3 cursor-pointer 
                        ${emailsLidos.has(emailKey) ? 'bg-gray-50 text-gray-500' : 'text-gray-800'}
                        ${isSelected ? 'border-l-4 border-blue-400 bg-blue-50' : 'hover:bg-gray-100'}`}
            onClick={() => onSelectEmail(email)}
          >
            <span className={`font-semibold ${email.tag === 'reuniao' ? 'text-blue-500' : email.tag === 'campanha' ? 'text-red-500' : 'text-gray-900'}`}>
              {email.sender || 'Desconhecido'}
            </span>
            <span className="flex-1 ml-4 text-gray-700">{email.subject}</span>
            <span className="text-gray-500 text-sm">{new Date(email.date).toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
