
import { useState } from 'react';
import Layout from '../components/Layout';
import { searchEmployees, EmployeeType } from '../data/employees';
import { Users, Filter, Search } from 'lucide-react';
import MentorCard from '../components/MentorCard';

const Mentoring = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  // All available mentoring topics
  const allTopics = [
    "Leadership", "Technical Skills", "Career Development", "Professional Growth",
    "Management", "Industry Knowledge", "Engineering", "Digital Transformation",
    "HR Strategy", "Financial Management"
  ];
  
  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  // Filter employees who are available for mentoring
  const mentors = searchEmployees(searchQuery).filter(employee => 
    employee.mentoring?.available && 
    (selectedTopics.length === 0 || 
      selectedTopics.some(topic => 
        employee.mentoring?.topics?.some(t => 
          t.toLowerCase().includes(topic.toLowerCase())
        )
      )
    )
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-medium text-aramco-darkblue mb-3">
            Find Your Mentor
          </h1>
          <p className="text-aramco-darkgray max-w-2xl mx-auto">
            Connect with experienced professionals across Aramco who are ready to help you grow your career through personalized mentoring relationships.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="glass-card p-4 rounded-2xl mb-8">
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-aramco-darkgray" />
              </div>
              <input 
                type="text" 
                placeholder="Search mentors by name, department or skill..."
                className="block w-full pl-10 pr-3 py-2 border border-aramco-gray rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-aramco-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center mb-3">
              <Filter className="w-4 h-4 mr-2 text-aramco-darkblue" />
              <h3 className="text-aramco-darkblue font-medium">Filter by Mentoring Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTopics.includes(topic)
                      ? 'bg-aramco-blue text-white'
                      : 'bg-aramco-gray bg-opacity-20 text-aramco-darkgray hover:bg-opacity-30'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-medium text-aramco-darkblue flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Available Mentors
            </h2>
            <p className="text-aramco-darkgray">
              {mentors.length} {mentors.length === 1 ? 'mentor' : 'mentors'} found
            </p>
          </div>
          
          {mentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mentors.map((mentor, index) => (
                <MentorCard key={mentor.id} mentor={mentor} index={index} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-aramco-gray bg-opacity-20 mx-auto flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-aramco-darkgray" />
              </div>
              <h3 className="text-xl font-medium mb-2">No mentors found</h3>
              <p className="text-aramco-darkgray mb-4">
                Try adjusting your search or filters to find mentors that match your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mentoring;
