import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, MapPin, Briefcase, Globe, Building2, GraduationCap, Mail, Phone, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AlumniConnect = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState(null); // New state for selected alumni
  const [activeTab, setActiveTab] = useState('mentorship');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProgramModalOpen, setProgramModalOpen] = useState(false);
  const [isSessionModalOpen, setSessionModalOpen] = useState(false);
  const [isAlumniModalOpen, setAlumniModalOpen] = useState(false); // New state for alumni modal
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    statement: ''
  });

  const [sessionForm, setSessionForm] = useState({
    name: '',
    email: '',
    questions: ''
  });

  const [mentorMeetingForm, setMentorMeetingForm] = useState({
    date: '',
    time: '',
    topic: '',
    questions: ''
  });

  const [alumniConnectionForm, setAlumniConnectionForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const alumni = [
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
  ];

  const events = [
    {
      id: 1,
      title: 'Resume Workshop',
      date: '2025-02-15',
      time: '10:00 AM',
      host: 'Priya Sharma',
      type: 'Placement',
      participants: 50,
      description: 'Learn how to craft a perfect resume for tech companies'
    },
    {
      id: 2,
      title: 'MS in USA - Complete Guide',
      date: '2025-02-20',
      time: '6:00 PM',
      host: 'Rahul Verma',
      type: 'Study Abroad',
      participants: 100,
      description: 'Comprehensive guide to pursuing MS in USA'
    }
  ];

  const studyAbroadPrograms = [
    {
      id: 1,
      university: 'Stanford University',
      country: 'USA',
      program: 'MS in Computer Science',
      duration: '2 years',
      deadline: '2025-12-15',
      requirements: ['GRE: 320+', 'TOEFL: 100+', 'CGPA: 8.5+'],
      alumni: [
        {
          id: 1,
          name: 'Rahul Verma',
          graduationYear: 2023,
          role: 'PhD Researcher at Stanford University',
          image: '/api/placeholder/150/150'
        },
        {
          id: 2,
          name: 'Anita Patel',
          graduationYear: 2022,
          role: 'Software Engineer at Microsoft',
          image: '/api/placeholder/150/150'
        }
      ],
      tuitionFee: '$55,000/year',
      scholarships: ['Stanford Graduate Fellowship', 'Department Scholarship']
    },
    {
      id: 2,
      university: 'Technical University of Munich',
      country: 'Germany',
      program: 'MS in Data Engineering',
      duration: '2 years',
      deadline: '2025-07-15',
      requirements: ['IELTS: 7.0+', 'CGPA: 8.0+', 'German A1'],
      alumni: [
        {
          id: 3,
          name: 'Michael Schmidt',
          graduationYear: 2021,
          role: 'Data Engineer at BMW',
          image: '/api/placeholder/150/150'
        },
        {
          id: 4,
          name: 'Priya Reddy',
          graduationYear: 2020,
          role: 'Data Scientist at Siemens',
          image: '/api/placeholder/150/150'
        }
      ],
      tuitionFee: '€1,500/semester',
      scholarships: ['DAAD Scholarship', 'Excellence Scholarship']
    }
  ];

  const handleFormChange = (formSetter) => (e) => {
    formSetter(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleSubmit = (formType) => (e) => {
    e.preventDefault();
    switch (formType) {
      case 'application':
        showSuccess(`Application submitted for ${selectedProgram.program}`);
        setProgramModalOpen(false);
        break;
      case 'session':
        showSuccess(`Registered for ${selectedEvent.title}`);
        setSessionModalOpen(false);
        break;
      case 'mentor':
        showSuccess(`Meeting scheduled with ${selectedMentor.name}`);
        setModalOpen(false);
        break;
      case 'alumni':
        showSuccess(`Connection request sent to ${selectedAlumni.name}`);
        setAlumniModalOpen(false);
        break;
      default:
        break;
    }
  };

  const openModal = (type, item) => {
    switch (type) {
      case 'mentor':
        setSelectedMentor(item);
        setModalOpen(true);
        break;
      case 'program':
        setSelectedProgram(item);
        setProgramModalOpen(true);
        break;
      case 'session':
        setSelectedEvent(item);
        setSessionModalOpen(true);
        break;
      case 'alumni':
        setSelectedAlumni(item);
        setAlumniModalOpen(true);
        break;
      default:
        break;
    }
  };

  const renderModal = (type) => {
    const forms = {
      mentor: {
        title: `Schedule Meeting with ${selectedMentor?.name}`,
        form: mentorMeetingForm,
        setForm: setMentorMeetingForm,
        open: isModalOpen,
        setOpen: setModalOpen
      },
      session: {
        title: `Join ${selectedEvent?.title}`,
        form: sessionForm,
        setForm: setSessionForm,
        open: isSessionModalOpen,
        setOpen: setSessionModalOpen
      },
      program: {
        title: `Apply to ${selectedProgram?.program}`,
        form: applicationForm,
        setForm: setApplicationForm,
        open: isProgramModalOpen,
        setOpen: setProgramModalOpen
      },
      alumni: {
        title: `Connect with ${selectedAlumni?.name}`,
        form: alumniConnectionForm,
        setForm: setAlumniConnectionForm,
        open: isAlumniModalOpen,
        setOpen: setAlumniModalOpen
      }
    };

    const currentForm = forms[type];
    if (!currentForm) return null;

    return (
      <Dialog open={currentForm.open} onOpenChange={currentForm.setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentForm.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(type)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={currentForm.form.name}
                onChange={handleFormChange(currentForm.setForm)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentForm.form.email}
                onChange={handleFormChange(currentForm.setForm)}
                required
              />
            </div>
            {type !== 'session' && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={currentForm.form.phone || ''}
                  onChange={handleFormChange(currentForm.setForm)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="questions">Questions/Comments</Label>
              <Textarea
                id="questions"
                name="questions"
                value={currentForm.form.questions || ''}
                onChange={handleFormChange(currentForm.setForm)}
                placeholder="Any questions or specific topics?"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {showSuccessAlert && (
        <Alert className="fixed top-4 right-4 z-50 w-96 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="mentorship" value={activeTab} onValueChange={setActiveTab}>
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
                      <div className="text-sm text-gray-600">{mentor.role} at {mentor.company}</div>
                      <div className="text-sm text-gray-600">Batch of {mentor.batch}</div>
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
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => openModal('mentor', mentor)}>
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="placements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <Badge variant="outline">{event.type}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{event.description}</p>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{event.participants} participants</span>
                    </div>
                    <Button className="w-full" onClick={() => openModal('session', event)}>
                      Join Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="studyAbroad">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyAbroadPrograms.map(program => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{program.university}</CardTitle>
                      <div className="text-sm text-gray-600">{program.program}</div>
                    </div>
                    <Badge variant="secondary">
                      <Globe className="w-4 h-4 mr-1" />
                      {program.country}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Duration: {program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      <span>Fee: {program.tuitionFee}</span>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Requirements:</div>
                      <div className="flex flex-wrap gap-2">
                        {program.requirements.map(req => (
                          <Badge key={req} variant="outline">{req}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Alumni:</div>
                      <div className="flex flex-wrap gap-2">
                        {program.alumni.map(alumni => (
                          <Badge
                            key={alumni.id}
                            variant="secondary"
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => openModal('alumni', alumni)}
                          >
                            {alumni.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => openModal('program', program)}>
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {renderModal('mentor')}
      {renderModal('session')}
      {renderModal('program')}
      {renderModal('alumni')}
    </div>
  );
};

export default AlumniConnect;