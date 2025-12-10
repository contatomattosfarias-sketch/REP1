import React from 'react';
import { useAuth } from '../context/authcontext';
import { 
  Briefcase, 
  Scale, 
  Users, 
  AlertCircle, 
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Dados Fakes para visualização (depois conectamos com Supabase)
const dadosFinanceiros = [
  { nome: 'Jan', valor: 4000 },
  { nome: 'Fev', valor: 3000 },
  { nome: 'Mar', valor: 5500 },
  { nome: 'Abr', valor: 4800 },
  { nome: 'Mai', valor: 7000 },
  { nome: 'Jun', valor: 6500 },
];

const prazosUrgentes = [
  { id: 1, titulo: 'Contestação - Silva vs Banco X', data: 'Hoje', prioridade: 'alta' },
  { id: 2, titulo: 'Audiência Trabalhista', data: 'Amanhã', prioridade: 'media' },
  { id: 3, titulo: 'Reunião Novo Cliente', data: '12/12', prioridade: 'baixa' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cabeçalho da Página */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Olá, Dr(a). {user?.email?.split('@')[0]} 👋
          </h1>
          <p className="text-slate-500">Aqui está o resumo do seu escritório hoje.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
            + Novo Processo
          </button>
        </div>
      </div>

      {/* GRID DE CARDS (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardStat 
          titulo="Processos Ativos" 
          valor="124" 
          icon={Scale} 
          cor="text-blue-600" 
          bg="bg-blue-100" 
        />
        <CardStat 
          titulo="Prazos Hoje" 
          valor="3" 
          icon={AlertCircle} 
          cor="text-red-600" 
          bg="bg-red-100" 
        />
        <CardStat 
          titulo="Clientes Ativos" 
          valor="48" 
          icon={Users} 
          cor="text-emerald-600" 
          bg="bg-emerald-100" 
        />
        <CardStat 
          titulo="Faturamento (Mês)" 
          valor="R$ 12.450" 
          icon={Briefcase} 
          cor="text-purple-600" 
          bg="bg-purple-100" 
        />
      </div>

      {/* SEÇÃO INFERIOR (Gráfico + Lista) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Receita */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Receita Semestral</h3>
            <span className="text-xs text-green-600 flex items-center font-medium bg-green-50 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" /> +12% vs ano anterior
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosFinanceiros}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="nome" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lista de Prazos Próximos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-slate-400" />
            Próximos Prazos
          </h3>
          <div className="space-y-4">
            {prazosUrgentes.map((prazo) => (
              <div key={prazo.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                <div className={`mt-1 w-2 h-2 rounded-full ${prazo.prioridade === 'alta' ? 'bg-red-500' : 'bg-blue-400'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-700">{prazo.titulo}</p>
                  <span className="text-xs text-slate-400">{prazo.data}</span>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 text-xs text-blue-600 font-medium hover:underline text-center">
              Ver agenda completa
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Componente auxiliar para os Cards do topo
function CardStat({ titulo, valor, icon: Icon, cor, bg }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm text-slate-500 font-medium mb-1">{titulo}</p>
        <h3 className="text-2xl font-bold text-slate-800">{valor}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bg} ${cor}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}