
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Search,
  Filter,
  Bot,
  Calendar,
  MoreHorizontal 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Conversation = {
  id: string;
  title: string;
  agent: string;
  date: string;
  messages: number;
  status: 'active' | 'completed' | 'archived';
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Research on Quantum Computing',
    agent: 'Research Assistant',
    date: 'April 5, 2025',
    messages: 24,
    status: 'active'
  },
  {
    id: '2',
    title: 'Market Analysis Report',
    agent: 'Data Analyst',
    date: 'April 4, 2025',
    messages: 15,
    status: 'completed'
  },
  {
    id: '3',
    title: 'React Component Implementation',
    agent: 'Code Generator',
    date: 'April 3, 2025',
    messages: 18,
    status: 'completed'
  },
  {
    id: '4',
    title: 'Marketing Campaign Ideas',
    agent: 'Creative Writer',
    date: 'April 2, 2025',
    messages: 30,
    status: 'archived'
  },
  {
    id: '5',
    title: 'Database Schema Review',
    agent: 'Code Generator',
    date: 'April 1, 2025',
    messages: 12,
    status: 'completed'
  },
  {
    id: '6',
    title: 'Customer Feedback Analysis',
    agent: 'Data Analyst',
    date: 'March 30, 2025',
    messages: 22,
    status: 'archived'
  },
];

const ConversationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Conversations</h2>
          <p className="text-muted-foreground">
            View and manage agent conversation history
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">All Conversations</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      
      <Card className="border border-border/40 bg-card/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/5 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Title
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Agent
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                      Date
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">
                      Messages
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {mockConversations.map((conversation) => (
                    <tr
                      key={conversation.id}
                      className="border-b transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                          <span>{conversation.title}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 mr-2 text-secondary" />
                          <span>{conversation.agent}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle hidden md:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{conversation.date}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle hidden sm:table-cell">
                        {conversation.messages}
                      </td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant="outline"
                          className={
                            conversation.status === 'active'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : conversation.status === 'completed'
                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }
                        >
                          {conversation.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationsPage;
