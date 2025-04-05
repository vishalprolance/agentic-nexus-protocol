
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CircuitBoard, MessageSquare, AlertCircle, Info } from 'lucide-react';

type ActivityItem = {
  id: string;
  type: 'agent' | 'protocol' | 'conversation' | 'error' | 'info';
  message: string;
  timestamp: string;
};

type ActivityLogProps = {
  activities: ActivityItem[];
};

const ActivityLog = ({ activities }: ActivityLogProps) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'agent':
        return <Bot className="h-4 w-4 text-primary" />;
      case 'protocol':
        return <CircuitBoard className="h-4 w-4 text-secondary" />;
      case 'conversation':
        return <MessageSquare className="h-4 w-4 text-blue-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border border-border/40 bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="px-2 max-h-[300px] overflow-y-auto">
        <div className="space-y-1">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="py-2 px-3 text-xs hover:bg-muted/30 rounded-md flex items-start space-x-2"
            >
              <div className="mt-0.5">{getIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-foreground">{activity.message}</p>
                <p className="text-muted-foreground text-[10px] mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
