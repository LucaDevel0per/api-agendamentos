import React, { useState } from 'react'; 
import { useAuth } from '../../contexts/AuthContext';


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();   
    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        try {
            await signIn({ email, password });
            console.log('Sucesso no login!');

        } catch (err) {
            console.error('Erro no login:', err);
            alert('Falha no login, verifique suas credenciais.');
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>Página de Login</h1>

            <div>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>

            <div>
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
            </div>

            <button type="submit">Entrar</button>
        </form>
    );
}