import React from 'react';
import { Email } from '../app/types/types';

type EmailDetailProps = {
  email: Email | null;
};

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  if (!email) {
    return <div className="flex-1 p-6 text-center text-gray-500">Selecione um email para visualizar</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-lg m-4">
      <div className="bg-white rounded-lg p-6 shadow-md">
        {/* Cabeçalho com o Avatar do Remetente */}
        <div className="flex items-center mb-4">
          <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold">
            {email.sender ? email.sender[0] : 'U'}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{email.sender || 'Remetente Desconhecido'}</h2>
            <p className="text-sm text-gray-500">{new Date(email.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Informações do Email (Data e Categoria) */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <p><strong>Data:</strong> {new Date(email.date).toLocaleDateString()}</p>
          <p><strong>Filtro:</strong> {email.tag}</p>
        </div>

        {/* Corpo do Email */}
        <div className="border-t border-gray-200 pt-4 text-gray-800 leading-relaxed">
          <p>{email.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
