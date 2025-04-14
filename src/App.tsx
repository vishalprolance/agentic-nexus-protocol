
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import AgentsPage from "./pages/AgentsPage";
import AgentNewPage from "./pages/AgentNewPage";
import AgentDetailPage from "./pages/AgentDetailPage";
import ProtocolsPage from "./pages/ProtocolsPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import VisualizerPage from "./pages/VisualizerPage";
import ConversationsPage from "./pages/ConversationsPage";
import ModelsPage from "./pages/ModelsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/new" element={<AgentNewPage />} />
            <Route path="/agents/:id" element={<AgentDetailPage />} />
            <Route path="/protocols" element={<ProtocolsPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/visualizer" element={<VisualizerPage />} />
            <Route path="/conversations" element={<ConversationsPage />} />
            <Route path="/models" element={<ModelsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
