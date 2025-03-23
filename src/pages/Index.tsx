
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading with a slight delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-3xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-display font-medium text-aramco-darkblue mb-4">
            Aramco Directory
          </h1>
          <p className="text-xl text-aramco-darkgray max-w-lg mx-auto">
            Find colleagues, discover skills, and explore the organization.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <SearchBar large />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full"
        >
          {['Search', 'Connect', 'Discover', 'Collaborate'].map((item, index) => (
            <div 
              key={item}
              className="aspect-square flex flex-col items-center justify-center glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-md"
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              <div className={`w-12 h-12 rounded-full bg-aramco-blue bg-opacity-10 mb-4 flex items-center justify-center text-aramco-blue`}>
                {index === 0 && <span className="text-xl">🔍</span>}
                {index === 1 && <span className="text-xl">👥</span>}
                {index === 2 && <span className="text-xl">💡</span>}
                {index === 3 && <span className="text-xl">🤝</span>}
              </div>
              <h3 className="font-display font-medium text-aramco-darkblue text-lg">
                {item}
              </h3>
              <p className="text-sm text-aramco-darkgray mt-2">
                {index === 0 && "Find the right people"}
                {index === 1 && "Build your network"}
                {index === 2 && "Explore expertise"}
                {index === 3 && "Work together"}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
