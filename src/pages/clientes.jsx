import React, { useState } from 'react';
import { 
  Search, Plus, Phone, Mail, FileText, 
  MoreHorizontal, MapPin, DollarSign 
} from 'lucide-react';

// Dados Mockados
const initialClients = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(21) 99999-0000', status: 'ativo', processos: 2, pendencias: false },
  { id: 2, nome: 'Empresa Tech Ltda', email: 'contato@tech.com', telefone: '(11) 3333-4444', status: 'ativo', processos: 5, pendencias: true },
  { id: 3, nome: 'Maria Oliveira', email: 'maria@email.com', telefone: '(21) 98888-7777', status: 'inativo', processos: 0, pendencias: false },
];

export default function Clientes() {
  const [clientes] = useState(initialClients);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clientes (CRM)</h1>
          <p className="text-slate-500">Gestão de contatos, histórico e documentos.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} /> Novo Cliente
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, CPF ou e-mail..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                  {cliente.nome.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition">{cliente.nome}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cliente.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {cliente.status}
                  </span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-600">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="space-y-2 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-2">
                <Mail size={14} /> {cliente.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} /> {cliente.telefone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} /> Rio de Janeiro, RJ
              </div>
            </div>

            {/* Resumo Rápido */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <FileText size={14} className="text-blue-500" />
                  {cliente.processos} Processos
                </span>
                {cliente.pendencias && (
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    <DollarSign size={14} />
                    Pendente
                  </span>
                )}
              </div>
              <span className="text-blue-600 font-medium group-hover:underline">Ver Detalhes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}