import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, Clock, Tag, Calendar, Award, BookOpen, Filter, Plus, MessageCircle, FileText, CheckCircle, UserPlus, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ResearchHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'AI-Powered Smart Campus System',
      author: 'Dr. Sharma & Team',
      department: 'Computer Science',
      tags: ['AI', 'IoT', 'Smart Cities'],
      timeline: '6 months',
      teamSize: '4-5 members',
      description: 'Developing an intelligent system to optimize campus resource utilization using AI and IoT sensors.',
      requirements: ['Machine Learning', 'Python', 'IoT Experience'],
      status: 'Open',
      applicants: []
    },
  ]);

  const [papers, setPapers] = useState([
    {
      id: 1,
      title: 'Recent Advances in Deep Learning',
      conference: 'IEEE International Conference 2024',
      authors: ['Dr. Kumar', 'Ms. Singh'],
      citations: 45,
      abstract: 'This paper explores the latest developments in deep learning architectures.',
      keywords: ['Deep Learning', 'Neural Networks', 'AI'],
      doi: '10.1234/example.2024',
      publicationDate: '2024-01-15'
    },
  ]);

  const [conferences] = useState([
    {
      id: 1,
      name: 'International AI Conference 2024',
      date: '2024-11-05',
      location: 'Virtual',
      deadline: '2024-08-15',
      topics: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
      website: 'https://ai-conference.example.com'
    }
  ]);

  const [userProfile] = useState({
    name: 'John Doe',
    department: 'Computer Science',
    skills: ['Python', 'Machine Learning', 'React'],
    publications: 3,
    projects: 2
  });

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'AI Research Team',
      members: [
        { id: 1, name: 'John Doe', role: 'Team Lead', responsibilities: 'Project Management' },
        { id: 2, name: 'Jane Smith', role: 'Data Scientist', responsibilities: 'Model Development' }
      ],
      tasks: [
        { id: 1, title: 'Data Collection', assignedTo: 'Jane Smith', deadline: '2024-06-15', priority: 'High', status: 'In Progress' },
        { id: 2, title: 'Model Training', assignedTo: 'John Doe', deadline: '2024-06-20', priority: 'Medium', status: 'Pending' }
      ],
      chat: [],
      files: [],
      performance: {
        completedTasks: 1,
        totalTasks: 2,
        progress: 50
      }
    }
  ]);

  const handleApply = (projectId) => {
    setProjects(projects => projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          applicants: [...project.applicants, {
            userId: userProfile.name,
            date: new Date().toISOString(),
            status: 'Pending'
          }]
        };
      }
      return project;
    }));
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent to the project team.",
      duration: 3000,
    });
  };

  const handleNewProject = (formData) => {
    const newProject = {
      id: projects.length + 1,
      ...formData,
      applicants: []
    };
    setProjects([...projects, newProject]);
    toast({
      title: "Project Created",
      description: "Your project has been posted successfully.",
      duration: 3000,
    });
  };

  const handleNewPaper = (formData) => {
    const newPaper = {
      id: papers.length + 1,
      ...formData,
      citations: 0,
      publicationDate: new Date().toISOString().split('T')[0]
    };
    setPapers([...papers, newPaper]);
    toast({
      title: "Paper Submitted",
      description: "Your research paper has been submitted successfully.",
      duration: 3000,
    });
  };

  const handleNewTeam = (formData) => {
    const newTeam = {
      id: teams.length + 1,
      ...formData,
      members: [],
      tasks: [],
      chat: [],
      files: [],
      performance: {
        completedTasks: 0,
        totalTasks: 0,
        progress: 0
      }
    };
    setTeams([...teams, newTeam]);
    toast({
      title: "Team Created",
      description: "Your team has been created successfully.",
      duration: 3000,
    });
  };

  const NewProjectForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      author: '',
      department: '',
      tags: [],
      timeline: '',
      teamSize: '',
      description: '',
      requirements: [],
      status: 'Open'
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus size={16} />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Project Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter project title"
              />
            </div>
            <div>
              <Label>Author(s)</Label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                placeholder="e.g., Dr. Smith & Team"
              />
            </div>
            <div>
              <Label>Department</Label>
              <Select onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tags (comma-separated)</Label>
              <Input
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
                placeholder="e.g., AI, IoT, Blockchain"
              />
            </div>
            <div>
              <Label>Timeline</Label>
              <Input
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                placeholder="e.g., 6 months"
              />
            </div>
            <div>
              <Label>Team Size</Label>
              <Input
                value={formData.teamSize}
                onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                placeholder="e.g., 4-5 members"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your project..."
              />
            </div>
            <div>
              <Label>Requirements (comma-separated)</Label>
              <Input
                value={formData.requirements.join(', ')}
                onChange={(e) => setFormData({...formData, requirements: e.target.value.split(',').map(r => r.trim())})}
                placeholder="e.g., Python, Machine Learning, React"
              />
            </div>
            <Button 
              className="w-full"
              onClick={() => handleNewProject(formData)}
            >
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const PaperSubmissionForm = ({ conference }) => {
    const [formData, setFormData] = useState({
      title: '',
      conference: conference || '',
      authors: [],
      abstract: '',
      keywords: [],
      doi: ''
    });

    React.useEffect(() => {
      if (conference) {
        setFormData(prev => ({ ...prev, conference }));
      }
    }, [conference]);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus size={16} />
            Submit New Paper
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Research Paper</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Paper Title</Label>
              <Input 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter paper title"
              />
            </div>
            <div>
              <Label>Conference/Journal</Label>
              <Input 
                value={formData.conference}
                onChange={(e) => setFormData({...formData, conference: e.target.value})}
                placeholder="Enter conference or journal name"
                disabled={!!conference}
              />
            </div>
            <div>
              <Label>Authors (comma-separated)</Label>
              <Input 
                value={formData.authors.join(', ')}
                onChange={(e) => setFormData({...formData, authors: e.target.value.split(',').map(a => a.trim())})}
                placeholder="e.g., Dr. Smith, Prof. Johnson"
              />
            </div>
            <div>
              <Label>Abstract</Label>
              <Textarea 
                value={formData.abstract}
                onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                placeholder="Enter paper abstract"
              />
            </div>
            <div>
              <Label>Keywords (comma-separated)</Label>
              <Input 
                value={formData.keywords.join(', ')}
                onChange={(e) => setFormData({...formData, keywords: e.target.value.split(',').map(k => k.trim())})}
                placeholder="e.g., AI, Machine Learning, Neural Networks"
              />
            </div>
            <div>
              <Label>DOI (if available)</Label>
              <Input 
                value={formData.doi}
                onChange={(e) => setFormData({...formData, doi: e.target.value})}
                placeholder="Enter DOI"
              />
            </div>
            <Button 
              className="w-full"
              onClick={() => handleNewPaper(formData)}
            >
              Submit Paper
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const NewTeamForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: ''
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus size={16} />
            New Team
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Team Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter team name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your team..."
              />
            </div>
            <Button 
              className="w-full"
              onClick={() => handleNewTeam(formData)}
            >
              Create Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-gray-600">{userProfile.department}</p>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    <span>{userProfile.publications} Publications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} />
                    <span>{userProfile.projects} Projects</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace">
        <TabsList className="mb-4">
          <TabsTrigger value="marketplace">Idea Marketplace</TabsTrigger>
          <TabsTrigger value="papers">Research Feed</TabsTrigger>
          <TabsTrigger value="conferences">Conferences</TabsTrigger>
          <TabsTrigger value="teams">Team Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Research Projects</h2>
            <NewProjectForm />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.title}</CardTitle>
                    <Badge variant={project.status === 'Open' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {project.author} • {project.department}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{project.description}</p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Timeline: {project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Team Size: {project.teamSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="outline">#{tag}</Badge>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside">
                        {project.requirements.map(req => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleApply(project.id)}
                      >
                        Apply to Join
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{project.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>{project.description}</p>
                            <div>
                              <h4 className="font-semibold">Project Details</h4>
                              <p>Department: {project.department}</p>
                              <p>Timeline: {project.timeline}</p>
                              <p>Team Size: {project.teamSize}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Application Status</h4>
                              <p>Current Applications: {project.applicants.length}</p>
                              {project.applicants.some(app => app.userId === userProfile.name) && (
                                <Alert className="mt-2">
                                  <AlertDescription>
                                    You have already applied for this project.
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="papers">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Research Papers</h2>
              <PaperSubmissionForm />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {papers.map(paper => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                        <p className="text-sm text-gray-600">{paper.conference}</p>
                        <p className="text-sm">Authors: {paper.authors.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {paper.citations} Citations
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Published: {new Date(paper.publicationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4">{paper.abstract}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {paper.keywords.map(keyword => (
                        <Badge key={keyword} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      {paper.doi && (
                        <Button 
                          variant="outline"
                          onClick={() => window.open(`https://doi.org/${paper.doi}`)}
                        >
                          View DOI
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Cite Paper</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Citation Formats</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>APA Format</Label>
                              <div className="p-2 bg-gray-50 rounded-md">
                                {`${paper.authors.join(', ')}. (${new Date(paper.publicationDate).getFullYear()}). ${paper.title}. ${paper.conference}.`}
                              </div>
                            </div>
                            <div>
                              <Label>MLA Format</Label>
                              <div className="p-2 bg-gray-50 rounded-md">
                                {`${paper.authors.join(', ')}. "${paper.title}." ${paper.conference}, ${new Date(paper.publicationDate).getFullYear()}.`}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="conferences">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Upcoming Conferences</h2>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filter Events
              </Button>
            </div>
            
            {conferences.map(conf => (
              <Card key={conf.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{conf.name}</h3>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{conf.date}</span>
                        </div>
                        <p className="text-sm">Location: {conf.location}</p>
                        <p className="text-sm">Submission Deadline: {conf.deadline}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {conf.topics.map(topic => (
                            <Badge key={topic} variant="outline">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => window.open(conf.website)}
                      >
                        Visit Website
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Submit Paper</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit to {conf.name}</DialogTitle>
                          </DialogHeader>
                          <PaperSubmissionForm conference={conf.name} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Team Builder</h2>
              <NewTeamForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map(team => (
                <Card key={team.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{team.name}</CardTitle>
                      <Badge variant="secondary">
                        {team.performance.progress}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>{team.description}</p>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>Members: {team.members.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} />
                        <span>Tasks Completed: {team.performance.completedTasks}/{team.performance.totalTasks}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map(member => (
                          <Badge key={member.id} variant="outline">
                            {member.name} ({member.role})
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1"
                          onClick={() => {}}
                        >
                          Manage Team
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{team.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>{team.description}</p>
                              <div>
                                <h4 className="font-semibold">Team Members</h4>
                                <ul className="list-disc list-inside">
                                  {team.members.map(member => (
                                    <li key={member.id}>
                                      {member.name} - {member.role} ({member.responsibilities})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold">Tasks</h4>
                                <ul className="list-disc list-inside">
                                  {team.tasks.map(task => (
                                    <li key={task.id}>
                                      {task.title} - Assigned to: {task.assignedTo} (Deadline: {task.deadline})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchHub;