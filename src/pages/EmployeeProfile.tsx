import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SmartProfileSummary from '../components/SmartProfileSummary';
import ReportingLine from '../components/ReportingLine';
import { getEmployeeById, EmployeeType } from '../data/employees';
import { Mail, Phone, MapPin, User, Briefcase, Award, Heart, Code, Users, ChevronRight, Lightbulb, Trophy, MessageCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import EditProfile from '../components/EditProfile';

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (id) {
        const employeeData = getEmployeeById(id);
        setEmployee(employeeData || null);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-40 bg-aramco-gray rounded-2xl mb-6"></div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="glass-card p-6 rounded-2xl h-64"></div>
            </div>
            <div className="md:w-2/3">
              <div className="glass-card p-6 rounded-2xl h-64"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto text-center py-16">
          <div className="w-20 h-20 rounded-full bg-aramco-gray bg-opacity-20 mx-auto flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-aramco-darkgray" />
          </div>
          <h1 className="text-3xl font-display font-medium text-aramco-darkblue mb-2">
            Employee Not Found
          </h1>
          <p className="text-aramco-darkgray max-w-md mx-auto mb-6">
            We couldn't find an employee with the provided ID.
          </p>
          <Link to="/" className="aramco-button-primary inline-flex items-center">
            Return to Search
          </Link>
        </div>
      </Layout>
    );
  }

  const tabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SmartProfileSummary employee={employee} />
            
            {id && <ReportingLine employeeId={id} />}
            
            <div className="mt-6">
              {employee?.bio ? (
                <p className="text-aramco-darkgray">{employee.bio}</p>
              ) : (
                <p className="text-aramco-darkgray">No biography information available.</p>
              )}
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-aramco-darkblue font-medium mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Department
                </h3>
                <p>{employee?.department}</p>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-aramco-darkblue font-medium mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location
                </h3>
                <p>{employee?.location}</p>
              </div>
            </div>

            {employee?.responsibilities && (
              <div className="mt-6">
                <div className="glass-card p-4 rounded-xl">
                  <h3 className="text-aramco-darkblue font-medium mb-3 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Current Responsibilities
                  </h3>
                  <p className="text-aramco-darkgray">{employee.responsibilities}</p>
                </div>
              </div>
            )}
            
            {employee?.manager && (
              <div className="mt-6">
                <div className="glass-card p-4 rounded-xl">
                  <h3 className="text-aramco-darkblue font-medium mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Reports To
                  </h3>
                  <p>{employee.manager}</p>
                </div>
              </div>
            )}
          </motion.div>
        );
      
      case 'skills':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {employee?.skills && employee.skills.length > 0 ? (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-aramco-blue bg-opacity-10 text-aramco-darkblue"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-aramco-darkblue font-medium mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Top Skills
                  </h3>
                  <div className="space-y-3">
                    {employee.skills.slice(0, 3).map((skill, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-full bg-aramco-gray rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-aramco-blue h-2.5 rounded-full" 
                            style={{ width: `${95 - (i * 15)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-aramco-darkgray">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-aramco-darkgray">No skills information available.</p>
            )}
          </motion.div>
        );
      
      case 'interests':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {employee?.interests && employee.interests.length > 0 ? (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {employee.interests.map((interest, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-aramco-green bg-opacity-10 text-aramco-green"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-aramco-darkblue font-medium mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Professional Interests
                  </h3>
                  <ul className="space-y-2 list-disc list-inside text-aramco-darkgray">
                    {employee.interests.map((interest, i) => (
                      <li key={i}>{interest}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-aramco-darkgray">No interests information available.</p>
            )}
          </motion.div>
        );
      
      case 'projects':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {employee?.projects && employee.projects.length > 0 ? (
              <div className="space-y-4">
                {employee.projects.map((project, index) => (
                  <div key={index} className="glass-card p-5 rounded-xl">
                    <h3 className="text-aramco-darkblue font-medium mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-aramco-darkgray mb-3">
                      {project.period} • {project.role}
                    </p>
                    <p className="text-aramco-darkgray">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-aramco-darkgray">No project information available.</p>
            )}
          </motion.div>
        );
      
      case 'achievements':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {employee?.achievements && employee.achievements.length > 0 ? (
              <div className="space-y-4">
                {employee.achievements.map((achievement, index) => (
                  <div key={index} className="glass-card p-5 rounded-xl">
                    <h3 className="text-aramco-darkblue font-medium mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-aramco-darkgray mb-3">
                      {achievement.date}
                    </p>
                    <p className="text-aramco-darkgray">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-aramco-darkgray">No achievement information available.</p>
            )}
          </motion.div>
        );
      
      case 'awards':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {employee?.awards && employee.awards.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employee.awards.map((award, index) => (
                    <div key={index} className="glass-card p-5 rounded-xl">
                      <div className="flex items-start mb-3">
                        <div className="p-2 rounded-full bg-aramco-blue bg-opacity-10 mr-3">
                          <Trophy className="w-5 h-5 text-aramco-blue" />
                        </div>
                        <div>
                          <h3 className="text-aramco-darkblue font-medium">{award.title}</h3>
                          <p className="text-sm text-aramco-darkgray">{award.year} • {award.issuer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-aramco-darkgray">No awards information available.</p>
            )}
          </motion.div>
        );
      
      case 'mentoring':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {employee?.mentoring ? (
              <div className="space-y-6">
                <div className="glass-card p-5 rounded-xl">
                  <div className="flex items-start mb-4">
                    <div className={`p-2 rounded-full mr-3 ${employee.mentoring.available ? 'bg-green-100' : 'bg-amber-100'}`}>
                      <Lightbulb className={`w-5 h-5 ${employee.mentoring.available ? 'text-green-600' : 'text-amber-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-aramco-darkblue font-medium">
                        {employee.mentoring.available 
                          ? 'Available for Mentoring' 
                          : 'Not Currently Available for Mentoring'}
                      </h3>
                    </div>
                  </div>
                  
                  {employee.mentoring.available && (
                    <>
                      {employee.mentoring.topics && (
                        <div className="mb-4">
                          <h4 className="text-aramco-darkblue font-medium mb-2">Mentoring Topics</h4>
                          <div className="flex flex-wrap gap-2">
                            {employee.mentoring.topics.map((topic, i) => (
                              <span 
                                key={i}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-aramco-blue bg-opacity-10 text-aramco-darkblue"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {employee.mentoring.experience && (
                        <div>
                          <h4 className="text-aramco-darkblue font-medium mb-2">Mentoring Experience</h4>
                          <p className="text-aramco-darkgray">{employee.mentoring.experience}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-aramco-gray">
                        <Button>Request Mentoring</Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-aramco-darkgray">No mentoring information available.</p>
            )}
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-aramco-blue to-aramco-darkblue h-40">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center">
              <Link to="/results" className="text-white/80 hover:text-white mr-2 text-sm">
                Search Results
              </Link>
              <ChevronRight className="w-4 h-4 text-white/60" />
              <span className="ml-2 text-sm text-white/80">{employee?.name}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl h-full"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-aramco-blue bg-opacity-10">
                  {employee?.photoUrl ? (
                    <img 
                      src={employee.photoUrl} 
                      alt={employee.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-aramco-blue text-3xl font-semibold">
                      {employee?.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-display font-medium text-aramco-darkblue">
                  {employee?.name}
                </h2>
                <p className="text-aramco-darkgray mt-1">{employee?.title}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center py-2 border-t border-aramco-gray">
                  <Mail className="w-5 h-5 text-aramco-blue mr-3" />
                  <div>
                    <p className="text-sm text-aramco-darkgray">Email</p>
                    <a href={`mailto:${employee?.email}`} className="text-aramco-darkblue hover:text-aramco-blue">
                      {employee?.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center py-2 border-t border-aramco-gray">
                  <Phone className="w-5 h-5 text-aramco-blue mr-3" />
                  <div>
                    <p className="text-sm text-aramco-darkgray">Phone</p>
                    <a href={`tel:${employee?.phone}`} className="text-aramco-darkblue hover:text-aramco-blue">
                      {employee?.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center py-2 border-t border-aramco-gray">
                  <MapPin className="w-5 h-5 text-aramco-blue mr-3" />
                  <div>
                    <p className="text-sm text-aramco-darkgray">Location</p>
                    <p>{employee?.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-aramco-gray space-y-3">
                <Link 
                  to="/org-chart" 
                  className="flex items-center justify-center text-aramco-blue hover:text-aramco-darkblue transition-colors"
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span>View in Organization Chart</span>
                </Link>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto" side="right">
                    {employee && <EditProfile employee={employee} onSave={(updatedEmployee) => setEmployee(updatedEmployee)} />}
                  </SheetContent>
                </Sheet>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="flex flex-wrap border-b border-aramco-gray">
                {[
                  { id: 'about', label: 'About', icon: User },
                  { id: 'skills', label: 'Skills', icon: Award },
                  { id: 'interests', label: 'Interests', icon: Heart },
                  { id: 'projects', label: 'Projects', icon: Code },
                  { id: 'achievements', label: 'Achievements', icon: Lightbulb },
                  { id: 'awards', label: 'Awards', icon: Trophy },
                  { id: 'mentoring', label: 'Mentoring', icon: Users }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-aramco-blue border-b-2 border-aramco-blue'
                        : 'text-aramco-darkgray hover:text-aramco-darkblue hover:bg-aramco-gray hover:bg-opacity-10'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                {tabContent()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeProfile;
