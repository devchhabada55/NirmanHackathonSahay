import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BriefcaseIcon, TrendingUp, Award, Bot, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const JobsHub = () => {
  const [jobs] = useState([
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
      description: 'We are looking for a passionate frontend developer to join our growing team...'
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'Bangalore',
      type: 'Full-time',
      matchScore: 85,
      skills: ['Python', 'ML', 'SQL'],
      requirements: ['Masters in AI/ML', 'Experience with Deep Learning', 'Research background'],
      salary: '10-15 LPA',
      posted: '1 day ago',
      description: 'Join our AI team to work on cutting-edge machine learning projects...'
    }
  ]);

  const [skills] = useState([
    { name: 'React', level: 85, certifications: ['Meta Frontend Certification'] },
    { name: 'Python', level: 70, certifications: ['Google Python Course'] },
    { name: 'Data Analysis', level: 60, certifications: [] }
  ]);

  const [quizzes] = useState([
    {
      id: 1,
      title: 'Frontend Development',
      questions: 20,
      duration: '30 mins',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Data Structures',
      questions: 25,
      duration: '45 mins',
      difficulty: 'Advanced'
    }
  ]);

  const [careerPaths] = useState([
    {
      role: 'Full Stack Developer',
      timeline: '1-2 years',
      requiredSkills: ['Node.js', 'React', 'MongoDB'],
      salary: '12-18 LPA',
      demand: 'High'
    },
    {
      role: 'ML Engineer',
      timeline: '2-3 years',
      requiredSkills: ['Python', 'TensorFlow', 'AWS'],
      salary: '15-25 LPA',
      demand: 'Very High'
    }
  ]);

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

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">View Details</Button>
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
                <Button className="w-full">Apply Now</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  const renderSkillAssessment = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="mb-2" />
                  {skill.certifications.map(cert => (
                    <Badge key={cert} variant="outline" className="mr-2">
                      {cert}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">{quiz.title}</h4>
                    <Badge>{quiz.difficulty}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {quiz.questions} questions • {quiz.duration}
                  </div>
                  <Button className="w-full">Start Assessment</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCareerBuddy = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Career Paths</CardTitle>
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
          <div className="flex gap-2">
            <Input placeholder="Ask Career Buddy a question..." className="flex-1" />
            <Button>Ask</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
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
            <div className="flex gap-4">
              <Input placeholder="Search jobs..." className="flex-1" />
              <Button>Filter</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => renderJobCard(job))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          {renderSkillAssessment()}
        </TabsContent>

        <TabsContent value="career">
          {renderCareerBuddy()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobsHub;