
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Send, Play, CircuitBoard, Settings, RotateCcw, Copy } from 'lucide-react';

const ModelPlayground = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Simulated response after a delay
    setTimeout(() => {
      setOutput(`Response to: ${input}\n\nThis is a simulated response from the AI agent. In a real implementation, this would be the output from the selected model based on the protocol configuration.`);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border border-border/40 bg-card/60 h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Test Playground</CardTitle>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="chat">
              <TabsList className="mb-4">
                <TabsTrigger value="chat" className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="structured" className="flex items-center">
                  <CircuitBoard className="h-4 w-4 mr-2" />
                  Structured
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4">
                <div className="min-h-[300px] max-h-[400px] overflow-y-auto bg-muted/20 rounded-md p-4 text-sm">
                  {output ? (
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-md bg-secondary/20 flex items-center justify-center mr-3 mt-0.5">
                          <CircuitBoard className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="flex-1 bg-background rounded-md p-3 border border-border">
                          <p className="whitespace-pre-line">{input}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 bg-background rounded-md p-3 border border-border relative group">
                          <div className="absolute top-2 right-2 hidden group-hover:block">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <p className="whitespace-pre-line">{output}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Enter a message to test the agent</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message to test the agent..."
                    className="resize-none min-h-[80px] pr-12"
                  />
                  <Button 
                    className="absolute right-2 bottom-2 rounded-full h-8 w-8 p-0"
                    onClick={handleSendMessage}
                    disabled={isProcessing || !input.trim()}
                  >
                    {isProcessing ? 
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : 
                      <Send className="h-4 w-4" />
                    }
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="structured" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Input</label>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Input data in JSON format..."
                      className="resize-none h-[200px] font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Output</label>
                    <Textarea
                      value={output}
                      readOnly
                      placeholder="Output will be displayed here..."
                      className="resize-none h-[200px] font-mono text-xs bg-muted/20"
                    />
                  </div>
                </div>
                <div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isProcessing || !input.trim()}
                    className="w-full"
                  >
                    {isProcessing ? 
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div> : 
                      <Play className="h-4 w-4 mr-2" />
                    }
                    Run Test
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="border border-border/40 bg-card/60 h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Agent</label>
              <Select defaultValue="research">
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research Assistant</SelectItem>
                  <SelectItem value="coding">Code Helper</SelectItem>
                  <SelectItem value="creative">Creative Writer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Protocol</label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Chat</SelectItem>
                  <SelectItem value="research">Research Protocol</SelectItem>
                  <SelectItem value="coding">Code Generation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Temperature</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="0.7"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.0</span>
                <span>0.7</span>
                <span>1.0</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Tokens</label>
              <input
                type="number"
                defaultValue={2048}
                min={1}
                max={8192}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full">
                Advanced Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelPlayground;
