import { createContext, useState, useContext } from "react";
import { api } from "../services/api";

interface AuthContextData {
    user: User | null;
    token: string | null;
    signIn(credentials: SignInCredentials): Promise<void>;
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

// Cria o contexto
const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

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

    return (
        <AuthContext.Provider value={{ user, token, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}