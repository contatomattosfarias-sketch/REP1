import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authcontextuthContext';
import { Loader2 } from 'lucide-react';

// requiredPlan: nível mínimo exigido. 
// Hierarquia: null (qualquer um) < 'basico' < 'intermediario' < 'avancado'
const PLAN_LEVELS = { basico: 1, intermediario: 2, avancado: 3 };

export function ProtectedRoute({ children, requiredPlan }) {
  const { user, plano, loading } = useAuth();
  const location = useLocation();

  // 1. Estado de Carregamento (Loading Spinner bonito)
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  // 2. Não está logado? Manda pro Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Verificação de Plano (Feature Gating)
  if (requiredPlan) {
    const userLevel = PLAN_LEVELS[plano] || 0;
    const requiredLevel = PLAN_LEVELS[requiredPlan];

    if (userLevel < requiredLevel) {
      // Se tentar acessar o Financeiro com plano Básico, vai para página de Upgrade
      return <Navigate to="/planos" replace />;
    }
  }

  return children;
}