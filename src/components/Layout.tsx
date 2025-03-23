
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Users, Network, Lightbulb } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', label: 'Search', icon: Search },
    { path: '/results', label: 'Results', icon: Users },
    { path: '/org-chart', label: 'Org Chart', icon: Network },
    { path: '/mentoring', label: 'Mentoring', icon: Lightbulb },
  ];

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-aramco-lightgray to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-70 backdrop-blur-md border-b border-aramco-gray shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-aramco-blue font-display text-2xl font-semibold">Aramco</span>
            <span className="text-aramco-darkblue font-display text-2xl font-light">Directory</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'text-aramco-blue font-medium bg-aramco-blue bg-opacity-5' 
                    : 'text-aramco-darkgray hover:text-aramco-blue'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white bg-opacity-90 backdrop-blur-md border-t border-aramco-gray">
        <div className="flex justify-around items-center">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-5 ${
                isActive(item.path) 
                  ? 'text-aramco-blue' 
                  : 'text-aramco-darkgray'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pt-24 pb-20 md:pb-10 container mx-auto px-4">
        <div className="animate-fade-up">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
