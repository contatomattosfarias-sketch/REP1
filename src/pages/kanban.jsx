import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { TaskCard } from '../components/kanban/taskcard'; // Importando o card que criamos
import { Plus, Filter } from 'lucide-react';

// Dados iniciais simulando o Banco de Dados
const initialData = {
  todo: {
    id: 'todo',
    title: 'A Fazer / Triagem',
    items: [
      { id: '1', titulo: 'Petição Inicial - Silva', cliente: 'João Silva', prioridade: 'alta', prazo: '12/12', processo_id: '001' },
      { id: '2', titulo: 'Análise de Contrato', cliente: 'Tech Solutions', prioridade: 'media', prazo: '15/12', processo_id: '004' },
    ]
  },
  doing: {
    id: 'doing',
    title: 'Em Andamento',
    items: [
      { id: '3', titulo: 'Réplica Trabalhista', cliente: 'Maria Oliveira', prioridade: 'alta', prazo: 'Hoje', processo_id: '002' },
    ]
  },
  done: {
    id: 'done',
    title: 'Finalizado / Protocolado',
    items: [
      { id: '4', titulo: 'Recurso Ordinário', cliente: 'Transportes SA', prioridade: 'baixa', prazo: 'Ontem', processo_id: '003' },
      { id: '5', titulo: 'Audiência de Conciliação', cliente: 'Pedro Santos', prioridade: 'media', prazo: '01/12', processo_id: '005' },
    ]
  }
};

export default function Kanban() {
  const [columns, setColumns] = useState(initialData);

  // Função disparada quando soltamos o card
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Se soltou no mesmo lugar, não faz nada
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Copia das colunas para não alterar estado diretamente
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    // Remove da origem
    const [removed] = sourceItems.splice(source.index, 1);

    // Se for na mesma coluna
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems }
      });
    } else {
      // Se for mover de uma coluna para outra
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems }
      });
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Header da Página */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kanban Jurídico</h1>
          <p className="text-slate-500 text-sm">Gerencie o fluxo dos seus processos.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200">
            <Filter size={20} />
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            <Plus size={18} />
            <span className="hidden md:inline">Nova Tarefa</span>
          </button>
        </div>
      </div>

      {/* Área do Drag and Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Container Responsivo:
            - Mobile: overflow-x-auto (Scroll horizontal)
            - Desktop: grid-cols-3 (Colunas fixas)
        */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex md:grid md:grid-cols-3 gap-6 h-full min-w-[320px] md:min-w-0 px-1">
            
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="flex flex-col h-full min-w-[280px] md:min-w-0 bg-slate-50/50 rounded-xl border border-slate-200/60">
                {/* Título da Coluna */}
                <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-100/50 rounded-t-xl">
                  <h3 className="font-semibold text-slate-700 text-sm flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${columnId === 'todo' ? 'bg-slate-400' : columnId === 'doing' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                    {column.title}
                  </h3>
                  <span className="text-xs bg-white px-2 py-0.5 rounded text-slate-400 font-medium border border-slate-100">
                    {column.items.length}
                  </span>
                </div>

                {/* Área onde soltamos os cards */}
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={clsx(
                        "flex-1 p-3 overflow-y-auto transition-colors",
                        snapshot.isDraggingOver ? "bg-blue-50/50" : ""
                      )}
                    >
                      {column.items.map((item, index) => (
                        <TaskCard key={item.id} task={item} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}

          </div>
        </div>
      </DragDropContext>
    </div>
  );
}