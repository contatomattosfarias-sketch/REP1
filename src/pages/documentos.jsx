import React, { useState } from 'react';
import { FileText, Download, Printer, Copy, Search, Wand2 } from 'lucide-react';

export default function Documentos() {
  const [selectedTemplate, setSelectedTemplate] = useState('procuracao');

  const templates = [
    { id: 'procuracao', nome: 'Procuração Ad Judicia', tipo: 'Processual' },
    { id: 'honorarios', nome: 'Contrato de Honorários', tipo: 'Contratos' },
    { id: 'hipossuficiencia', nome: 'Declaração de Hipossuficiência', tipo: 'Declarações' },
    { id: 'substabelecimento', nome: 'Substabelecimento', tipo: 'Processual' },
  ];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Automação de Documentos</h1>
          <p className="text-slate-500">Gere peças e contratos automaticamente usando modelos.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* COLUNA 1: Seleção de Modelos */}
        <div className="w-full lg:w-1/4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar modelo..." 
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {templates.map((temp) => (
              <button
                key={temp.id}
                onClick={() => setSelectedTemplate(temp.id)}
                className={`w-full text-left p-3 rounded-lg text-sm transition border ${
                  selectedTemplate === temp.id 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                    : 'hover:bg-slate-50 border-transparent text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  {temp.nome}
                </div>
                <span className="text-xs text-slate-400 ml-6">{temp.tipo}</span>
              </button>
            ))}
          </div>
        </div>

        {/* COLUNA 2: Formulário de Preenchimento */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-y-auto">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Wand2 size={18} className="text-purple-600"/> Variáveis
          </h3>
          <form className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Cliente</label>
              <input type="text" className="w-full mt-1 p-2 border border-slate-300 rounded-lg text-sm" placeholder="Nome completo" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Nacionalidade</label>
              <input type="text" className="w-full mt-1 p-2 border border-slate-300 rounded-lg text-sm" placeholder="Brasileiro(a)" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Estado Civil</label>
              <select className="w-full mt-1 p-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">CPF</label>
              <input type="text" className="w-full mt-1 p-2 border border-slate-300 rounded-lg text-sm" placeholder="000.000.000-00" />
            </div>
            <button type="button" className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 mt-4 shadow-sm">
              Atualizar Preview
            </button>
          </form>
        </div>

        {/* COLUNA 3: Preview do Documento */}
        <div className="w-full lg:flex-1 bg-slate-100 p-8 rounded-xl border border-slate-200 shadow-inner overflow-y-auto flex flex-col items-center">
          <div className="w-full max-w-[21cm] bg-white shadow-lg min-h-[29.7cm] p-[2.5cm] text-justify text-sm leading-relaxed text-slate-800 font-serif">
            {/* Cabeçalho Simulado */}
            <div className="text-center font-bold text-lg mb-8 uppercase border-b pb-4">
              PROCURAÇÃO "AD JUDICIA"
            </div>
            
            <p className="mb-4">
              <strong>OUTORGANTE:</strong> [NOME DO CLIENTE], [NACIONALIDADE], [ESTADO CIVIL], portador do CPF nº [CPF], residente e domiciliado em...
            </p>
            <p className="mb-4">
              <strong>OUTORGADO:</strong> <strong>MATTOS & FARIAS SOCIEDADE DE ADVOGADOS</strong>, inscrita na OAB/RJ sob o nº ..., com sede na...
            </p>
            <p className="mb-4">
              <strong>PODERES:</strong> Pelo presente instrumento particular de procuração, o OUTORGANTE nomeia e constitui o OUTORGADO seu bastante procurador, conferindo-lhe os poderes da cláusula "ad judicia et extra", para o foro em geral...
            </p>
            <p className="mt-12 text-center">
              Rio de Janeiro, {new Date().toLocaleDateString('pt-BR')}
            </p>
            <div className="mt-16 border-t border-black w-2/3 mx-auto pt-2 text-center">
              Assinatura do Outorgante
            </div>
          </div>

          {/* Barra de Ações Flutuante */}
          <div className="sticky bottom-4 mt-6 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4">
            <button className="flex items-center gap-2 hover:text-blue-300 transition"><Download size={18}/> PDF</button>
            <div className="h-4 w-px bg-slate-700"></div>
            <button className="flex items-center gap-2 hover:text-blue-300 transition"><Printer size={18}/> Imprimir</button>
            <div className="h-4 w-px bg-slate-700"></div>
            <button className="flex items-center gap-2 hover:text-blue-300 transition"><Copy size={18}/> Copiar Texto</button>
          </div>
        </div>

      </div>
    </div>
  );
}