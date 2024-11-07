import React from 'react';

type EmailDetailProps = {
  email: {
    sender: string;
    subject: string;
    body: string;
    timestamp: string;
  } | null;
};

const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  if (!email) {
    return <div className="flex-3 p-6 text-center text-gray-500">Selecione um email para visualizar</div>;
  }

  return (
    <div className="flex-3 p-6">
      <h3 className="text-xl font-semibold mb-2">{email.subject}</h3>
      <p className="text-gray-600 mb-4"><strong>De:</strong> {email.sender}</p>
      <p className="text-gray-600 mb-6"><strong>Data:</strong> {email.timestamp}</p>
      <div className="text-gray-800">{email.body}</div>
    </div>
  );
};

export default EmailDetail;
