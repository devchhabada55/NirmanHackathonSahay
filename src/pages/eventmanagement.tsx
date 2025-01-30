import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EventsHub = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Annual Hackathon 2025',
      type: 'hackathon',
      date: '2025-02-15',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      organizer: 'Coding Club',
      participants: 120,
      description: 'Join us for 24 hours of coding, innovation, and fun!',
      tags: ['coding', 'technology', 'innovation']
    },
    {
      id: 2,
      title: 'AI Workshop Series',
      type: 'workshop',
      date: '2025-02-20',
      time: '02:00 PM',
      venue: 'Seminar Hall 1',
      organizer: 'AI Club',
      participants: 50,
      description: 'Learn the basics of Machine Learning and Neural Networks',
      tags: ['AI', 'ML', 'workshop']
    }
  ]);

  const [clubs] = useState([
    {
      id: 1,
      name: 'Coding Club',
      logo: '🖥',
      members: 150,
      recruiting: true
    },
    {
      id: 2,
      name: 'AI Club',
      logo: '🤖',
      members: 120,
      recruiting: true
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Tabs defaultValue="events">
        <TabsList className="mb-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="gallery">Event Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Button>Post New Event</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{event.title}</span>
                    <Badge>{event.type}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{event.participants} participants</span>
                    </div>
                    <p>{event.description}</p>
                    <div className="flex gap-2">
                      {event.tags.map(tag => (
                        <Badge key={tag} variant="outline">#{tag}</Badge>
                      ))}
                    </div>
                    <Button className="w-full">Register Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clubs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clubs.map(club => (
              <Card key={club.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl text-center mb-2">{club.logo}</div>
                  <CardTitle className="text-center">{club.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>{club.members} members</div>
                    {club.recruiting && (
                      <Button className="w-full">Apply Now</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <div className="text-center p-8">
            <h3 className="text-2xl mb-4">Event Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Placeholder images for event gallery */}
              <img src="/api/placeholder/300/200" alt="Event 1" className="rounded-lg" />
              <img src="/api/placeholder/300/200" alt="Event 2" className="rounded-lg" />
              <img src="/api/placeholder/300/200" alt="Event 3" className="rounded-lg" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsHub;
