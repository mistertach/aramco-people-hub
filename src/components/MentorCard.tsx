
import { Link } from 'react-router-dom';
import { EmployeeType } from '../data/employees';
import { Users, ChevronRight } from 'lucide-react';

interface MentorCardProps {
  mentor: EmployeeType;
  index: number;
}

const MentorCard = ({ mentor, index }: MentorCardProps) => {
  const animationDelay = `${index * 0.05}s`;

  return (
    <Link 
      to={`/employee/${mentor.id}`}
      className="block"
      style={{ 
        animationDelay,
        animation: 'fade-up 0.5s ease-out forwards',
        opacity: 0
      }}
    >
      <div className="glass-card p-5 h-full flex flex-col rounded-xl hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3 mb-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-aramco-blue bg-opacity-10 overflow-hidden">
              {mentor.photoUrl ? (
                <img 
                  src={mentor.photoUrl} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-aramco-blue font-semibold text-xl">
                  {mentor.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-display font-medium text-lg text-aramco-darkblue">
              {mentor.name}
            </h3>
            <p className="text-aramco-darkgray text-sm">
              {mentor.title}
            </p>
          </div>
          
          <div className="text-aramco-darkgray">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mt-2 mb-4 border-t border-aramco-gray pt-3">
          <h4 className="text-sm font-medium text-aramco-darkblue mb-2">Mentoring Topics</h4>
          <div className="flex flex-wrap gap-1.5">
            {mentor.mentoring?.topics?.slice(0, 3).map((topic, i) => (
              <span 
                key={i}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-aramco-blue bg-opacity-10 text-aramco-darkblue"
              >
                {topic}
              </span>
            ))}
            {mentor.mentoring?.topics && mentor.mentoring.topics.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-aramco-gray text-aramco-darkgray">
                +{mentor.mentoring.topics.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-center text-aramco-blue text-sm font-medium">
          <Users className="w-4 h-4 mr-1.5" />
          <span>View Mentor Profile</span>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
