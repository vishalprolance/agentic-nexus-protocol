
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircuitBoard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProtocolCardProps = {
  name: string;
  description: string;
  version: string;
  agents: number;
  status: 'active' | 'draft' | 'archived';
};

const ProtocolCard = ({ name, description, version, agents, status }: ProtocolCardProps) => {
  const statusColors = {
    active: 'bg-green-500/10 text-green-500 border-green-500/20',
    draft: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  return (
    <Card className="border border-border/40 bg-card/60 hover:border-primary/20 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium flex items-center">
            <CircuitBoard className="h-4 w-4 mr-2 text-secondary" />
            {name}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={statusColors[status]}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex justify-between mt-3 text-xs">
          <div>
            <span className="text-muted-foreground mr-1">Version:</span>
            <Badge variant="outline" className="text-xs font-mono">v{version}</Badge>
          </div>
          <div>
            <span className="text-muted-foreground mr-1">Agents:</span>
            <span>{agents}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="w-full text-primary justify-between group">
          <span>View Protocol</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProtocolCard;
