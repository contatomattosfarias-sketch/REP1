import React, { useState } from 'react';
import { useAuth } from '../context/authcontext';
import { 
  User, 
  Palette, 
  CreditCard, 
  Shield, 
  Save, 
  Upload,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function Configuracoes() {
  const { user, plano } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Simulação de Cores do Tema (White Label)
  const [primaryColor, setPrimaryColor] = useState('#2563eb'); // Azul padrão
  
  const isAdvanced = plano === 'avancado';

  const handleSave = () => {
    setLoading(true);
    // Simula salvamento no Supabase
    setTimeout(() => {
      setLoading(false);
      alert("Configurações salvas com sucesso!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500">Gerencie sua conta e personalize o sistema.</p>
      </div>

      {/* SEÇÃO 1: PERFIL PÚBLICO */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Perfil do Advogado</h2>
            <p className="text-sm text-slate-500">Suas informações pessoais e de contato.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nome Completo</label>
            <input 
              type="text" 
              defaultValue="Dr. Fernando Mattos" 
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">E-mail Profissional</label>
            <input 
              type="email" 
              defaultValue={user?.email} 
              disabled
              className="w-full p-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">OAB / Registro</label>
            <input 
              type="text" 
              defaultValue="RJ-123.456" 
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: WHITE LABEL (Feature Exclusiva) */}
      <section className={`bg-white p-6 rounded-xl border shadow-sm relative overflow-hidden ${isAdvanced ? 'border-slate-200' : 'border-slate-200 opacity-90'}`}>
        
        {/* Bloqueio Visual para Planos Básicos */}
        {!isAdvanced && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center text-center p-4">
            <Lock size={48} className="text-slate-400 mb-2" />
            <h3 className="text-lg font-bold text-slate-800">Recurso Premium</h3>
            <p className="text-slate-600 max-w-sm mb-4">Atualize para o plano Avançado para personalizar cores e logo do sistema com a sua marca.</p>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition">
              Fazer Upgrade Agora
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Palette size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-800">Identidade Visual</h2>
              {isAdvanced && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">PRO</span>}
            </div>
            <p className="text-sm text-slate-500">Personalize o sistema para seus clientes (White Label).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Logotipo do Escritório</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-400 transition cursor-pointer">
              <Upload size={32} className="mb-2" />
              <span className="text-sm">Clique para enviar (PNG/JPG)</span>
              <span className="text-xs text-slate-400 mt-1">Recomendado: 200x50px</span>
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cor Principal</label>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-12 w-12 p-1 rounded cursor-pointer border border-slate-300"
              />
              <div className="text-sm text-slate-500">
                Essa cor será aplicada na barra lateral, botões e destaques.
              </div>
            </div>
            
            {/* Preview Visual */}
            <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Preview do Botão</span>
              <button 
                className="px-4 py-2 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Botão Exemplo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PLANO */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <CreditCard size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Assinatura</h2>
            <p className="text-sm text-slate-500">Detalhes do seu plano atual.</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <p className="text-sm text-slate-500">Plano Atual</p>
            <p className="text-xl font-bold text-slate-800 capitalize flex items-center gap-2">
              {plano || 'Básico'} 
              <CheckCircle2 size={18} className="text-emerald-500" />
            </p>
          </div>
          {plano !== 'avancado' && (
            <button className="text-blue-600 font-medium text-sm hover:underline">
              Ver opções de upgrade
            </button>
          )}
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-50"
        >
          {loading ? 'Salvando...' : (
            <>
              <Save size={18} />
              Salvar Alterações
            </>
          )}
        </button>
      </div>

    </div>
  );
}