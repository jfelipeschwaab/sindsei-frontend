// components/SignInSignUp.tsx
"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

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
  const router = useRouter(); 
  const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState<LoginFormData>({ email: '', password: '' });

  const URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


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
      const response = await fetch(`${URL_API}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao criar usuário:", errorData);
        await Swal.fire({
          title: 'Erro!',
          text: 'Falha ao criar usuário.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      
      await Swal.fire({
        title: 'Sucesso!',
        text: 'Usuário criado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      console.log(data);
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: 'Erro!',
        text: 'Falha ao criar usuário.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL_API}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao logar:", errorData);
        await Swal.fire({
          title: 'Erro!',
          text: 'Falha ao fazer login.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      
      await Swal.fire({
        title: 'Sucesso!',
        text: 'Logado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      console.log(data);

      router.push('/home');
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: 'Erro!',
        text: 'Falha ao fazer login.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className={`relative w-[1200px] max-w-full min-h-[700px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-700 ease-in-out ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        
        <div className={`absolute top-0 h-full w-1/2 p-20 transition-all duration-700 ease-in-out ${isRightPanelActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0'}`}>
          <form onSubmit={handleSignUp} className="bg-white flex flex-col items-center justify-center h-full text-center">
            <h1 className="font-bold text-3xl mb-10 text-black">Crie sua Conta</h1>
            <div className="flex gap-2 mb-2">
            </div>
            <input 
              type="text" 
              name="username" 
              placeholder="Nome" 
              className="w-full mb-5 p-3 bg-gray-100 rounded-md" 
              onChange={(e) => handleInputChange(e, false)} 
              required
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="w-full mb-5 p-3 bg-gray-100 rounded-md" 
              onChange={(e) => handleInputChange(e, false)} 
              required
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Senha" 
              className="w-full mb-10 p-3 bg-gray-100 rounded-md" 
              onChange={(e) => handleInputChange(e, false)} 
              required
            />
            <button 
              type="submit" 
              className="bg-[#202020] text-white font-bold py-2 px-8 rounded-full uppercase text-sm"
            >
              CADASTRE-SE
            </button>
          </form>
        </div>

        <div className={`absolute top-0 h-full w-1/2 p-20 transition-all duration-700 ease-in-out ${isRightPanelActive ? 'opacity-0' : 'translate-x-0 opacity-100 z-10'}`}>
          <form onSubmit={handleSignIn} className="bg-white flex flex-col items-center justify-center h-full text-center">
            <h1 className="font-bold text-3xl mb-10 text-black">Faça Login</h1>
            <div className="flex gap-2 mb-4">
            </div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="w-full mb-5 p-3 bg-gray-100 rounded-md" 
              onChange={(e) => handleInputChange(e, true)} 
              required
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Senha" 
              className="w-full mb-10 p-3 bg-gray-100 rounded-md" 
              onChange={(e) => handleInputChange(e, true)} 
              required
            />
            <a href="#" className="text-gray-500 mb-10">Esqueceu sua senha?</a>
            <button 
              type="submit" 
              className="bg-[#202020] text-white font-bold py-2 px-8 rounded-full uppercase text-sm"
            >
              LOGIN
            </button>
          </form>
        </div>

        <div className={`absolute top-0 left-1/2 h-full w-1/2 bg-[#202020] text-white flex items-center justify-center overflow-hidden transition-transform duration-700 ${isRightPanelActive ? 'translate-x-[-100%]' : ''}`}>
          <div className="w-2/3 text-center">
            <h1 className="text-3xl font-bold mb-20">{isRightPanelActive ? 'Bem-Vindo de Volta!' : 'Comece Agora!'}</h1>
            <p className="mb-20">{isRightPanelActive ? 'Já tem uma conta no site? Faça login e permaneça conectado!' : 'Crie uma conta ou cadastre sua empresa no site!'}</p>
            <button 
              onClick={() => setIsRightPanelActive(!isRightPanelActive)} 
              className="bg-transparent border border-white py-2 px-8 rounded-full text-white uppercase text-sm font-bold"
            >
              {isRightPanelActive ? 'LOGIN' : 'CADASTRE-SE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
