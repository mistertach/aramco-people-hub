
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight, User } from 'lucide-react';
import { EmployeeType } from '../data/employees';

interface OrgChartProps {
  data: EmployeeType;
  level?: number;
}

const OrgChart = ({ data, level = 0 }: OrgChartProps) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const navigate = useNavigate();
  const hasChildren = data.directReports && data.directReports.length > 0;

  const handleNodeClick = (e: React.MouseEvent, employeeId: string) => {
    e.stopPropagation();
    navigate(`/employee/${employeeId}`);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
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
