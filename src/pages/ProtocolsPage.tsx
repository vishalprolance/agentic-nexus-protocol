
import React from 'react';
import { CircuitBoard } from 'lucide-react';
import ProtocolDesigner from '@/components/protocols/ProtocolDesigner';

const ProtocolsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Protocol Designer</h2>
          <p className="text-muted-foreground">
            Create and edit Model Context Protocol (MCP) implementations
          </p>
        </div>
      </div>
      
      <ProtocolDesigner />
    </div>
  );
};

export default ProtocolsPage;
