
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { EmployeeType } from '../data/employees';

interface EmployeeCardProps {
  employee: EmployeeType;
  index: number;
}

const EmployeeCard = ({ employee, index }: EmployeeCardProps) => {
  const animationDelay = `${index * 0.05}s`;

  return (
    <Link 
      to={`/employee/${employee.id}`}
      className="employee-card block"
      style={{ 
        animationDelay,
        animation: 'fade-up 0.5s ease-out forwards',
        opacity: 0
      }}
    >
      <div className="glass-card p-6 h-full flex flex-col">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-aramco-blue bg-opacity-10 overflow-hidden">
              {employee.photoUrl ? (
                <img 
                  src={employee.photoUrl} 
                  alt={employee.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-aramco-blue font-semibold text-xl">
                  {employee.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-display font-medium text-xl text-aramco-darkblue">
              {employee.name}
            </h3>
            <p className="text-aramco-darkgray mt-1">
              {employee.title}
            </p>
            <div className="mt-2 flex items-center text-sm text-aramco-darkgray">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{employee.location}</span>
            </div>
          </div>
          
          <div className="text-aramco-darkgray">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-aramco-gray grid grid-cols-2 gap-3">
          <div className="flex items-center text-sm">
            <Mail className="w-4 h-4 mr-2 text-aramco-blue" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2 text-aramco-blue" />
            <span>{employee.phone}</span>
          </div>
        </div>
        
        {employee.skills && employee.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {employee.skills.slice(0, 3).map((skill, i) => (
              <span 
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-aramco-blue bg-opacity-10 text-aramco-darkblue"
              >
                {skill}
              </span>
            ))}
            {employee.skills.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-aramco-gray text-aramco-darkgray">
                +{employee.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default EmployeeCard;
