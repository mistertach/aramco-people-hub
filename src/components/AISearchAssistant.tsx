
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchEmployees, EmployeeType } from '../data/employees';
import { Sparkles, Search, Rocket, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const AISearchAssistant = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<EmployeeType[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const suggestedQuestions = [
    {
      icon: <Rocket className="w-4 h-4" />,
      text: "Who can I talk to about quantum computing?",
      keywords: "technology quantum computing expert"
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "Which teams are working on cybersecurity?",
      keywords: "cybersecurity IT security"
    },
    {
      icon: <Leaf className="w-4 h-4" />,
      text: "Find experts in sustainability initiatives",
      keywords: "sustainability environment green"
    }
  ];

  const processNaturalLanguageQuery = (query: string) => {
    // This is a simplified implementation of NLP search
    // In a real app, this would connect to an AI service
    
    const keywords = extractKeywords(query);
    console.log('Extracted keywords:', keywords);
    
    // Search employees based on extracted keywords
    const searchResults = searchEmployees(keywords.join(' '));
    
    return {
      searchResults,
      interpretation: `I found ${searchResults.length} people matching "${keywords.join(', ')}"`
    };
  };

  const extractKeywords = (query: string): string[] => {
    // Simple keyword extraction (would be more sophisticated with real NLP)
    const lowerQuery = query.toLowerCase();
    
    // Skills extraction
    const skills = ['cybersecurity', 'it', 'security', 'engineering', 'finance', 
                   'petroleum', 'data', 'analysis', 'hr', 'leadership', 'sap'];
    const extractedSkills = skills.filter(skill => lowerQuery.includes(skill));
    
    // Location extraction
    const locations = ['dhahran', 'riyadh', 'jeddah', 'saudi', 'arabia', 'dubai'];
    const extractedLocations = locations.filter(location => lowerQuery.includes(location));
    
    // Department extraction
    const departments = ['hr', 'finance', 'technical', 'upstream', 'engineering', 'it'];
    const extractedDepartments = departments.filter(dept => lowerQuery.includes(dept));
    
    // Role extraction
    const roles = ['manager', 'director', 'vp', 'senior', 'specialist', 'analyst', 'engineer'];
    const extractedRoles = roles.filter(role => lowerQuery.includes(role));
    
    return [...extractedSkills, ...extractedLocations, ...extractedDepartments, ...extractedRoles];
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      try {
        const { searchResults, interpretation } = processNaturalLanguageQuery(query);
        setResults(searchResults);
        setShowResults(true);
        
        toast({
          title: "AI Search Results",
          description: interpretation,
          duration: 3000,
        });
      } catch (error) {
        console.error('Error processing search query:', error);
        toast({
          title: "Search Error",
          description: "Sorry, I couldn't process that query. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSuggestedQuestion = (questionData: typeof suggestedQuestions[0]) => {
    setQuery(questionData.text);
    
    // Use the keywords directly for search to ensure relevant results
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const searchResults = searchEmployees(questionData.keywords);
        setResults(searchResults);
        setShowResults(true);
        
        toast({
          title: "AI Search Results",
          description: `I found ${searchResults.length} people related to this topic`,
          duration: 3000,
        });
      } catch (error) {
        console.error('Error processing search query:', error);
        toast({
          title: "Search Error",
          description: "Sorry, I couldn't process that query. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleEmployeeClick = (id: string) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="glass-card p-6 rounded-2xl shadow-sm">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-aramco-blue mr-2" />
        <h2 className="text-xl font-medium text-aramco-darkblue">AI-Powered Search</h2>
      </div>
      
      <div className="mb-4">
        <Textarea 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a natural language question like 'Who's the expert on cybersecurity in Dhahran?' or 'Find me IT managers'..."
          className="min-h-20"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleSuggestedQuestion(question)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-aramco-blue bg-opacity-10 hover:bg-opacity-20 text-aramco-darkblue rounded-full transition-colors duration-200"
          >
            {question.icon}
            {question.text}
          </button>
        ))}
      </div>
      
      <Button 
        onClick={handleSearch} 
        disabled={isLoading || !query.trim()}
        className="w-full"
      >
        {isLoading ? 'Processing...' : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Search with AI
          </>
        )}
      </Button>
      
      {showResults && results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-aramco-darkblue font-medium">
            Found {results.length} {results.length === 1 ? 'match' : 'matches'}
          </h3>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.map(employee => (
              <div
                key={employee.id}
                onClick={() => handleEmployeeClick(employee.id)}
                className="flex items-center p-3 rounded-lg bg-white hover:bg-aramco-blue hover:bg-opacity-5 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-aramco-blue bg-opacity-10 mr-3 flex-shrink-0">
                  {employee.photoUrl ? (
                    <img 
                      src={employee.photoUrl} 
                      alt={employee.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-aramco-blue text-lg font-semibold">
                      {employee.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-aramco-darkblue">{employee.name}</h4>
                  <p className="text-sm text-aramco-darkgray">{employee.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {showResults && results.length === 0 && (
        <div className="mt-6 p-4 text-center bg-aramco-gray bg-opacity-10 rounded-lg">
          <p className="text-aramco-darkgray">No matching employees found. Try a different query.</p>
        </div>
      )}
    </div>
  );
};

export default AISearchAssistant;
