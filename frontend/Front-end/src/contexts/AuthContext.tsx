import { createContext, useState, useContext } from "react";
import { api } from "../services/api";

interface AuthContextData {
    user: User | null;
    token: string | null;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const storagedUser = localStorage.getItem('@Agendamentos:user');
        return storagedUser ? JSON.parse(storagedUser) : null;
    });
    const [token, setToken] = useState<string | null>(() => {
        const storagedToken = localStorage.getItem('@Agendamentos:token');

        if (storagedToken) {
            api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        }

        return storagedToken;
    });

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', { email, password });

            const { user: userData, token: userToken } = response.data;

            setUser(userData);
            setToken(userToken);

            localStorage.setItem('@Agendamentos:token', userToken);
            localStorage.setItem('@Agendamentos:user', JSON.stringify(userData));

            api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

        } catch (err) {
            throw new Error("Credenciais inválidas");
        }
    }

    function signOut() {
        setUser(null);
        setToken(null);

        localStorage.removeItem('@Agendamentos:token');
    }

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}