import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  BriefcaseIcon, Award, Bot, MapPin, Clock, UserCircle,
  Edit2, Save, Plus, Trash2, CheckCircle,Github, Linkedin
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const JobsHub = () => {
  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    title: "Software Developer",
    email: "john@example.com",
    education: [
      {
        degree: "B.Tech Computer Science",
        institution: "Tech University",
        year: "2020-2024",
        gpa: "3.8"
      }
    ],
    experience: [
      {
        role: "Frontend Developer Intern",
        company: "Tech Corp",
        duration: "May 2023 - Aug 2023",
        description: "Developed responsive web applications using React and TypeScript"
      }
    ],
    links: {
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe"
    },
    skills: {
      "Frontend Development": 75,
      "Data Structures": 60
    }
  });

  // Editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  // Skill assessments
  const [skillAssessments] = useState({
    "Frontend Development": {
      questions: [
        {
          id: 1,
          question: "What is the virtual DOM in React?",
          options: [
            "A direct copy of the actual DOM",
            "A lightweight copy of the actual DOM",
            "A programming concept unrelated to DOM",
            "A browser feature"
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Which hook is used for side effects in React?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer"
          ],
          correctAnswer: 1,
        }
      ],
      completed: false
    },
    "Data Structures": {
      questions: [
        {
          id: 1,
          question: "What is the time complexity of binary search?",
          options: [
            "O(n)",
            "O(log n)",
            "O(n²)",
            "O(1)"
          ],
          correctAnswer: 1,
        }
      ],
      completed: false
    }
  });

  // Assessment state
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState({});

  // Jobs state
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Pune',
      type: 'Full-time',
      matchScore: 92,
      skills: ['React', 'TypeScript', 'Tailwind'],
      requirements: ['2+ years experience', 'B.Tech in CS/IT', 'Strong JavaScript fundamentals'],
      salary: '8-12 LPA',
      posted: '2 days ago',
      description: 'We are looking for a passionate frontend developer to join our growing team...',
      applied: false,
      savedForLater: false
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'DataSystems',
      location: 'Remote',
      type: 'Contract',
      matchScore: 85,
      skills: ['Node.js', 'PostgreSQL', 'AWS'],
      requirements: ['3+ years experience', 'Microservices architecture', 'REST API design'],
      salary: '10-15 LPA',
      posted: '1 week ago',
      description: 'Looking for experienced backend developers to work on cloud-native applications...',
      applied: false,
      savedForLater: false
    }
  ]);

  // Career paths
  const [careerPaths] = useState([
    {
      role: "Senior Frontend Developer",
      timeline: "2-4 years",
      demand: "High",
      requiredSkills: ["React", "TypeScript", "State Management"],
      salary: "15-20 LPA"
    },
    {
      role: "Tech Lead",
      timeline: "5+ years",
      demand: "Medium",
      requiredSkills: ["Architecture", "Team Leadership", "Project Management"],
      salary: "20-30 LPA"
    }
  ]);

  // Profile handlers
  const handleProfileUpdate = () => {
    setUserProfile({ ...editedProfile });
    setIsEditingProfile(false);
  };

  // Assessment handlers
  const startAssessment = (title) => {
    setActiveAssessment(title);
    setCurrentQuestionIndex(0);
    setCurrentAnswers({});
  };

  const handleAnswerSubmit = (questionId, answerIndex) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const completeAssessment = () => {
    if (!activeAssessment) return;
    
    const assessment = skillAssessments[activeAssessment];
    let score = 0;
    assessment.questions.forEach(q => {
      if (currentAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    
    const finalScore = (score / assessment.questions.length) * 100;
    setUserProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [activeAssessment]: finalScore
      }
    }));

    setActiveAssessment(null);
    setCurrentQuestionIndex(0);
    setCurrentAnswers({});
  };
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Career Buddy. I can help you with:\n- Career path suggestions\n- Resume reviews\n- Interview preparation\n- Skill development advice"
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    const newMessage = { role: 'user', content: userInput };
    
    setChatMessages(prev => [...prev, newMessage]);
    setUserInput('');
  
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          userProfile: userProfile // Pass the user's profile for context
        }),
      });
  
      const data = await response.json();
      
      if (data.status === 'success') {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response
        }]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Profile component
  const renderProfile = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserCircle size={20} />
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Professional Profile</span>
            <Button
              variant="outline"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="gap-2"
            >
              {isEditingProfile ? <Save size={16} /> : <Edit2 size={16} />}
              {isEditingProfile ? 'Save' : 'Edit'}
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editedProfile.title}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        title: e.target.value
                      })}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold">{userProfile.name}</h3>
                  <p className="text-gray-600">{userProfile.title}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              {userProfile.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year} • GPA: {edu.gpa}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin size={20} />
                  <a href={`https://${userProfile.links.linkedin}`} className="text-blue-600 hover:underline">
                    {userProfile.links.linkedin}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Job card component
  const renderJobCard = (job) => (
    <Card key={job.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg">
            {job.matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{job.posted}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.skills.map(skill => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>{job.type}</span>
            <span>{job.salary}</span>
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1">View Details</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{job.title} at {job.company}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>{job.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="w-full"
                    variant={job.applied ? "outline" : "default"}
                    onClick={() => {
                      const updatedJobs = jobs.map(j =>
                        j.id === job.id ? { ...j, applied: !j.applied } : j
                      );
                      setJobs(updatedJobs);
                    }}
                  >
                    {job.applied ? 'Applied' : 'Apply Now'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={() => {
                const updatedJobs = jobs.map(j =>
                  j.id === job.id ? { ...j, savedForLater: !j.savedForLater } : j
                );
                setJobs(updatedJobs);
              }}
            >
              {job.savedForLater ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">JobsHub</h1>
        {renderProfile()}
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">
            <div className="flex items-center gap-2">
              <BriefcaseIcon size={16} />
              Job Feed
            </div>
          </TabsTrigger>
          <TabsTrigger value="skills">
            <div className="flex items-center gap-2">
              <Award size={16} />
              Skill Assessment
            </div>
          </TabsTrigger>
          <TabsTrigger value="career">
            <div className="flex items-center gap-2">
              <Bot size={16} />
              Career Buddy
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <Input placeholder="Search jobs..." className="flex-1" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Filter</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Jobs</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Location</Label>
                      <Input placeholder="Enter location" />
                    </div>
                    <div>
                      <Label>Job Type</Label>
                      <RadioGroup defaultValue="all">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full-time" id="full-time" />
                          <Label htmlFor="full-time">Full-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part-time" id="part-time" />
                          <Label htmlFor="part-time">Part-time</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Experience Level</Label>
                      <RadioGroup defaultValue="all">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="exp-all" />
                          <Label htmlFor="exp-all">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="entry" id="entry" />
                          <Label htmlFor="entry">Entry Level</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mid" id="mid" />
                          <Label htmlFor="mid">Mid Level</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="senior" id="senior" />
                          <Label htmlFor="senior">Senior Level</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => renderJobCard(job))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-6">
            {activeAssessment ? (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg font-medium">
                      {skillAssessments[activeAssessment].questions[currentQuestionIndex].question}
                    </p>
                    <RadioGroup
                      onValueChange={(value) => handleAnswerSubmit(
                        skillAssessments[activeAssessment].questions[currentQuestionIndex].id,
                        parseInt(value)
                      )}
                      value={currentAnswers[skillAssessments[activeAssessment].questions[currentQuestionIndex].id]?.toString()}
                    >
                      {skillAssessments[activeAssessment].questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => {
                          if (currentQuestionIndex === skillAssessments[activeAssessment].questions.length - 1) {
                            completeAssessment();
                          } else {
                            setCurrentQuestionIndex(prev => prev + 1);
                          }
                        }}
                      >
                        {currentQuestionIndex === skillAssessments[activeAssessment].questions.length - 1 
                          ? 'Complete' 
                          : 'Next'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(userProfile.skills).map(([skill, level]) => (
                        <div key={skill}>
                          <div className="flex justify-between mb-2">
                            <span>{skill}</span>
                            <span>{level}%</span>
                          </div>
                          <Progress value={level} className="mb-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(skillAssessments).map(([title, assessment]) => (
                        <div key={title} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-semibold">{title}</h4>
                            <Badge>
                              {assessment.questions.length} Questions
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            Estimated time: {assessment.questions.length * 2} mins
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => startAssessment(title)}
                          >
                            Start Assessment
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="career">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Path Recommendations</CardTitle>
                <CardDescription>Based on your skills and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {careerPaths.map((path, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{path.role}</h4>
                          <div className="text-sm text-gray-600">Timeline: {path.timeline}</div>
                        </div>
                        <Badge variant="secondary">{path.demand} Demand</Badge>
                      </div>
                      <div className="space-y-2">
                        <div>Required Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {path.requiredSkills.map(skill => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 text-sm">
                        Expected Salary: {path.salary}
                      </div>
                      <Button className="w-full mt-4">View Learning Path</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
  <CardHeader>
    <CardTitle>Career Buddy AI</CardTitle>
    <CardDescription>Get personalized career guidance</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="border rounded-lg p-4 max-h-[400px] overflow-y-auto">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : ''
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Ask Career Buddy a question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Ask'}
          </Button>
          </div>
          </div>
          </CardContent>
          </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobsHub;