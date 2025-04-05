
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, Play, Code, CircuitBoard } from 'lucide-react';

type ProtocolStep = {
  id: string;
  type: 'input' | 'processing' | 'output';
  name: string;
  description: string;
  code: string;
};

const ProtocolDesigner = () => {
  const [steps, setSteps] = useState<ProtocolStep[]>([
    {
      id: '1',
      type: 'input',
      name: 'User Query',
      description: 'Initial user input to process',
      code: '{\n  "type": "user_input",\n  "content": "${input}",\n  "metadata": {\n    "timestamp": "${timestamp}"\n  }\n}'
    },
    {
      id: '2',
      type: 'processing',
      name: 'Context Enrichment',
      description: 'Add relevant context to the user query',
      code: '{\n  "type": "processing",\n  "operation": "context_enrichment",\n  "input": "${previous_step.output}",\n  "context_sources": ["knowledge_base", "conversation_history"]\n}'
    }
  ]);
  const [activeTab, setActiveTab] = useState('design');
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const addStep = () => {
    const newStep: ProtocolStep = {
      id: Date.now().toString(),
      type: 'processing',
      name: 'New Step',
      description: 'Description for the new step',
      code: '{\n  "type": "processing",\n  "operation": "custom",\n  "input": "${previous_step.output}"\n}'
    };
    setSteps([...steps, newStep]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
      <div className="lg:col-span-2">
        <Card className="border border-border/40 bg-card/60 h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Protocol Steps</CardTitle>
            <Button size="sm" variant="outline" onClick={addStep}>
              <Plus className="h-4 w-4 mr-1" /> Add Step
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-md border ${
                    selectedStep === step.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  } cursor-pointer transition-colors`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center mr-2
                        ${step.type === 'input' ? 'bg-green-500/20 text-green-500' : 
                          step.type === 'processing' ? 'bg-blue-500/20 text-blue-500' : 
                          'bg-purple-500/20 text-purple-500'}
                      `}>
                        {step.type === 'input' ? '1' : 
                         step.type === 'processing' ? '2' : '3'}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{step.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card className="border border-border/40 bg-card/60 h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Protocol Configuration</CardTitle>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button size="sm" variant="outline" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20">
                  <Play className="h-4 w-4 mr-1" /> Test
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="design" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="design" className="flex items-center">
                  <CircuitBoard className="h-4 w-4 mr-2" />
                  Designer
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="design" className="p-4 space-y-4">
                {selectedStep ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Step Name</label>
                        <Input 
                          value={steps.find(s => s.id === selectedStep)?.name} 
                          onChange={(e) => {
                            setSteps(steps.map(step => 
                              step.id === selectedStep 
                                ? { ...step, name: e.target.value } 
                                : step
                            ));
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={steps.find(s => s.id === selectedStep)?.description} 
                          onChange={(e) => {
                            setSteps(steps.map(step => 
                              step.id === selectedStep 
                                ? { ...step, description: e.target.value } 
                                : step
                            ));
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Step Type</label>
                        <select 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={steps.find(s => s.id === selectedStep)?.type}
                          onChange={(e) => {
                            setSteps(steps.map(step => 
                              step.id === selectedStep 
                                ? { ...step, type: e.target.value as 'input' | 'processing' | 'output' } 
                                : step
                            ));
                          }}
                        >
                          <option value="input">Input</option>
                          <option value="processing">Processing</option>
                          <option value="output">Output</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <CircuitBoard className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select a Step</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Select a step from the left panel to configure its properties or add a new step to your protocol.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="code" className="p-4">
                {selectedStep ? (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Step Code</label>
                      <div className="relative font-mono">
                        <Textarea 
                          className="font-mono text-xs h-[300px] bg-muted/50 resize-none"
                          value={steps.find(s => s.id === selectedStep)?.code} 
                          onChange={(e) => {
                            setSteps(steps.map(step => 
                              step.id === selectedStep 
                                ? { ...step, code: e.target.value } 
                                : step
                            ));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <Code className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select a Step</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Select a step from the left panel to edit its code configuration.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProtocolDesigner;
