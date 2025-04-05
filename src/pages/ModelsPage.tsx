
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Database,
  Search,
  Filter,
  Download,
  UploadCloud,
  ExternalLink,
  PlusCircle,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Model = {
  id: string;
  name: string;
  type: string;
  provider: string;
  version: string;
  lastUpdated: string;
  status: 'available' | 'importing' | 'unavailable';
};

const mockModels: Model[] = [
  {
    id: '1',
    name: 'GPT-4o',
    type: 'Large Language Model',
    provider: 'OpenAI',
    version: 'latest',
    lastUpdated: 'April 5, 2025',
    status: 'available'
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    type: 'Large Language Model',
    provider: 'Anthropic',
    version: 'latest',
    lastUpdated: 'April 3, 2025',
    status: 'available'
  },
  {
    id: '3',
    name: 'Llama 3 70B',
    type: 'Large Language Model',
    provider: 'Meta AI',
    version: '1.0.0',
    lastUpdated: 'April 1, 2025',
    status: 'importing'
  },
  {
    id: '4',
    name: 'Mistral Large',
    type: 'Large Language Model',
    provider: 'Mistral AI',
    version: 'latest',
    lastUpdated: 'March 30, 2025',
    status: 'available'
  },
  {
    id: '5',
    name: 'Stable Diffusion XL',
    type: 'Image Generation',
    provider: 'Stability AI',
    version: '1.0.0',
    lastUpdated: 'March 29, 2025',
    status: 'unavailable'
  },
  {
    id: '6',
    name: 'mxbai-embed-large',
    type: 'Embedding Model',
    provider: 'MixedBread AI',
    version: '1.0.0',
    lastUpdated: 'March 25, 2025',
    status: 'available'
  },
];

const ModelsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Model Registry</h2>
          <p className="text-muted-foreground">
            Manage, import, and configure AI models
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UploadCloud className="h-4 w-4 mr-2" />
            Import Model
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Model
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Models</TabsTrigger>
          <TabsTrigger value="llm">Language Models</TabsTrigger>
          <TabsTrigger value="embedding">Embedding Models</TabsTrigger>
          <TabsTrigger value="image">Image Models</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">All Providers</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="meta">Meta AI</option>
          </select>
        </div>
      </div>
      
      <Card className="border border-border/40 bg-card/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Available Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/5">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                      Type
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden lg:table-cell">
                      Provider
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">
                      Version
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
                  {mockModels.map((model) => (
                    <tr
                      key={model.id}
                      className="border-b transition-colors hover:bg-muted/10"
                    >
                      <td className="p-4 align-middle">
                        <div className="font-medium">{model.name}</div>
                      </td>
                      <td className="p-4 align-middle hidden md:table-cell">
                        <Badge variant="outline" className="font-mono bg-secondary/10 text-secondary-foreground border-secondary/20">
                          {model.type}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle hidden lg:table-cell">
                        {model.provider}
                      </td>
                      <td className="p-4 align-middle hidden sm:table-cell">
                        {model.version}
                      </td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant="outline"
                          className={
                            model.status === 'available'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : model.status === 'importing'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }
                        >
                          {model.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
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

export default ModelsPage;
