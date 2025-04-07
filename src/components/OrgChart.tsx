
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, User, Users, ArrowDown } from 'lucide-react';
import { EmployeeType, getTeamById, getEmployeeById } from '../data/employees';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';

interface OrgChartProps {
  data: EmployeeType;
  level?: number;
  showAllReports?: boolean;
  focusedEmployeeId?: string;
}

const OrgChart = ({ data, level = 0, showAllReports = false, focusedEmployeeId }: OrgChartProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 1 || showAllReports);
  const navigate = useNavigate();
  const hasDirectReports = data.directReports && data.directReports.length > 0;
  
  const team = data.teamId ? getTeamById(data.teamId) : undefined;

  // Calculate direct and indirect reports count
  const directReportsCount = data.directReports?.length || 0;
  
  const totalReportsCount = useMemo(() => {
    let count = directReportsCount;
    
    const countReports = (reports: EmployeeType[] | undefined): number => {
      if (!reports) return 0;
      
      let subCount = 0;
      for (const report of reports) {
        subCount += 1;
        subCount += countReports(report.directReports);
      }
      return subCount;
    };
    
    count += countReports(data.directReports);
    return count;
  }, [data.directReports, directReportsCount]);
  
  // Get organization level name
  const getOrganizationLevel = (level: number): string => {
    switch(level) {
      case 0: return 'Corporate';
      case 1: return 'Senior Vice President';
      case 2: return 'Vice President';
      case 3: return 'Department';
      case 4: return 'Division';
      case 5: return 'Section';
      default: return level > 5 ? 'Unit/Group' : 'Executive';
    }
  };

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

  // Generate reporting line to show hierarchy
  const renderReportingLine = () => {
    if (!focusedEmployeeId || focusedEmployeeId === data.id) return null;
    
    const findReportingChain = (
      employee: EmployeeType, 
      targetId: string, 
      chain: EmployeeType[] = []
    ): EmployeeType[] | null => {
      if (employee.id === targetId) return [...chain, employee];
      
      if (employee.directReports) {
        for (const report of employee.directReports) {
          const result = findReportingChain(report, targetId, [...chain, employee]);
          if (result) return result;
        }
      }
      
      return null;
    };
    
    const reportingChain = findReportingChain(data, focusedEmployeeId);
    
    if (!reportingChain) return null;
    
    return (
      <div className="reporting-line mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-aramco-darkblue mb-2">Reporting Line:</h3>
        <div className="flex flex-col items-start space-y-2">
          {reportingChain.map((employee, index) => (
            <div key={employee.id} className="flex items-center">
              {index > 0 && <ArrowDown className="w-4 h-4 mx-2 text-gray-400" />}
              <Badge 
                className="cursor-pointer bg-aramco-blue/20 hover:bg-aramco-blue text-aramco-darkblue hover:text-white"
                onClick={() => navigate(`/employee/${employee.id}`)}
              >
                {employee.name} - {employee.title}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="org-chart-node">
      {focusedEmployeeId === data.id && renderReportingLine()}
      
      <Card 
        className={`org-node cursor-pointer transition-all duration-300 border-l-4 ${getLevelClass()} hover:shadow-md mb-4`}
        onClick={(e) => handleNodeClick(e, data.id)}
      >
        <div className="p-4">
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
                <span className="text-xs text-gray-500 ml-2">{getOrganizationLevel(level)}</span>
              </div>
              <p className="text-sm text-aramco-darkgray truncate">
                {data.title}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-1">
                {team && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          className="bg-aramco-blue bg-opacity-20 text-aramco-blue hover:bg-aramco-blue hover:text-white cursor-pointer"
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
                
                {hasDirectReports && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline">
                          {directReportsCount} direct {directReportsCount === 1 ? 'report' : 'reports'}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total employees in organization: {totalReportsCount}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            
            {hasDirectReports && (
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
      </Card>

      {hasDirectReports && isExpanded && (
        <div className="tree-children pl-8 pt-2 border-l border-dashed border-aramco-gray">
          {data.directReports?.map((report) => (
            <div key={report.id} className="mb-4">
              <OrgChart 
                data={report} 
                level={level + 1}
                showAllReports={false} 
                focusedEmployeeId={focusedEmployeeId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgChart;
