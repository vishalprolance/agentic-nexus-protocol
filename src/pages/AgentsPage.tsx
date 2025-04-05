
import React from 'react';
import { 
  Bot, 
  Plus, 
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AgentCard from '@/components/agents/AgentCard';
import { Link } from 'react-router-dom';

const mockAgents = [
  {
    id: '1',
    name: 'Research Assistant',
    description: 'Specialized in finding information, summarizing content, and answering questions based on verified sources.',
    modelType: 'GPT-4o',
    protocolCount: 3,
    lastActive: '10 minutes ago',
    rating: 5,
    status: 'online'
  },
  {
    id: '2',
    name: 'Data Analyst',
    description: 'Processes and visualizes data patterns, providing insights and statistical analysis.',
    modelType: 'Claude 3',
    protocolCount: 2,
    lastActive: '1 hour ago',
    rating: 4,
    status: 'busy'
  },
  {
    id: '3',
    name: 'Code Generator',
    description: 'Creates and reviews code in multiple languages with best practices and security considerations.',
    modelType: 'Llama 3',
    protocolCount: 1,
    lastActive: '2 hours ago',
    rating: 3,
    status: 'offline'
  },
  {
    id: '4',
    name: 'Creative Writer',
    description: 'Generates creative content including stories, articles, and marketing copy based on provided briefs.',
    modelType: 'GPT-4o',
    protocolCount: 2,
    lastActive: '1 day ago',
    rating: 4,
    status: 'online'
  },
  {
    id: '5',
    name: 'Multi-modal Assistant',
    description: 'Processes both images and text to provide comprehensive responses for visual and textual queries.',
    modelType: 'GPT-4o',
    protocolCount: 4,
    lastActive: '3 days ago',
    rating: 5,
    status: 'offline'
  },
  {
    id: '6',
    name: 'Translation Expert',
    description: 'Specializes in accurate translation between multiple languages while preserving context and tone.',
    modelType: 'Claude 3',
    protocolCount: 1,
    lastActive: '1 week ago',
    rating: 4,
    status: 'online'
  },
];

const AgentsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Agents</h2>
          <p className="text-muted-foreground">
            Create and manage your AI agents
          </p>
        </div>
        <Link to="/agents/new">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            New Agent
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">All Agents</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockAgents.map(agent => (
          <AgentCard
            key={agent.id}
            id={agent.id}
            name={agent.name}
            description={agent.description}
            modelType={agent.modelType}
            protocolCount={agent.protocolCount}
            lastActive={agent.lastActive}
            rating={agent.rating}
            status={agent.status as 'online' | 'offline' | 'busy'}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentsPage;
