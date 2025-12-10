import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Wallet, Kanban, Settings, X, LogOut,
  Users, Scale, Calculator, FileText, UserCheck // Novos icones
} from 'lucide-react';
import { clsx } from 'clsx'; 
import { useAuth } from '../../context/authcontext'; 

export function Sidebar({ isOpen, onClose, isMobile }) {
  const { user, plano, logout } = useAuth(); 
  const brandColor = "bg-blue-900"; 
  const logoUrl = null; 

  // MENU COMPLETO 100%
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Clientes (CRM)', icon: Users, path: '/clientes' },
    { label: 'Processos', icon: Scale, path: '/processos' },
    { label: 'Documentos', icon: FileText, path: '/documentos' }, // NOVO
    { label: 'Calculadora', icon: Calculator, path: '/calculadora' },
    { label: 'Financeiro', icon: Wallet, path: '/financeiro' },
    { label: 'Parceiros', icon: UserCheck, path: '/correspondentes' }, // NOVO
    { label: 'Kanban', icon: Kanban, path: '/kanban' },
    { label: 'Configurações', icon: Settings, path: '/configuracoes' },
  ];

  const sidebarClasses = clsx(
    "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out shadow-xl",
    {
      "translate-x-0": isOpen || !isMobile, 
      "-translate-x-full": isMobile && !isOpen, 
    }
  );

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className={`h-16 flex items-center justify-between px-6 ${brandColor}`}>
          <div className="font-bold text-lg tracking-wide">
            {logoUrl ? <img src={logoUrl} alt="Logo" /> : "Mattos & Farias"}
          </div>
          {isMobile && (
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => isMobile && onClose()} 
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                isActive 
                  ? "bg-white/10 text-white shadow-sm border-l-4 border-blue-400" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold uppercase text-white">
              {user?.email?.slice(0, 2) || "AD"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm text-white truncate w-24" title={user?.email}>
                {user?.email || "Usuário"}
              </span>
              <span className="text-xs text-slate-500 capitalize">
                Plano {plano || "Básico"}
              </span>
            </div>
            <button onClick={logout} className="ml-auto text-slate-500 hover:text-red-400 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}