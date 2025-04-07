
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeType, orgChartData } from '../data/employees';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ReportingLineProps {
  employeeId: string;
}

export const ReportingLine = ({ employeeId }: ReportingLineProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  // Find reporting chain from CEO to the current employee
  const findReportingChain = (
    rootEmployee: EmployeeType, 
    targetId: string, 
    chain: EmployeeType[] = []
  ): EmployeeType[] | null => {
    if (rootEmployee.id === targetId) return [...chain, rootEmployee];
    
    if (rootEmployee.directReports) {
      for (const report of rootEmployee.directReports) {
        const result = findReportingChain(report, targetId, [...chain, rootEmployee]);
        if (result) return result;
      }
    }
    
    return null;
  };
  
  // Get reporting chain starting from the CEO
  const reportingChain = findReportingChain(orgChartData, employeeId);
  
  if (!reportingChain || reportingChain.length <= 1) return null;

  // Generate organization level name for each position
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
  
  return (
    <Card className="mb-6 overflow-hidden animate-fade-in">
      <div 
        className="flex justify-between items-center p-4 bg-aramco-blue bg-opacity-10 border-b border-aramco-gray cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-aramco-darkblue font-medium flex items-center">
          Reporting Line to CEO
        </h3>
        <button className="text-aramco-darkgray">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="flex flex-col items-start space-y-3">
            {reportingChain.map((employee, index) => (
              <div key={employee.id} className="flex items-center w-full">
                {index > 0 && <ArrowDown className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />}
                <Badge 
                  variant={index === reportingChain.length - 1 ? "default" : "outline"}
                  className={`cursor-pointer flex-grow text-left justify-start px-3 py-1.5 ${
                    index === reportingChain.length - 1 
                      ? "bg-aramco-blue hover:bg-aramco-darkblue" 
                      : "bg-aramco-blue/10 hover:bg-aramco-blue text-aramco-darkblue hover:text-white"
                  }`}
                  onClick={() => navigate(`/employee/${employee.id}`)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{employee.name}</span>
                    <span className="text-xs opacity-80">{employee.title} • {getOrganizationLevel(index)}</span>
                  </div>
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ReportingLine;
