import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Clock, AlertCircle, FileText } from 'lucide-react';
import { clsx } from 'clsx';

export function TaskCard({ task, index }) {
  // Cores dinâmicas baseadas na prioridade
  const priorityColors = {
    alta: 'bg-red-100 text-red-700 border-red-200',
    media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    baixa: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "bg-white p-4 rounded-lg shadow-sm border border-slate-200 group hover:border-blue-300 transition-colors mb-3",
            snapshot.isDragging ? "shadow-lg rotate-2 ring-2 ring-blue-400 opacity-90" : ""
          )}
          style={provided.draggableProps.style}
        >
          {/* Header do Card */}
          <div className="flex justify-between items-start mb-2">
            <span className={clsx(
              "text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide border",
              priorityColors[task.prioridade] || priorityColors.baixa
            )}>
              {task.prioridade}
            </span>
            <span className="text-xs text-slate-400 font-mono">#{task.processo_id}</span>
          </div>

          {/* Título */}
          <h4 className="text-sm font-semibold text-slate-800 mb-1 leading-snug">
            {task.titulo}
          </h4>
          <p className="text-xs text-slate-500 mb-3 truncate">
            {task.cliente}
          </p>

          {/* Footer do Card */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
            <div className="flex items-center text-xs text-slate-500 gap-1">
              <Clock size={12} />
              <span>{task.prazo}</span>
            </div>
            
            {/* Ícone de Ação (só aparece no hover no Desktop) */}
            <button className="text-slate-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <FileText size={14} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}