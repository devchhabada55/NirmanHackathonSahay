import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Video, GraduationCap, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AlumniConnect = () => {
  const [alumni] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      batch: '2020',
      company: 'Google',
      role: 'Senior Software Engineer',
      location: 'Bangalore',
      expertise: ['Tech Leadership', 'System Design', 'Career Guidance'],
      availability: 'Weekends',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Rahul Verma',
      batch: '2018',
      company: 'Stanford University',
      role: 'PhD Researcher',
      location: 'USA',
      expertise: ['ML/AI', 'Research', 'Higher Studies'],
      availability: 'Flexible',
      rating: 4.9
    }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: 'Resume Workshop',
      date: '2025-02-15',
      time: '10:00 AM',
      host: 'Priya Sharma',
      type: 'Placement',
      participants: 50
    },
    {
      id: 2,
      title: 'MS in USA - Complete Guide',
      date: '2025-02-20',
      time: '6:00 PM',
      host: 'Rahul Verma',
      type: 'Study Abroad',
      participants: 100
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Tabs defaultValue="mentorship">
        <TabsList className="mb-4">
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="studyAbroad">Study Abroad</TabsTrigger>
        </TabsList>

        <TabsContent value="mentorship">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alumni.map(mentor => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{mentor.name}</CardTitle>
                      <div className="text-sm text-gray-600">
                        {mentor.role} at {mentor.company}
                      </div>
                      <div className="text-sm text-gray-600">
                        Batch of {mentor.batch}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{mentor.location}</span>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Expertise:</div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map(skill => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available: {mentor.availability}</span>
                      <span>⭐ {mentor.rating}</span>
                    </div>
                    <Button className="w-full">Schedule Meeting</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="placements">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Upcoming Placement Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.filter(event => event.type === 'Placement').map(event => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{event.participants} participants</span>
                      </div>
                      <Button className="w-full">Join Session</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="studyAbroad">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alumni.map(mentor => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{mentor.name}</CardTitle>
                      <div className="text-sm text-gray-600">
                        {mentor.role} at {mentor.company}
                      </div>
                      <div className="text-sm text-gray-600">
                        Batch of {mentor.batch}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{mentor.location}</span>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Expertise:</div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map(skill => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available: {mentor.availability}</span>
                      <span>⭐ {mentor.rating}</span>
                    </div>
                    <Button className="w-full">Schedule Meeting</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlumniConnect;