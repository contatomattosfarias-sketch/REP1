import React from 'react';
import { Calculator, Save, Download, RefreshCw } from 'lucide-react';

export default function Calculadora() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cálculos Jurídicos</h1>
          <p className="text-slate-500">Realize atualizações monetárias e salve o histórico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Área de Cálculo (Simulação) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calculator size={20} className="text-blue-600"/> Novo Cálculo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Cálculo</label>
              <select className="w-full p-2 border border-slate-300 rounded-lg bg-white">
                <option>Atualização Monetária (Cível)</option>
                <option>Trabalhista</option>
                <option>Previdenciário</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Inicial</label>
              <input type="date" className="w-full p-2 border border-slate-300 rounded-lg"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Valor Original (R$)</label>
              <input type="number" className="w-full p-2 border border-slate-300 rounded-lg" placeholder="0,00"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Índice</label>
              <select className="w-full p-2 border border-slate-300 rounded-lg bg-white">
                <option>IGP-M</option>
                <option>IPCA-E</option>
                <option>INPC</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-100">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
              Calcular
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <RefreshCw size={18}/>
            </button>
          </div>
        </div>

        {/* Histórico Recente */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Histórico Recente</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-700">Cálculo Cível #{i}02</p>
                  <p className="text-xs text-slate-400">10/12/2025 • R$ 12.500,00</p>
                </div>
                <button className="text-slate-400 hover:text-blue-600">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:underline">Ver todos</button>
        </div>
      </div>
    </div>
  );
}