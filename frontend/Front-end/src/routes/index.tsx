import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';


export function AppRoutes() {
    const { user } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                {user ? (

                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </>
                ) : (

                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {}
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}