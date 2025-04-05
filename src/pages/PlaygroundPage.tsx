
import React from 'react';
import { Beaker } from 'lucide-react';
import ModelPlayground from '@/components/playground/ModelPlayground';

const PlaygroundPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Test Playground</h2>
          <p className="text-muted-foreground">
            Experiment with your agents and protocols in a test environment
          </p>
        </div>
      </div>
      
      <ModelPlayground />
    </div>
  );
};

export default PlaygroundPage;
