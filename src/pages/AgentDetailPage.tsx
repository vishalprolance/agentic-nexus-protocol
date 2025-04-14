
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  ArrowLeft, 
  CircuitBoard, 
  Star, 
  MessageSquare, 
  Settings,
  BarChart2, 
  FileText,
  Clock, 
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockAgents = [
  {
    id: '1',
    name: 'Research Assistant',
    description: 'Specialized in finding information, summarizing content, and answering questions based on verified sources.',
    modelType: 'GPT-4o',
    protocolCount: 3,
    lastActive: '10 minutes ago',
    rating: 5,
    status: 'online',
    capabilities: ['Research', 'Summarization', 'Question Answering'],
    conversationCount: 120,
    averageResponseTime: '2.3 seconds',
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    name: 'Data Analyst',
    description: 'Processes and visualizes data patterns, providing insights and statistical analysis.',
    modelType: 'Claude 3',
    protocolCount: 2,
    lastActive: '1 hour ago',
    rating: 4,
    status: 'busy',
    capabilities: ['Data Processing', 'Visualization', 'Statistical Analysis', 'Pattern Recognition'],
    conversationCount: 87,
    averageResponseTime: '3.5 seconds',
    createdAt: '2025-02-03'
  },
  {
    id: '3',
    name: 'Code Generator',
    description: 'Creates and reviews code in multiple languages with best practices and security considerations.',
    modelType: 'Llama 3',
    protocolCount: 1,
    lastActive: '2 hours ago',
    rating: 3,
    status: 'offline',
    capabilities: ['Code Generation', 'Code Review', 'Security Analysis'],
    conversationCount: 56,
    averageResponseTime: '4.2 seconds',
    createdAt: '2025-03-12'
  },
  {
    id: '4',
    name: 'Creative Writer',
    description: 'Generates creative content including stories, articles, and marketing copy based on provided briefs.',
    modelType: 'GPT-4o',
    protocolCount: 2,
    lastActive: '1 day ago',
    rating: 4,
    status: 'online',
    capabilities: ['Story Writing', 'Content Creation', 'Marketing Copy'],
    conversationCount: 103,
    averageResponseTime: '2.8 seconds',
    createdAt: '2025-01-30'
  },
  {
    id: '5',
    name: 'Multi-modal Assistant',
    description: 'Processes both images and text to provide comprehensive responses for visual and textual queries.',
    modelType: 'GPT-4o',
    protocolCount: 4,
    lastActive: '3 days ago',
    rating: 5,
    status: 'offline',
    capabilities: ['Image Processing', 'Text Analysis', 'Multimodal Reasoning'],
    conversationCount: 65,
    averageResponseTime: '4.7 seconds',
    createdAt: '2025-02-18'
  },
  {
    id: '6',
    name: 'Translation Expert',
    description: 'Specializes in accurate translation between multiple languages while preserving context and tone.',
    modelType: 'Claude 3',
    protocolCount: 1,
    lastActive: '1 week ago',
    rating: 4,
    status: 'online',
    capabilities: ['Translation', 'Localization', 'Cultural Adaptation'],
    conversationCount: 92,
    averageResponseTime: '3.1 seconds',
    createdAt: '2025-02-25'
  },
];

const AgentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the agent by ID
  const agent = mockAgents.find(a => a.id === id);
  
  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-4">Agent Not Found</h2>
        <Button onClick={() => navigate('/agents')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agents
        </Button>
      </div>
    );
  }
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-amber-500',
  };
  
  const statusText = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/agents')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mr-4">
              {agent.id === '2' ? (
                <BarChart2 className="w-6 h-6 text-primary" />
              ) : (
                <Bot className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{agent.name}</h2>
              <div className="flex items-center mt-1">
                <div className={`h-2 w-2 rounded-full ${statusColors[agent.status as 'online' | 'offline' | 'busy']} mr-1.5`} />
                <span className="text-sm text-muted-foreground capitalize">
                  {statusText[agent.status as 'online' | 'offline' | 'busy']}
                </span>
              </div>
            </div>
            <div className="flex ml-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < agent.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
          </div>
          
          <p className="text-muted-foreground mt-4 max-w-3xl">{agent.description}</p>
          
          <div className="flex mt-6 gap-3">
            <Button onClick={() => navigate(`/agents/${id}/chat`)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with Agent
            </Button>
            <Button variant="outline" onClick={() => navigate(`/agents/${id}/configure`)}>
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  Model Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground block">Model Type</span>
                    <Badge variant="outline" className="mt-1 font-mono">
                      {agent.modelType}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Average Response Time</span>
                    <span className="text-sm">{agent.averageResponseTime}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Created On</span>
                    <span className="text-sm">{agent.createdAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <CircuitBoard className="w-4 h-4 mr-2" />
                  Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="secondary">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Usage Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground block">Total Conversations</span>
                    <span className="text-sm">{agent.conversationCount}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Protocol Count</span>
                    <div className="flex items-center mt-1">
                      <CircuitBoard className="w-3 h-3 mr-1 text-secondary" />
                      <span>{agent.protocolCount}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Last Active</span>
                    <span className="text-sm">{agent.lastActive}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="protocols" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: agent.protocolCount }).map((_, i) => (
                  <div key={i} className="flex items-center p-3 border rounded-md">
                    <CircuitBoard className="w-5 h-5 mr-3 text-secondary" />
                    <div>
                      <div className="font-medium">Protocol {i + 1}</div>
                      <div className="text-sm text-muted-foreground">Added on {new Date().toLocaleDateString()}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center p-3 border rounded-md">
                    <MessageSquare className="w-5 h-5 mr-3 text-secondary" />
                    <div>
                      <div className="font-medium">Conversation {i + 1}</div>
                      <div className="text-sm text-muted-foreground">{(i + 1) * 2} days ago • {(i + 2) * 5} messages</div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetailPage;
