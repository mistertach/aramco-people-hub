
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import AISearchAssistant from '../components/AISearchAssistant';
import EmployeeCard from '../components/EmployeeCard';
import { searchEmployees, employeesData, EmployeeType } from '../data/employees';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAISearch, setShowAISearch] = useState(true); // Show AI search component by default

  useEffect(() => {
    // Simulate API call with a slight delay
    setLoading(true);
    const timer = setTimeout(() => {
      // If no query is provided, show all employees
      const searchResults = query.trim() === '' 
        ? employeesData 
        : searchEmployees(query);
      setResults(searchResults);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-medium text-aramco-darkblue mb-4">
            {query ? 'Search Results' : 'All Employees'}
          </h1>
          <SearchBar className="mb-4" />
          
          <div className="bg-aramco-blue bg-opacity-5 rounded-lg px-4 py-3 text-aramco-darkblue flex items-center">
            <Users className="w-5 h-5 mr-2" />
            {loading ? (
              <span>{query ? `Searching for '${query}'...` : 'Loading all employees...'}</span>
            ) : (
              <span>
                {query
                  ? `Found ${results.length} ${results.length === 1 ? 'employee' : 'employees'} for '${query}'`
                  : `Showing all ${results.length} employees`}
              </span>
            )}
          </div>
        </div>

        {showAISearch && (
          <div className="mb-8">
            <AISearchAssistant />
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="employee-card animate-pulse">
                <div className="glass-card p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-aramco-gray"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-aramco-gray rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-aramco-gray rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-aramco-gray rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-aramco-gray">
                    <div className="h-4 bg-aramco-gray rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-aramco-gray rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {results.map((employee, index) => (
              <EmployeeCard key={employee.id} employee={employee} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-aramco-gray bg-opacity-20 mx-auto flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-aramco-darkgray" />
            </div>
            <h3 className="text-xl font-display font-medium text-aramco-darkblue mb-2">
              No employees found
            </h3>
            <p className="text-aramco-darkgray max-w-md mx-auto">
              We couldn't find any employees matching '{query}'. Try using different keywords or check for typos.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
