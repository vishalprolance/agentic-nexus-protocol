
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const ProtocolVisualizer = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // This is a simplified visualization that would be replaced with a proper
  // graph visualization library like D3.js or react-flow in a real implementation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const renderSimpleVisualization = () => {
      const container = canvasRef.current;
      if (!container) return;
      
      // Clear previous content
      container.innerHTML = '';
      
      // Create a simple visualization with nodes
      const nodes = [
        { id: 'user', label: 'User Input', type: 'source' },
        { id: 'agent1', label: 'Research Agent', type: 'agent' },
        { id: 'agent2', label: 'Analysis Agent', type: 'agent' },
        { id: 'result', label: 'Final Response', type: 'target' },
      ];
      
      const nodeElements: HTMLDivElement[] = [];
      
      // Create node elements
      nodes.forEach((node, index) => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'absolute agent-node flex flex-col items-center transition-all duration-300';
        
        const bgColorClass = node.type === 'source' ? 'border-green-500/30 bg-green-500/10' :
                             node.type === 'target' ? 'border-purple-500/30 bg-purple-500/10' :
                             'border-primary/30 bg-primary/10';
        
        nodeEl.classList.add(bgColorClass);
        
        // Position nodes in a simple flow
        const xPos = 120 + (index * 200);
        const yPos = 150;
        nodeEl.style.left = `${xPos}px`;
        nodeEl.style.top = `${yPos}px`;
        
        // Add content to node
        nodeEl.innerHTML = `
          <div class="font-medium text-sm mb-1">${node.label}</div>
          <div class="text-xs text-muted-foreground">${node.type}</div>
        `;
        
        container.appendChild(nodeEl);
        nodeElements.push(nodeEl);
      });
      
      // Add connections between nodes
      for (let i = 0; i < nodeElements.length - 1; i++) {
        const connection = document.createElement('div');
        connection.className = 'absolute protocol-line';
        
        const node1 = nodeElements[i];
        const node2 = nodeElements[i + 1];
        
        // Simple positioning for the connection
        const x1 = parseInt(node1.style.left) + node1.offsetWidth;
        const y1 = parseInt(node1.style.top) + node1.offsetHeight / 2;
        const x2 = parseInt(node2.style.left);
        const y2 = parseInt(node2.style.top) + node2.offsetHeight / 2;
        
        // Calculate width and position
        const width = x2 - x1;
        
        connection.style.width = `${width}px`;
        connection.style.left = `${x1}px`;
        connection.style.top = `${y1}px`;
        
        container.appendChild(connection);
      }
    };
    
    renderSimpleVisualization();
    
    // Re-render on window resize
    window.addEventListener('resize', renderSimpleVisualization);
    return () => window.removeEventListener('resize', renderSimpleVisualization);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Protocol Visualizer</h2>
          <p className="text-muted-foreground">
            Visualize agent connections and data flow in your protocols
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select defaultValue="standard">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select protocol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Research Protocol</SelectItem>
              <SelectItem value="advanced">Advanced Analysis Protocol</SelectItem>
              <SelectItem value="coding">Code Generation Protocol</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="border border-border/40 bg-card/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Protocol Flow</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            ref={canvasRef} 
            className="h-[400px] w-full relative bg-muted/10 rounded-md border border-border overflow-hidden"
          >
            {/* Canvas for visualization - will be populated by the useEffect */}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border/40 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Protocol Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">
                  This protocol shows a research workflow where user input is processed by a research agent, 
                  followed by analysis, resulting in a comprehensive response.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Created</h3>
                  <p className="text-muted-foreground">April 3, 2025</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Last Modified</h3>
                  <p className="text-muted-foreground">April 5, 2025</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Agents</h3>
                  <p className="text-muted-foreground">2 Agents</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Steps</h3>
                  <p className="text-muted-foreground">4 Steps</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Total Runs</h3>
                  <p className="text-xl">124</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Success Rate</h3>
                  <p className="text-xl text-green-500">97%</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Avg. Duration</h3>
                  <p className="text-xl">3.4s</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Last Run</h3>
                  <p className="text-muted-foreground">30 minutes ago</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Performance</h3>
                <div className="h-12 bg-muted/10 rounded-md border border-border mt-2">
                  {/* Placeholder for a performance chart that would be implemented with Recharts */}
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Performance metrics chart</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProtocolVisualizer;
