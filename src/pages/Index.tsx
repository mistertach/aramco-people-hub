
import { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import AISearchAssistant from '../components/AISearchAssistant';
import { motion } from 'framer-motion';
import { Users, Zap, Brain, Network } from 'lucide-react';

const Index = () => {
  const [showAISearch, setShowAISearch] = useState(false);
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-medium text-aramco-darkblue mb-4"
          >
            Aramco <span className="text-aramco-blue">Directory</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-aramco-darkgray max-w-2xl mx-auto mb-8"
          >
            Find the right people, skills, and expertise across the organization.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <SearchBar large />
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => setShowAISearch(!showAISearch)}
            className="flex items-center mx-auto text-aramco-blue hover:text-aramco-darkblue transition-colors"
          >
            <Brain className="w-5 h-5 mr-2" />
            <span>{showAISearch ? 'Hide AI Search Assistant' : 'Try AI Search Assistant'}</span>
          </motion.button>
        </div>
        
        {showAISearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <AISearchAssistant />
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 rounded-2xl text-center"
          >
            <div className="w-12 h-12 rounded-full bg-aramco-blue bg-opacity-10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-aramco-blue" />
            </div>
            <h2 className="text-xl font-display font-medium text-aramco-darkblue mb-2">
              Employee Profiles
            </h2>
            <p className="text-aramco-darkgray">
              Complete employee information including skills, projects, and contact details.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 rounded-2xl text-center"
          >
            <div className="w-12 h-12 rounded-full bg-aramco-blue bg-opacity-10 flex items-center justify-center mx-auto mb-4">
              <Network className="w-6 h-6 text-aramco-blue" />
            </div>
            <h2 className="text-xl font-display font-medium text-aramco-darkblue mb-2">
              Organization Chart
            </h2>
            <p className="text-aramco-darkgray">
              Explore the company structure and reporting relationships visually.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6 rounded-2xl text-center"
          >
            <div className="w-12 h-12 rounded-full bg-aramco-blue bg-opacity-10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-aramco-blue" />
            </div>
            <h2 className="text-xl font-display font-medium text-aramco-darkblue mb-2">
              Mentoring Program
            </h2>
            <p className="text-aramco-darkgray">
              Connect with mentors across the organization to grow your skills and career.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
