
import { useState, useEffect } from 'react';
import { Sparkles, Users, Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamType, getTeamMembers, EmployeeType } from '../data/employees';

interface TeamInsightsProps {
  team: TeamType;
}

const TeamInsights = ({ team }: TeamInsightsProps) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [teamMembers, setTeamMembers] = useState<EmployeeType[]>([]);

  useEffect(() => {
    if (team) {
      const members = getTeamMembers(team.id);
      setTeamMembers(members);
      generateInsights(team, members);
    }
  }, [team.id]);

  const generateInsights = (teamData: TeamType, members: EmployeeType[]) => {
    setIsGenerating(true);
    
    // This simulates an AI-generated insights
    // In a production app, this would call an AI service API
    setTimeout(() => {
      const generatedInsights = createTeamInsights(teamData, members);
      setInsights(generatedInsights);
      setIsGenerating(false);
    }, 1500);
  };

  const createTeamInsights = (teamData: TeamType, members: EmployeeType[]): string[] => {
    // Template-based insights generation
    // A real GenAI implementation would be more sophisticated
    
    const insights = [];
    
    // Team composition insight
    insights.push(
      `The ${teamData.name} team has ${members.length} members, primarily from the ${getMostCommonDepartment(members)} department.`
    );
    
    // Skills insight
    const topSkills = getTopTeamSkills(members);
    insights.push(
      `This team's expertise is concentrated in ${topSkills.slice(0, 3).join(', ')}.`
    );
    
    // Project status insight
    if (teamData.projects && teamData.projects.length > 0) {
      const activeProjects = teamData.projects.filter(p => p.status === 'active').length;
      insights.push(
        `The team is currently working on ${activeProjects} active ${activeProjects === 1 ? 'project' : 'projects'}: ${teamData.projects.filter(p => p.status === 'active').map(p => p.name).join(', ')}.`
      );
    }
    
    // Leadership insight
    const leaders = members.filter(m => m.title.includes('VP') || m.title.includes('Director') || m.title.includes('Senior') || m.title.includes('Lead'));
    if (leaders.length > 0) {
      insights.push(
        `The team is led by ${leaders.map(l => l.name).join(', ')}.`
      );
    }
    
    // Locations insight
    const locations = Array.from(new Set(members.map(m => m.location)));
    if (locations.length > 1) {
      insights.push(
        `Team members are distributed across ${locations.length} locations: ${locations.join(', ')}.`
      );
    } else if (locations.length === 1) {
      insights.push(
        `All team members are based in ${locations[0]}.`
      );
    }
    
    return insights;
  };

  const getMostCommonDepartment = (members: EmployeeType[]): string => {
    const departments: Record<string, number> = {};
    
    members.forEach(member => {
      departments[member.department] = (departments[member.department] || 0) + 1;
    });
    
    let topDepartment = '';
    let topCount = 0;
    
    Object.entries(departments).forEach(([dept, count]) => {
      if (count > topCount) {
        topDepartment = dept;
        topCount = count;
      }
    });
    
    return topDepartment;
  };

  const getTopTeamSkills = (members: EmployeeType[]): string[] => {
    const skills: Record<string, number> = {};
    
    members.forEach(member => {
      member.skills?.forEach(skill => {
        skills[skill] = (skills[skill] || 0) + 1;
      });
    });
    
    return Object.entries(skills)
      .sort((a, b) => b[1] - a[1])
      .map(([skill]) => skill);
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="w-5 h-5 text-aramco-blue mr-2" />
          <h3 className="text-xl font-medium text-aramco-darkblue">Team Insights</h3>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => generateInsights(team, teamMembers)}
          disabled={isGenerating}
          className="h-8 px-2"
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>
      
      <div className="bg-white bg-opacity-50 rounded-xl p-4">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full min-h-32">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aramco-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-aramco-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-aramco-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <Lightbulb className="w-5 h-5 text-aramco-blue mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-aramco-darkgray">{insight}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-5">
        <h4 className="text-lg font-medium text-aramco-darkblue flex items-center mb-3">
          <Users className="w-4 h-4 mr-2 text-aramco-blue" />
          Team Members
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {teamMembers.map(member => (
            <div key={member.id} className="flex items-center p-2 bg-white bg-opacity-50 rounded-lg">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-aramco-blue bg-opacity-10 mr-2 flex-shrink-0">
                {member.photoUrl ? (
                  <img 
                    src={member.photoUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-aramco-blue font-semibold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-aramco-darkblue text-sm truncate">{member.name}</p>
                <p className="text-xs text-aramco-darkgray truncate">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-3 text-xs text-aramco-darkgray opacity-70 flex items-center">
        <Sparkles className="w-3 h-3 mr-1" />
        <span>Generated by AI based on team composition and company data</span>
      </div>
    </div>
  );
};

export default TeamInsights;
