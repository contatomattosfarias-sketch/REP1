import React from 'react';
import { UserCheck, MapPin, DollarSign, ExternalLink } from 'lucide-react';

export default function Correspondentes() {
  const parceiros = [
    { id: 1, nome: 'Dr. Roberto Almeida', cidade: 'São Paulo - SP', especialidade: 'Trabalhista', repasse: '30%', pendente: 1500, status: 'ativo' },
    { id: 2, nome: 'Dra. Carla Souza', cidade: 'Belo Horizonte - MG', especialidade: 'Cível', repasse: '20%', pendente: 0, status: 'ativo' },
    { id: 3, nome: 'Escritório Mendes & Associados', cidade: 'Brasília - DF', especialidade: 'Tribunais Superiores', repasse: 'Fixado', pendente: 5000, status: 'inativo' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Advogados Correspondentes</h1>
          <p className="text-slate-500">Gestão de parceiros e controle de repasses financeiros.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
          + Novo Parceiro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parceiros.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 transition">
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
                  <UserCheck size={24} />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {p.status.toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-1">{p.nome}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <MapPin size={14} /> {p.cidade}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Especialidade</span>
                  <span className="font-medium text-slate-700">{p.especialidade}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Regra de Repasse</span>
                  <span className="font-medium text-blue-600">{p.repasse}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase">A Repassar</span>
                <span className={`font-bold ${p.pendente > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                  R$ {p.pendente.toLocaleString('pt-BR')}
                </span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                <DollarSign size={16} />
                Gerenciar Pagamentos
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}