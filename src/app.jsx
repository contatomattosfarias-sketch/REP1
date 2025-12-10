import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { ProtectedRoute } from './components/layout/protectedroute'; 
import Layout from './components/layout/layout';

// TODAS AS PÁGINAS DO SISTEMA
import Dashboard from './pages/dashboard'; 
import Kanban from './pages/kanban';
import Financeiro from './pages/financeiro'; 
import Configuracoes from './pages/configuracoes';
import Login from './pages/login'; 
import Clientes from './pages/clientes';
import Processos from './pages/processos';
import Calculadora from './pages/calculadora';
import Documentos from './pages/documentos';         // <--- NOVO
import Correspondentes from './pages/correspondentes'; // <--- NOVO

const Upgrade = () => <div className="h-screen flex items-center justify-center bg-slate-100"><h1>Upgrade Necessário</h1></div>;

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/planos" element={<Upgrade />} />

          <Route element={<Layout />}>
            
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* OPERACIONAL (Intermediário+) */}
            <Route path="/clientes" element={<ProtectedRoute requiredPlan="intermediario"><Clientes /></ProtectedRoute>} />
            <Route path="/processos" element={<ProtectedRoute requiredPlan="intermediario"><Processos /></ProtectedRoute>} />
            <Route path="/financeiro" element={<ProtectedRoute requiredPlan="intermediario"><Financeiro /></ProtectedRoute>} />
            <Route path="/kanban" element={<ProtectedRoute requiredPlan="intermediario"><Kanban /></ProtectedRoute>} />
            
            {/* FERRAMENTAS (Algumas Básico, outras Intermediário) */}
            <Route path="/calculadora" element={<ProtectedRoute requiredPlan="basico"><Calculadora /></ProtectedRoute>} />
            <Route path="/documentos" element={<ProtectedRoute requiredPlan="intermediario"><Documentos /></ProtectedRoute>} />
            <Route path="/correspondentes" element={<ProtectedRoute requiredPlan="intermediario"><Correspondentes /></ProtectedRoute>} />
            
            {/* GESTÃO (Avançado) */}
            <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />

          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}