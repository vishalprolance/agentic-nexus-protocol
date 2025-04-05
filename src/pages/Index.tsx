
import React from 'react';
import { Activity, Bot, CircuitBoard, MessageSquare, Users } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import AgentStatusCard from '@/components/dashboard/AgentStatusCard';
import ProtocolCard from '@/components/dashboard/ProtocolCard';
import ActivityLog from '@/components/dashboard/ActivityLog';

const mockAgents = [
  { name: 'Research Assistant', status: 'online', type: 'LLM-GPT4', lastActive: '2 mins ago', conversations: 45 },
  { name: 'Data Analyst', status: 'busy', type: 'LLM-Claude', lastActive: '5 mins ago', conversations: 23 },
  { name: 'Code Generator', status: 'offline', type: 'LLM-Llama3', lastActive: '1 hour ago', conversations: 12 },
];

const mockProtocols = [
  {
    name: 'Research Protocol',
    description: 'Multi-agent protocol for research tasks with source verification and summarization',
    version: '1.2.0',
    agents: 3,
    status: 'active'
  },
  {
    name: 'Data Analysis',
    description: 'Protocol for analyzing and visualizing complex datasets',
    version: '0.9.1',
    agents: 2,
    status: 'draft'
  },
  {
    name: 'Code Review',
    description: 'Protocol for automatic code review and optimization suggestions',
    version: '1.0.0',
    agents: 1,
    status: 'active'
  },
];

const mockActivities = [
  { id: '1', type: 'agent', message: 'Research Assistant completed task #425', timestamp: '10 minutes ago' },
  { id: '2', type: 'protocol', message: 'New protocol "Advanced Analysis" created', timestamp: '1 hour ago' },
  { id: '3', type: 'conversation', message: 'User started new conversation with Data Analyst', timestamp: '2 hours ago' },
  { id: '4', type: 'error', message: 'Protocol execution failed: missing context data', timestamp: '3 hours ago' },
  { id: '5', type: 'info', message: 'System maintenance scheduled for tomorrow', timestamp: '5 hours ago' },
  { id: '6', type: 'agent', message: 'Code Generator agent updated to v2.1', timestamp: '1 day ago' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor and manage your agentic models and protocols
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Agents"
          value={8}
          description="2 active now"
          icon={<Bot className="h-4 w-4" />}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Protocols"
          value={12}
          description="4 active protocols"
          icon={<CircuitBoard className="h-4 w-4" />}
        />
        <StatsCard
          title="Conversations"
          value={187}
          description="24 today"
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: 10, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value={24}
          description="12 new this week"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-full lg:col-span-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Active Agents</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mockAgents.map((agent, index) => (
                <AgentStatusCard
                  key={index}
                  name={agent.name}
                  status={agent.status as 'online' | 'offline' | 'busy'}
                  type={agent.type}
                  lastActive={agent.lastActive}
                  conversations={agent.conversations}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Recent Protocols</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mockProtocols.map((protocol, index) => (
                <ProtocolCard
                  key={index}
                  name={protocol.name}
                  description={protocol.description}
                  version={protocol.version}
                  agents={protocol.agents}
                  status={protocol.status as 'active' | 'draft' | 'archived'}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 col-span-full">
          <h3 className="text-lg font-medium mb-4">System Activity</h3>
          <ActivityLog activities={mockActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
