
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import OrgChart from '../components/OrgChart';
import { orgChartData, getAllTeams, getEmployeeById, EmployeeType } from '../data/employees';
import { motion } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, Network, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const OrgChartPage = () => {
  const [searchParams] = useSearchParams();
  const focusedEmployeeId = searchParams.get('focus') || undefined;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedEmployee, setFocusedEmployee] = useState<EmployeeType | undefined>(undefined);
  const navigate = useNavigate();
  const teams = getAllTeams();

  useEffect(() => {
    if (focusedEmployeeId) {
      const employee = getEmployeeById(focusedEmployeeId);
      setFocusedEmployee(employee);
    } else {
      setFocusedEmployee(undefined);
    }
  }, [focusedEmployeeId]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const resetFocus = () => {
    navigate('/org-chart');
  };

  const displayEmployee = focusedEmployee || orgChartData;

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
              {focusedEmployee ? 
                `Viewing ${focusedEmployee.name}'s organization structure` : 
                "Explore the organizational structure of Aramco"}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center mt-4 md:mt-0"
          >
            <form onSubmit={handleSearch} className="relative mr-4">
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
            </form>
            
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
        
        {focusedEmployee && (
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={resetFocus}
              className="mb-4"
            >
              View Full Organization Chart
            </Button>
          </div>
        )}
        
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
              {focusedEmployee && (
                <Card className="mb-4 p-4 bg-blue-50 border-blue-200">
                  <h2 className="text-lg font-medium text-aramco-darkblue flex items-center">
                    <User className="w-5 h-5 mr-2 text-aramco-blue" />
                    {focusedEmployee.name}'s Organization
                  </h2>
                  <p className="text-sm text-aramco-darkgray">
                    Showing direct reports and organizational structure
                  </p>
                </Card>
              )}
              
              <div 
                className="min-w-max py-10 px-6" 
                style={{ 
                  transform: `scale(${zoomLevel / 100})`, 
                  transformOrigin: 'top center',
                }}
              >
                <OrgChart 
                  data={displayEmployee} 
                  showAllReports={!focusedEmployee}
                  focusedEmployeeId={focusedEmployeeId}
                />
              </div>
            </motion.div>
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <div className="mt-4 text-center text-aramco-darkgray text-sm">
          <p>
            {focusedEmployee ? 
              "Click on any employee to view their detailed profile or team badges to view team details." :
              "Click on any employee to view their detailed profile or team badges to view team details. Use the search to find specific employees."}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrgChartPage;
