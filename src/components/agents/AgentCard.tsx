
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CircuitBoard, Star, MessageSquare, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type AgentCardProps = {
  id: string;
  name: string;
  description: string;
  modelType: string;
  protocolCount: number;
  lastActive: string;
  rating: number;
  status: 'online' | 'offline' | 'busy';
};

const AgentCard = ({
  id,
  name,
  description,
  modelType,
  protocolCount,
  lastActive,
  rating,
  status
}: AgentCardProps) => {
  const navigate = useNavigate();
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-amber-500',
  };

  const handleCardClick = () => {
    navigate(`/agents/${id}`);
  };

  return (
    <Card 
      className="border border-border/40 bg-card/60 h-full flex flex-col cursor-pointer hover:border-primary/50 transition-all"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <div className="flex items-center mt-1">
                <div className={`h-2 w-2 rounded-full ${statusColors[status]} mr-1.5`} />
                <span className="text-xs text-muted-foreground capitalize">{status}</span>
              </div>
            </div>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground block">Model Type</span>
            <Badge variant="outline" className="mt-1 font-mono">
              {modelType}
            </Badge>
          </div>
          <div>
            <span className="text-muted-foreground block">Protocols</span>
            <div className="flex items-center mt-1">
              <CircuitBoard className="w-3 h-3 mr-1 text-secondary" />
              <span>{protocolCount}</span>
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <span className="text-muted-foreground block">Last Active</span>
            <span className="text-sm">{lastActive}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            navigate(`/agents/${id}/chat`);
          }}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            navigate(`/agents/${id}/configure`);
          }}
        >
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
