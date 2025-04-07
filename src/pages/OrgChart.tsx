
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import OrgChart from '../components/OrgChart';
import { orgChartData, getAllTeams } from '../data/employees';
import { motion } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, Network, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const OrgChartPage = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const teams = getAllTeams();

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

  const handleTeamClick = (teamId: string) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <Layout>
      <div className="max-w-full mx-auto">
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
              Explore the hierarchical structure of Aramco from CEO to Groups
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
        
        <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-full rounded-lg border mb-6">
          <ResizablePanel defaultSize={20} minSize={15} className="p-4 bg-white">
            <div>
              <h2 className="text-xl font-display font-medium text-aramco-darkblue mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-aramco-blue" />
                Teams & Units
              </h2>
              
              <div className="flex flex-col gap-2 overflow-auto max-h-[70vh]">
                {teams.map(team => (
                  <Button
                    key={team.id}
                    variant="outline"
                    size="sm"
                    className="bg-white justify-start w-full"
                    onClick={() => handleTeamClick(team.id)}
                  >
                    {team.name}
                  </Button>
                ))}
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80} className="bg-white p-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg overflow-auto"
              style={{ 
                maxHeight: 'calc(100vh - 200px)',
                minHeight: '500px'
              }}
            >
              <div 
                className="min-w-max py-10" 
                style={{ 
                  transform: `scale(${zoomLevel / 100})`, 
                  transformOrigin: 'top center',
                }}
              >
                <OrgChart data={orgChartData} />
              </div>
            </motion.div>
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <div className="mt-4 text-center text-aramco-darkgray text-sm">
          <p>
            This organization chart shows the hierarchical structure at Aramco.
            Click on any employee to view their detailed profile or team badges to view team details.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrgChartPage;
