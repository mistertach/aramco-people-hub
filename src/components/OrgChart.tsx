
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, User, Users } from 'lucide-react';
import { EmployeeType, getTeamById } from '../data/employees';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OrgChartProps {
  data: EmployeeType;
  level?: number;
}

const OrgChart = ({ data, level = 0 }: OrgChartProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
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
    // Navigate to team page with team ID
    navigate(`/team/${teamId}`);
  };

  return (
    <div className={`org-chart-node ${level === 0 ? 'pt-6' : 'pt-2'}`}>
      <div 
        className={`org-node cursor-pointer transition-all duration-300 hover:shadow-md ${
          level === 0 ? 'bg-aramco-blue bg-opacity-5 border-aramco-blue' : ''
        }`}
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
            <h4 className="text-base font-medium text-aramco-darkblue truncate">
              {data.name}
            </h4>
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
        <div className="pl-6 mt-2 border-l-2 border-aramco-gray animate-fade-in">
          {data.directReports?.map((report, index) => (
            <div 
              key={report.id} 
              className="relative mt-3 first:mt-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute -left-6 top-5 w-5 h-0.5 bg-aramco-gray"></div>
              <OrgChart data={report} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgChart;
