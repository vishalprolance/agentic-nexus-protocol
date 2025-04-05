
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AgentForm from '@/components/agents/AgentForm';

const AgentNewPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/agents">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create New Agent</h2>
          <p className="text-muted-foreground">
            Define a new AI agent for your system
          </p>
        </div>
      </div>
      
      <AgentForm />
    </div>
  );
};

export default AgentNewPage;
