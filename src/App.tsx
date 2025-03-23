
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
