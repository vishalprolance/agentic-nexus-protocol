
import React from 'react';
import { Network } from 'lucide-react';
import ProtocolVisualizer from '@/components/visualizer/ProtocolVisualizer';

const VisualizerPage = () => {
  return (
    <div className="space-y-6">
      <ProtocolVisualizer />
    </div>
  );
};

export default VisualizerPage;
