"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    username: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ( {
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(response.ok) {
                alert('Usuário cadastrado com sucesso!');
                setFormData({ username: '', email: '', password: ''});
            } else {
                alert('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário');
        }
    };

    return (
        <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nome de Usuário:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    )


}