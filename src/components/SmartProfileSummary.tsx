
import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmployeeType } from '../data/employees';

interface SmartProfileSummaryProps {
  employee: EmployeeType;
}

const SmartProfileSummary = ({ employee }: SmartProfileSummaryProps) => {
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateSummary();
  }, [employee.id]);

  const generateSummary = () => {
    setIsGenerating(true);
    
    // This simulates an AI-generated summary
    // In a production app, this would call an AI service API
    setTimeout(() => {
      const generatedSummary = createSummary(employee);
      setSummary(generatedSummary);
      setIsGenerating(false);
    }, 1000);
  };

  const createSummary = (employee: EmployeeType): string => {
    // Simplified template-based generation
    // A real GenAI implementation would be more sophisticated
    
    const templates = [
      `${employee.name} is a ${employee.title} in the ${employee.department} department at Aramco, based in ${employee.location}.`,
      `As a ${employee.title}, ${employee.name} brings expertise in ${employee.skills?.slice(0, 3).join(', ') || 'various areas'} to the ${employee.department} team.`,
      `${employee.name} is a ${employee.title} with a focus on ${employee.interests?.slice(0, 2).join(' and ') || 'key industry areas'}.`,
      `Based in ${employee.location}, ${employee.name} serves as ${employee.title} and contributes to ${employee.projects?.length || 0} key initiatives within ${employee.department}.`,
    ];
    
    let summaryParts = [];
    
    // Basic intro
    summaryParts.push(templates[Math.floor(Math.random() * templates.length)]);
    
    // Add skills if available
    if (employee.skills && employee.skills.length > 0) {
      const skillsPhrase = `Their primary expertise includes ${employee.skills.slice(0, 3).join(', ')}.`;
      summaryParts.push(skillsPhrase);
    }
    
    // Add projects if available
    if (employee.projects && employee.projects.length > 0) {
      const projectNames = employee.projects.map(p => p.name).slice(0, 2);
      const projectsPhrase = `${employee.name} has contributed to notable projects including ${projectNames.join(' and ')}.`;
      summaryParts.push(projectsPhrase);
    }
    
    // Add achievements if available
    if (employee.achievements && employee.achievements.length > 0) {
      const achievementPhrase = `Their accomplishments include ${employee.achievements[0].title}.`;
      summaryParts.push(achievementPhrase);
    }
    
    // Add mentoring info if available
    if (employee.mentoring && employee.mentoring.available) {
      const mentoringPhrase = `${employee.name} is available for mentoring in ${employee.mentoring.topics?.join(', ') || 'various areas'}.`;
      summaryParts.push(mentoringPhrase);
    }
    
    return summaryParts.join(' ');
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="w-5 h-5 text-aramco-blue mr-2" />
          <h3 className="text-xl font-medium text-aramco-darkblue">AI-Generated Profile Summary</h3>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={generateSummary}
          disabled={isGenerating}
          className="h-8 px-2"
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>
      
      <div className="relative min-h-24 bg-white bg-opacity-50 rounded-xl p-4">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full min-h-16">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aramco-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-aramco-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-aramco-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-aramco-darkgray leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
      
      <div className="mt-3 text-xs text-aramco-darkgray opacity-70 flex items-center">
        <Sparkles className="w-3 h-3 mr-1" />
        <span>Generated by AI based on profile data and company information</span>
      </div>
    </div>
  );
};

export default SmartProfileSummary;
