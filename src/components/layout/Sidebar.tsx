
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CircuitBoard, 
  Beaker, 
  Network, 
  Settings, 
  FolderTree,
  Bot,
  MessageSquare
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: 'Agents',
    href: '/agents',
    icon: <Bot className="w-5 h-5" />,
  },
  {
    title: 'Protocol Designer',
    href: '/protocols',
    icon: <CircuitBoard className="w-5 h-5" />,
  },
  {
    title: 'Test Playground',
    href: '/playground',
    icon: <Beaker className="w-5 h-5" />,
  },
  {
    title: 'Visualizer',
    href: '/visualizer',
    icon: <Network className="w-5 h-5" />,
  },
  {
    title: 'Conversations',
    href: '/conversations',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: 'Model Registry',
    href: '/models',
    icon: <FolderTree className="w-5 h-5" />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 bg-sidebar border-r border-border flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-3">
            <Network className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">MCP</h1>
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded-sm bg-secondary/20 text-secondary-foreground border border-secondary/20">
            Alpha
          </span>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-accent/10 text-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-accent/5 hover:text-accent-foreground"
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border mt-auto">
        <Link
          to="/settings"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-sidebar-foreground/80 hover:bg-accent/5 hover:text-accent-foreground"
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
