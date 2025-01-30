import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const ResearchHub = () => {
  const [projects] = useState([
    {
      id: 1,
      title: 'AI-Powered Smart Campus System',
      author: 'Dr. Sharma & Team',
      department: 'Computer Science',
      tags: ['AI', 'IoT', 'Smart Cities'],
      timeline: '6 months',
      teamSize: '4-5 members',
      description: 'Developing an intelligent system to optimize campus resource utilization using AI and IoT sensors.',
      requirements: ['Machine Learning', 'Python', 'IoT Experience']
    },
    {
      id: 2,
      title: 'Blockchain for Academic Credentials',
      author: 'Prof. Patel',
      department: 'Information Technology',
      tags: ['Blockchain', 'Security', 'EdTech'],
      timeline: '8 months',
      teamSize: '3-4 members',
      description: 'Implementation of blockchain technology for secure and verifiable academic credentials.',
      requirements: ['Blockchain', 'Smart Contracts', 'Web3']
    }
  ]);

  const [papers] = useState([
    {
      id: 1,
      title: 'Recent Advances in Deep Learning',
      conference: 'IEEE International Conference 2024',
      authors: ['Dr. Kumar', 'Ms. Singh'],
      citations: 45
    },
    {
      id: 2,
      title: 'Sustainable Energy Solutions',
      conference: 'Green Technology Summit 2024',
      authors: ['Prof. Shah', 'Dr. Reddy'],
      citations: 32
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Tabs defaultValue="marketplace">
        <TabsList className="mb-4">
          <TabsTrigger value="marketplace">Idea Marketplace</TabsTrigger>
          <TabsTrigger value="teams">Team Builder</TabsTrigger>
          <TabsTrigger value="papers">Research Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Research Projects</h2>
            <Button>Post New Project</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
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
                    <Button className="w-full">Apply to Join</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input placeholder="Search by skills..." className="flex-1" />
              <Button>Find Teammates</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Team suggestions would go here */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Looking for ML Engineer</h3>
                  <p className="text-sm text-gray-600">For AI-Powered Campus Project</p>
                  <div className="mt-2">
                    <Badge>Python</Badge>
                    <Badge className="ml-2">TensorFlow</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="papers">
          <div className="space-y-6">
            {papers.map(paper => (
              <Card key={paper.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{paper.title}</h3>
                  <p className="text-sm text-gray-600">{paper.conference}</p>
                  <p className="text-sm">Authors: {paper.authors.join(', ')}</p>
                  <p className="text-sm">Citations: {paper.citations}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchHub;
