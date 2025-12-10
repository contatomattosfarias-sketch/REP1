import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  MoreHorizontal,
  Search,
  Download
} from 'lucide-react';
import { clsx } from 'clsx';

// Dados Fakes para simular o Banco de Dados
const initialTransactions = [
  { id: 1, descricao: 'Honorários - Processo Silva', cliente: 'João Silva', data: '2023-12-10', valor: 5000, tipo: 'entrada', status: 'pago', categoria: 'Honorários' },
  { id: 2, descricao: 'Custas Iniciais - TJSP', cliente: 'Tech Solutions', data: '2023-12-09', valor: 450, tipo: 'saida', status: 'pago', categoria: 'Taxas Judiciais' },
  { id: 3, descricao: 'Consultoria Mensal', cliente: 'Padaria Central', data: '2023-12-15', valor: 1200, tipo: 'entrada', status: 'pendente', categoria: 'Recorrente' },
  { id: 4, descricao: 'Deslocamento Audiência', cliente: '-', data: '2023-12-08', valor: 120, tipo: 'saida', status: 'pago', categoria: 'Reembolso' },
  { id: 5, descricao: 'Honorários Finais', cliente: 'Maria Oliveira', data: '2023-12-20', valor: 8500, tipo: 'entrada', status: 'atrasado', categoria: 'Honorários' },
];

export default function Financeiro() {
  const [transacoes] = useState(initialTransactions);

  // Cálculos rápidos para os Cards
  const totalEntradas = transacoes
    .filter(t => t.tipo === 'entrada' && t.status === 'pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalSaidas = transacoes
    .filter(t => t.tipo === 'saida' && t.status === 'pago')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fluxo de Caixa</h1>
          <p className="text-slate-500">Gerencie honorários e despesas do escritório.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50">
            <Download size={18} />
            <span className="hidden md:inline">Exportar</span>
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm">
            <Plus size={18} />
            <span>Novo Lançamento</span>
          </button>
        </div>
      </div>

      {/* CARDS DE RESUMO (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardFinanceiro 
          titulo="Entradas (Mês)" 
          valor={totalEntradas} 
          tipo="entrada" 
          icon={ArrowUpCircle} 
        />
        <CardFinanceiro 
          titulo="Saídas (Mês)" 
          valor={totalSaidas} 
          tipo="saida" 
          icon={ArrowDownCircle} 
        />
        <CardFinanceiro 
          titulo="Saldo Líquido" 
          valor={saldo} 
          tipo="saldo" 
          icon={Wallet} 
        />
      </div>

      {/* ÁREA DA TABELA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Filtros e Busca */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por cliente ou descrição..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 text-slate-600 text-sm font-medium hover:text-blue-600">
            <Filter size={18} />
            Filtros Avançados
          </button>
        </div>

        {/* Tabela Responsiva */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transacoes.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{item.descricao}</p>
                    <p className="text-xs text-slate-400">{item.cliente}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className={clsx("px-6 py-4 font-medium whitespace-nowrap", 
                    item.tipo === 'entrada' ? 'text-emerald-600' : 'text-red-600'
                  )}>
                    {item.tipo === 'saida' ? '- ' : '+ '}
                    {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer da Tabela (Paginação Simples) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center md:justify-end text-xs text-slate-500">
          Mostrando 5 de 128 lançamentos
        </div>
      </div>
    </div>
  );
}

// --- Componentes Auxiliares ---

function CardFinanceiro({ titulo, valor, tipo, icon: Icon }) {
  const colors = {
    entrada: "text-emerald-600 bg-emerald-50 border-emerald-100",
    saida: "text-red-600 bg-red-50 border-red-100",
    saldo: "text-blue-600 bg-blue-50 border-blue-100",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium mb-1">{titulo}</p>
        <h3 className={clsx("text-2xl font-bold", 
          tipo === 'saida' ? 'text-red-600' : tipo === 'entrada' ? 'text-emerald-600' : 'text-slate-800'
        )}>
          {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h3>
      </div>
      <div className={clsx("p-3 rounded-lg border", colors[tipo])}>
        <Icon size={24} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pago: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pendente: "bg-amber-100 text-amber-700 border-amber-200",
    atrasado: "bg-red-100 text-red-700 border-red-200",
  };

  const labels = {
    pago: "Pago",
    pendente: "Pendente",
    atrasado: "Atrasado",
  };

  return (
    <span className={clsx("px-2 py-1 rounded-full text-xs font-semibold border", styles[status] || styles.pendente)}>
      {labels[status]}
    </span>
  );
}