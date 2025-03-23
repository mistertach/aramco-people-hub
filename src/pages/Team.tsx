
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Users } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { getTeamById, TeamType } from '../data/employees';
import TeamDetail from '../components/TeamDetail';
import TeamInsights from '../components/TeamInsights';

const Team = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const teamData = getTeamById(id);
      if (teamData) {
        setTeam(teamData);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aramco-blue"></div>
        </div>
      </Layout>
    );
  }

  if (!team) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-aramco-darkblue mb-2">Team Not Found</h2>
          <p className="text-aramco-darkgray mb-6">The team you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/org-chart')}>
            Return to Org Chart
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate('/org-chart')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Org Chart
          </Button>
          
          <h1 className="text-3xl font-display font-medium text-aramco-darkblue mb-2 flex items-center">
            <Users className="w-7 h-7 mr-2 text-aramco-blue" />
            {team.name}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamDetail team={team} />
          <TeamInsights team={team} />
        </div>
      </div>
    </Layout>
  );
};

export default Team;
