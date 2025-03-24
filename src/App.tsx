
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import EmployeeProfile from './pages/EmployeeProfile';
import SearchResults from './pages/SearchResults';
import OrgChart from './pages/OrgChart';
import Mentoring from './pages/Mentoring';
import Team from './pages/Team';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

/*
To create a static build and deploy to Hostinger:
1. Run: npm run build
2. The build folder will contain all static files
3. Download the build folder
4. Upload the contents to your Hostinger hosting
5. Make sure to configure Hostinger for SPA routing:
   - Create a .htaccess file in the root directory with:
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/org-chart" element={<OrgChart />} />
        <Route path="/mentoring" element={<Mentoring />} />
        <Route path="/team/:id" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
