
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between bg-card/40 backdrop-blur-sm">
      <div className="flex-1 flex items-center space-x-4">
        <h1 className="text-lg font-semibold">Agentic Nexus Protocol</h1>
        <div className="hidden md:flex relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search protocols, models, agents..."
            className="pl-8 bg-background/50 border-muted"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button size="sm" variant="outline">
          Documentation
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
          New Agent
        </Button>
      </div>
    </header>
  );
};

export default Header;
