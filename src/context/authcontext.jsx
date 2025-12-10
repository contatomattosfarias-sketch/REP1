import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase'; // Seu arquivo supabase.js
// Importamos apenas as funções de busca de dados do seu auth.js, 
// a lógica de redirect faremos aqui com React Router
import { checkUserPlan } from '../services/auth'; 

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plano, setPlano] = useState(null); // 'basico', 'intermediario', 'avancado'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Função para buscar sessão e plano inicial
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          // Reutilizamos sua lógica de checar plano
          const planoUsuario = await checkUserPlan(); 
          setPlano(planoUsuario);
        }
      } catch (error) {
        console.error("Erro na inicialização:", error);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // 2. Escuta mudanças em tempo real (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const p = await checkUserPlan();
        setPlano(p);
      } else {
        setUser(null);
        setPlano(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Funções de Ação (Login/Logout)
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, plano, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);