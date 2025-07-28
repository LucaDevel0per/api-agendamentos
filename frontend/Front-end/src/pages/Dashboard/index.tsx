import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getProviders } from '../../services/api';

interface Provider {
    id: number;
    name: string;
    email: string;
    category: string | null;
}

export function Dashboard() {
    const { user, signOut } = useAuth();
    const [providers, setProviders] = useState<Provider[]>([]);
    
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    useEffect(() => {
        getProviders(activeFilter).then(data => {
            setProviders(data);
        }).catch(err => {
            console.error("Erro ao buscar prestadores:", err);
        });
    }, [activeFilter]);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Bem-vindo(a), {user?.name}!</h2>
            <button onClick={signOut}>Sair</button>

            <hr />

            <h3>Profissionais Disponíveis</h3>
            
            {/* 4. BOTÕES DE FILTRO */}
            <div>
                <button onClick={() => setActiveFilter(null)}>Todos</button>
                <button onClick={() => setActiveFilter('BARBEIRO')}>Barbeiros</button>
                <button onClick={() => setActiveFilter('CABELEIREIRO')}>Cabeleireiros</button>
                <button onClick={() => setActiveFilter('MANICURE')}>Manicures</button>
                <button onClick={() => setActiveFilter('TATUADOR')}>Tatuadores</button>
            </div>

            <ul>
                {providers.map(provider => (
                    <li key={provider.id}>
                        {provider.name} ({provider.category || 'Sem Categoria'})
                    </li>
                ))}
            </ul>
        </div>
    );
}