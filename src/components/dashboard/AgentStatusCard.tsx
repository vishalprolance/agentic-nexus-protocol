
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Activity } from 'lucide-react';

type AgentStatusProps = {
  name: string;
  status: 'online' | 'offline' | 'busy';
  type: string;
  lastActive: string;
  conversations: number;
};

const StatusIndicator = ({ status }: { status: 'online' | 'offline' | 'busy' }) => {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-amber-500',
  };

  return (
    <div className="flex items-center">
      <div className={`h-2 w-2 rounded-full ${colors[status]} mr-1.5 animate-pulse-glow`} />
      <span className="text-sm text-muted-foreground capitalize">{status}</span>
    </div>
  );
};

const AgentStatusCard = ({ name, status, type, lastActive, conversations }: AgentStatusProps) => {
  return (
    <Card className="border border-border/40 bg-card/60 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium flex items-center">
          <Bot className="h-4 w-4 mr-2 text-primary" />
          {name}
        </CardTitle>
        <StatusIndicator status={status} />
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Type:</span>
            <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground border-secondary/20 font-mono">
              {type}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last Active:</span>
            <span>{lastActive}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Conversations:</span>
            <div className="flex items-center">
              <Activity className="w-3 h-3 mr-1 text-primary" />
              <span>{conversations}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentStatusCard;
