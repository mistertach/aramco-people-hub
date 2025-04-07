
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, User, Users } from 'lucide-react';
import { EmployeeType, getTeamById } from '../data/employees';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OrgChartProps {
  data: EmployeeType;
  level?: number;
  isLastChild?: boolean;
}

const OrgChart = ({ data, level = 0, isLastChild = false }: OrgChartProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 3);
  const navigate = useNavigate();
  const hasChildren = data.directReports && data.directReports.length > 0;
  
  const team = data.teamId ? getTeamById(data.teamId) : undefined;

  const handleNodeClick = (e: React.MouseEvent, employeeId: string) => {
    e.stopPropagation();
    navigate(`/employee/${employeeId}`);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleTeamClick = (e: React.MouseEvent, teamId: string) => {
    e.stopPropagation();
    navigate(`/team/${teamId}`);
  };

  // Determine the appropriate node class based on level
  const getLevelClass = () => {
    switch(level) {
      case 0: return 'bg-aramco-blue/10 border-aramco-blue text-aramco-darkblue font-semibold';
      case 1: return 'bg-emerald-50 border-emerald-400 text-emerald-800';
      case 2: return 'bg-purple-50 border-purple-400 text-purple-800';
      case 3: return 'bg-amber-50 border-amber-400 text-amber-800';
      default: return 'bg-gray-50 border-gray-400 text-gray-800';
    }
  };

  const getLevelTitle = () => {
    switch(level) {
      case 0: return 'Chairman & Chief Executive Officer';
      case 1: return 'Executive Management';
      case 2: return 'Department';
      case 3: return 'Division';
      default: return 'Group';
    }
  };

  return (
    <div className={`org-chart-node ${level === 0 ? 'flex justify-center' : ''}`}>
      <div className="relative">
        <div 
          className={`org-node cursor-pointer transition-all duration-300 border-l-4 ${getLevelClass()} hover:shadow-md mb-2`}
          onClick={(e) => handleNodeClick(e, data.id)}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              {data.photoUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={data.photoUrl} 
                    alt={data.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-aramco-blue bg-opacity-10 flex items-center justify-center">
                  <User className="w-5 h-5 text-aramco-blue" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="text-base font-medium truncate">
                  {data.name}
                </h4>
                {level <= 2 && (
                  <span className="text-xs text-gray-500 ml-2">{getLevelTitle()}</span>
                )}
              </div>
              <p className="text-sm text-aramco-darkgray truncate">
                {data.title}
              </p>
              
              {team && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge 
                        className="mt-1 bg-aramco-blue bg-opacity-20 text-aramco-blue hover:bg-aramco-blue hover:text-white cursor-pointer"
                        onClick={(e) => handleTeamClick(e, team.id)}
                      >
                        <Users className="w-3 h-3 mr-1" />
                        {team.name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{team.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            {hasChildren && (
              <button 
                onClick={handleToggle} 
                className="ml-2 p-1 rounded-full hover:bg-aramco-gray transition-colors"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-aramco-darkgray" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-aramco-darkgray" />
                )}
              </button>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className={`tree-children pl-8 ${level === 0 ? 'flex justify-center space-x-4' : ''}`}>
            {data.directReports?.map((report, index, array) => (
              <div 
                key={report.id}
                className={`relative ${level === 0 ? 'tree-branch' : 'ml-4 border-l border-dashed border-aramco-gray pt-2'}`}
              >
                <OrgChart 
                  data={report} 
                  level={level + 1} 
                  isLastChild={index === array.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgChart;
