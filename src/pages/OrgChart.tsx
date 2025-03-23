
import { useState } from 'react';
import Layout from '../components/Layout';
import OrgChart from '../components/OrgChart';
import { orgChartData } from '../data/employees';
import { motion } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, Network } from 'lucide-react';

const OrgChartPage = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 70) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-display font-medium text-aramco-darkblue flex items-center">
              <Network className="w-7 h-7 mr-2 text-aramco-blue" />
              Organization Chart
            </h1>
            <p className="text-aramco-darkgray mt-1">
              Explore the organizational structure of Aramco
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center mt-4 md:mt-0"
          >
            <div className="relative mr-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-aramco-darkgray" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find in org chart..."
                className="aramco-input pl-10 py-1.5 text-sm w-44 md:w-56"
              />
            </div>
            
            <div className="flex items-center bg-white rounded-lg border border-aramco-gray">
              <button
                onClick={handleZoomOut}
                className="p-2 text-aramco-darkgray hover:text-aramco-blue transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="px-2 text-sm font-medium">{zoomLevel}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-aramco-darkgray hover:text-aramco-blue transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6 rounded-2xl overflow-x-auto"
        >
          <div 
            className="min-w-max" 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
          >
            <OrgChart data={orgChartData} />
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-aramco-darkgray text-sm">
          <p>
            This organization chart shows the leadership structure at Aramco.
            Click on any employee to view their detailed profile.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrgChartPage;
