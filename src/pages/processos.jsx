import React, { useState } from 'react';
import { 
  Scale, Clock, AlertTriangle, FileText, 
  ChevronRight, Calendar
} from 'lucide-react';

export default function Processos() {
  const [activeTab, setActiveTab] = useState('todos');

  const tabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'civel', label: 'Cível' },
    { id: 'trabalhista', label: 'Trabalhista' },
    { id: 'penal', label: 'Penal' },
    { id: 'tributario', label: 'Tributário' },
  ];

  const processos = [
    { id: '001', numero: '0001234-55.2024.8.19.0001', cliente: 'João Silva', area: 'civel', fase: 'Execução', prazo: '12/12/2024', status: 'andamento' },
    { id: '002', numero: '0054321-11.2023.5.01.0000', cliente: 'Maria Oliveira', area: 'trabalhista', fase: 'Audiência Inicial', prazo: 'Hoje', status: 'urgente' },
    { id: '003', numero: '0099888-22.2024.8.19.0000', cliente: 'Empresa Tech', area: 'tributario', fase: 'Aguardando Sentença', prazo: '20/01/2025', status: 'normal' },
  ];

  const filtered = activeTab === 'todos' 
    ? processos 
    : processos.filter(p => p.area === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestão de Processos</h1>
          <p className="text-slate-500">Acompanhamento processual por área e prazos.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
          + Novo Processo
        </button>
      </div>

      {/* Abas de Navegação (Áreas Jurídicas) */}
      <div className="border-b border-slate-200 flex gap-6 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de Processos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((proc) => (
            <div key={proc.id} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${proc.area === 'trabalhista' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                  <Scale size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    {proc.cliente}
                    <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {proc.area.toUpperCase()}
                    </span>
                  </h4>
                  <p className="text-sm text-slate-500 font-mono mt-1">{proc.numero}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><FileText size={12}/> Fase: {proc.fase}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1 flex items-center justify-end gap-1">
                    <Calendar size={12}/> Próximo Prazo
                  </p>
                  <span className={`text-sm font-bold px-2 py-1 rounded ${proc.status === 'urgente' ? 'bg-red-100 text-red-600' : 'text-slate-700'}`}>
                    {proc.prazo}
                  </span>
                </div>
                <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400">
                  <ChevronRight size={20} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}