// components/SignInSignUp.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para redirecionamento

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const SignInSignUp: React.FC = () => {
  const router = useRouter(); // Define o hook de roteamento
  const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState<LoginFormData>({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isLogin: boolean) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao criar usuário:", errorData);
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      alert('User created successfully');
      console.log(data);
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao logar:", errorData);
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      alert('Logged in successfully');
      console.log(data);

      // Redireciona para a página inicial após login bem-sucedido
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('Failed to log in');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className={`relative w-[1200px] max-w-full min-h-[700px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-700 ease-in-out ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        
        {/* Container para Cadastro */}
        <div className={`absolute top-0 h-full w-1/2 p-20 transition-all duration-700 ease-in-out ${isRightPanelActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0'}`}>
          <form onSubmit={handleSignUp} className="bg-white flex flex-col items-center justify-center h-full text-center">
            <h1 className="font-bold text-3xl mb-10 text-black">Crie sua Conta</h1>
            <div className="flex gap-2 mb-2">
              {/* Social media links (placeholders) */}
            </div>
            {/* <span className="text-sm mb-4">ou</span> */}
            <input type="text" name="username" placeholder="Nome" className="w-full mb-5 p-3 bg-gray-100 rounded-md" onChange={(e) => handleInputChange(e, false)} />
            <input type="email" name="email" placeholder="Email" className="w-full mb-5 p-3 bg-gray-100 rounded-md" onChange={(e) => handleInputChange(e, false)} />
            <input type="password" name="password" placeholder="Senha" className="w-full mb-10 p-3 bg-gray-100 rounded-md" onChange={(e) => handleInputChange(e, false)} />
            <button className="bg-[#202020] text-white font-bold py-2 px-8 rounded-full uppercase text-sm">CADASTRE-SE</button>
          </form>
        </div>

        {/* Container para Login */}
        <div className={`absolute top-0 h-full w-1/2 p-20 transition-all duration-700 ease-in-out ${isRightPanelActive ? 'opacity-0' : 'translate-x-0 opacity-100 z-10'}`}>
          <form onSubmit={handleSignIn} className="bg-white flex flex-col items-center justify-center h-full text-center">
            <h1 className="font-bold text-3xl mb-10 text-black">Faça Login</h1>
            <div className="flex gap-2 mb-4">
              {/* Social media links (placeholders) */}
            </div>
            {/* <span className="text-sm mb-4">ou</span> */}
            <input type="email" name="email" placeholder="Email" className="w-full mb-5 p-3 bg-gray-100 rounded-md" onChange={(e) => handleInputChange(e, true)} />
            <input type="password" name="password" placeholder="Senha" className="w-full mb-10 p-3 bg-gray-100 rounded-md" onChange={(e) => handleInputChange(e, true)} />
            <a href="#" className="text-gray-500 mb-10">Esqueceu sua senha?</a>
            <button className="bg-[#202020] text-white font-bold py-2 px-8 rounded-full uppercase text-sm">LOGIN</button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#202020] text-white flex items-center justify-center overflow-hidden transition-transform duration-700 ${isRightPanelActive ? 'translate-x-[-100%]' : ''}`}>
          <div className="w-2/3 text-center">
            <h1 className="text-3xl font-bold mb-20">{isRightPanelActive ? 'Bem-Vindo de Volta!' : 'Comece Agora!'}</h1>
            <p className="mb-20">{isRightPanelActive ? 'Já tem uma conta no site? Faça login e permaneça conectado!' : 'Crie uma conta ou cadastre sua empresa no site!'}</p>
            <button onClick={() => setIsRightPanelActive(!isRightPanelActive)} className="bg-transparent border border-white py-2 px-8 rounded-full text-white uppercase text-sm font-bold">{isRightPanelActive ? 'LOGIN' : 'CADASTRE-SE'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
