
import React, { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Estado para o papel
    const [category, setCategory] = useState(''); // Estado para a categoria
    const navigate = useNavigate();

    async function handleRegister(event: React.FormEvent) {
        event.preventDefault();

        const data = {
            name,
            email,
            password,
            role,
            ...(role === 'PROVIDER' && { category }), // Adiciona a categoria apenas se o papel for PROVIDER
        };

        try {
            await api.post('/users', data);
            alert('Cadastro realizado com sucesso!');
            navigate('/'); // Navega para a página de login após o sucesso
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h1>Página de Cadastro</h1>

            {/* Campos de nome, email e senha (iguais ao login) */}
            <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />

            {/* Dropdown para escolher o tipo de conta */}
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="USER">Quero agendar um serviço</option>
                <option value="PROVIDER">Quero prestar um serviço</option>
            </select>

            {/* RENDERIZAÇÃO CONDICIONAL: Este bloco só aparece se o role for 'PROVIDER' */}
            {role === 'PROVIDER' && (
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Selecione sua área</option>
                    <option value="BARBEIRO">Barbeiro</option>
                    <option value="CABELEIREIRO">Cabeleireiro</option>
                    <option value="MANICURE">Manicure</option>
                    <option value="TATUADOR">Tatuador</option>
                </select>
            )}

            <button type="submit">Cadastrar</button>
        </form>
    );
}