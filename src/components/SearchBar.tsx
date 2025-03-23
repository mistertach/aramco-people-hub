
import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  large?: boolean;
  className?: string;
}

const SearchBar = ({ large = false, className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative ${large ? 'animate-fade-up' : ''}`}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className={`text-aramco-darkgray ${large ? 'w-6 h-6' : 'w-5 h-5'}`} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees by name, skills, department..."
            className={`aramco-input pl-12 pr-20 ${
              large ? 'py-4 text-lg rounded-2xl shadow-lg' : ''
            }`}
            autoFocus={large}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-4">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full text-aramco-darkgray hover:bg-aramco-gray transition-colors duration-150"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1 rounded-full transition-colors duration-150 ${
                showFilters 
                  ? 'bg-aramco-blue text-white' 
                  : 'text-aramco-darkgray hover:bg-aramco-gray'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-3 p-4 bg-white rounded-xl shadow-md border border-aramco-gray animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-aramco-darkgray mb-1">Department</label>
                <select className="aramco-input">
                  <option value="">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="hr">Human Resources</option>
                  <option value="it">Information Technology</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-aramco-darkgray mb-1">Location</label>
                <select className="aramco-input">
                  <option value="">All Locations</option>
                  <option value="dhahran">Dhahran</option>
                  <option value="riyadh">Riyadh</option>
                  <option value="jeddah">Jeddah</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-aramco-darkgray mb-1">Skills</label>
                <select className="aramco-input">
                  <option value="">All Skills</option>
                  <option value="project-management">Project Management</option>
                  <option value="data-analysis">Data Analysis</option>
                  <option value="leadership">Leadership</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                type="button" 
                className="aramco-button-secondary mr-2"
                onClick={() => setShowFilters(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="aramco-button-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
