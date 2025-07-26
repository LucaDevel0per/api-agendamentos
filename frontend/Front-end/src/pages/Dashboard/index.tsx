
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getProviders } from '../../services/api'; 

interface Provider {
    id: number;
    name: string;
    email: string;
}

export function Dashboard() {
    const { user, signOut } = useAuth();

    const [providers, setProviders] = useState<Provider[]>([]);

    useEffect(() => {
        getProviders().then(data => {
            setProviders(data); 
        }).catch(err => {
            console.error("Erro ao buscar prestadores:", err);
        });
    }, []); 

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Bem-vindo(a), {user?.name}!</h2>
            <button onClick={signOut}>Sair</button>

            <hr />

            <h3>Profissionais Disponíveis</h3>
            <ul>
                {providers.map(provider => (
                    <li key={provider.id}>
                        {provider.name} ({provider.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}