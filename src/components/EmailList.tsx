import React from 'react';
import { Email } from '../app/types/types'



type EmailListProps = {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
};

const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail }) => {
  return (
    <div className="flex-2 p-4 border-r border-gray-300">
      {emails.map(email => (
        <div
          key={email.id}
          className="flex justify-between items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectEmail(email)}
        >
          <span className={`font-semibold ${email.tag === 'reuniao' ? 'text-blue-500' : email.tag === 'campanha' ? 'text-red-500' : 'text-gray-900'}`}>
            {email.sender}
          </span>
          <span className="flex-1 ml-4 text-gray-800">{email.subject}</span>
          <span className="text-gray-500">{email.time}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
