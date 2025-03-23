
import { motion } from 'framer-motion';
import { Calendar, User, Clock, CheckCircle, CircleDashed, CircleDot } from 'lucide-react';
import { TeamType } from '../data/employees';

interface TeamDetailProps {
  team: TeamType;
}

const TeamDetail = ({ team }: TeamDetailProps) => {
  // Get project status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'planned':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CircleDot className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'planned':
        return <CircleDashed className="w-4 h-4" />;
      default:
        return <CircleDot className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-display font-medium text-aramco-darkblue mb-2">
          {team.name}
        </h2>
        <p className="text-aramco-darkgray">
          {team.description}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium text-aramco-darkblue mb-3 flex items-center">
          <User className="w-5 h-5 mr-2 text-aramco-blue" />
          Team Composition
        </h3>
        <p className="text-aramco-darkgray mb-2">
          This team consists of {team.members.length} members across various departments.
        </p>
      </div>

      {team.projects && team.projects.length > 0 && (
        <div>
          <h3 className="text-xl font-medium text-aramco-darkblue mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-aramco-blue" />
            Projects
          </h3>
          
          <div className="space-y-4">
            {team.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white bg-opacity-70 p-4 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-aramco-darkblue mb-1">
                      {project.name}
                    </h4>
                    <p className="text-sm text-aramco-darkgray">
                      {project.description}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs flex items-center ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeamDetail;
