import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Clock, MapPin, PlusCircle, Mail, Phone, User, Briefcase, GraduationCap, FileText, Link2, Heart, MessageCircle, Share2, CreditCard, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const EventsHub = () => {
  // Event states with more demo data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Hackathon 2025",
      type: "hackathon",
      date: "2025-02-15",
      time: "09:00 AM",
      venue: "Main Auditorium",
      organizer: "Coding Club",
      participants: 120,
      price: 499,
      description: "Join us for 24 hours of coding, innovation, and fun!",
      tags: ["coding", "technology", "innovation"],
    },
    {
      id: 2,
      title: "AI Workshop Series",
      type: "workshop",
      date: "2025-02-20",
      time: "02:00 PM",
      venue: "Seminar Hall 1",
      organizer: "AI Club",
      participants: 50,
      price: 299,
      description: "Learn the basics of Machine Learning and Neural Networks",
      tags: ["AI", "ML", "workshop"],
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      type: "competition",
      date: "2025-03-01",
      time: "10:00 AM",
      venue: "Conference Center",
      organizer: "E-Cell",
      participants: 75,
      price: 199,
      description: "Present your startup idea to industry experts and investors",
      tags: ["startup", "business", "pitch"],
    },
    {
      id: 4,
      title: "IoT Bootcamp",
      type: "bootcamp",
      date: "2025-03-15",
      time: "11:00 AM",
      venue: "Tech Lab",
      organizer: "IoT Club",
      participants: 40,
      price: 399,
      description: "Hands-on experience with IoT devices and protocols",
      tags: ["IoT", "hardware", "programming"],
    },
  ]);

  // Gallery states
  const [galleryPosts, setGalleryPosts] = useState([
    {
      id: 1,
      eventId: 1,
      type: "image",
      content: "public/Community_1.jpg",
      caption: "Winners of Hackathon 2024!",
      likes: 45,
      comments: [
        { id: 1, user: "john_doe", text: "Amazing work everyone!" },
        { id: 2, user: "tech_enthusiast", text: "Can't wait for next year!" }
      ],
      shares: 12
    },
    {
      id: 2,
      eventId: 2,
      type: "video",
      content: "public/AI.jpg",
      caption: "Highlights from AI Workshop",
      likes: 32,
      comments: [
        { id: 1, user: "ai_lover", text: "Great session!" }
      ],
      shares: 8
    }
  ]);

  // Payment states
  const [paymentDetails, setPaymentDetails] = useState({
    method: "upi",
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Club states with more demo data and chat feature
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "Coding Club",
      logo: "🖥",
      members: 150,
      recruiting: true,
      positions: ["Frontend Developer", "Backend Developer", "DevOps Engineer"],
      requirements: {
        "Frontend Developer": "Experience with React and modern CSS",
        "Backend Developer": "Knowledge of Node.js and databases",
        "DevOps Engineer": "Experience with Docker and CI/CD"
      },
      chat: {
        messages: [
          { id: 1, user: "admin", text: "Welcome to Coding Club chat!" },
          { id: 2, user: "member1", text: "Hello everyone!" }
        ]
      }
    },
    {
      id: 2,
      name: "AI Club",
      logo: "🤖",
      members: 120,
      recruiting: true,
      positions: ["ML Engineer", "Data Scientist", "Research Associate"],
      requirements: {
        "ML Engineer": "Experience with PyTorch or TensorFlow",
        "Data Scientist": "Strong background in statistics and Python",
        "Research Associate": "Published papers in AI/ML"
      },
      chat: {
        messages: [
          { id: 1, user: "admin", text: "Welcome to AI Club chat!" },
          { id: 2, user: "member1", text: "Excited to be here!" }
        ]
      }
    },
    {
      id: 3,
      name: "IoT Club",
      logo: "📱",
      members: 80,
      recruiting: true,
      positions: ["Hardware Engineer", "Embedded Developer"],
      requirements: {
        "Hardware Engineer": "Experience with Arduino and Raspberry Pi",
        "Embedded Developer": "Knowledge of C++ and embedded systems"
      },
      chat: {
        messages: [
          { id: 1, user: "admin", text: "Welcome to IoT Club chat!" }
        ]
      }
    }
  ]);

  // States from original code
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: null,
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [clubApplication, setClubApplication] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    education: "",
    clubId: null,
    portfolio: ""
  });

  const [selectedClub, setSelectedClub] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // New state for chat
  const [newMessage, setNewMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  // Handlers
  const handleRegister = () => {
    if (!registration.name || !registration.email || !registration.phone) {
      alert("Please fill all required fields!");
      return;
    }

    setShowPayment(true);
  };

  const handlePayment = () => {
    if (paymentDetails.method === "upi" && !paymentDetails.upiId) {
      alert("Please enter UPI ID!");
      return;
    }

    if (paymentDetails.method === "card" && (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv)) {
      alert("Please fill all card details!");
      return;
    }

    setEvents(events.map(event => 
      event.id === registration.eventId 
        ? { ...event, participants: event.participants + 1 }
        : event
    ));

    setRegistrationSuccess(true);
    setShowPayment(false);

    setTimeout(() => {
      setRegistrationSuccess(false);
      setRegistration({
        name: "",
        email: "",
        phone: "",
        eventId: null,
      });
      setPaymentDetails({
        method: "upi",
        upiId: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }, 3000);
  };

  const handleClubApplication = () => {
    if (!clubApplication.name || !clubApplication.email || !clubApplication.role) {
      alert("Please fill all required fields!");
      return;
    }

    setApplicationSuccess(true);

    setTimeout(() => {
      setApplicationSuccess(false);
      setClubApplication({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience: "",
        education: "",
        clubId: null,
        portfolio: ""
      });
    }, 3000);
  };

  const handleLike = (postId) => {
    setGalleryPosts(galleryPosts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    setGalleryPosts(galleryPosts.map(post =>
      post.id === postId ? {
        ...post,
        comments: [...post.comments, { id: post.comments.length + 1, user: "current_user", text: comment }]
      } : post
    ));
  };

  const handleShare = (postId) => {
    setGalleryPosts(galleryPosts.map(post =>
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  const handleSendMessage = (clubId) => {
    if (!newMessage.trim()) return;

    setClubs(clubs.map(club =>
      club.id === clubId ? {
        ...club,
        chat: {
          messages: [...club.chat.messages, { id: club.chat.messages.length + 1, user: "current_user", text: newMessage }]
        }
      } : club
    ));

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="bg-white">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="gallery">Event Gallery</TabsTrigger>
          </TabsList>

          {/* Events Tab Content */}
          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <Card key={event.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                      <Badge variant="secondary">{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-gray-600">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.venue}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} participants
                      </div>
                      <div className="flex items-center text-sm font-semibold">
                        Price: ₹{event.price}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full mt-4"
                          onClick={() => {
                            setSelectedEvent(event);
                            setRegistration({ ...registration, eventId: event.id });
                          }}
                        >
                          Register Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
                        {!showPayment ? (
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                              <User className="w-4 h-4 text-gray-500" />
                              <Input
                                placeholder="Your Name"
                                value={registration.name}
                                onChange={(e) => setRegistration({ ...registration, name: e.target.value })}
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <Input
                                type="email"
                                placeholder="Email Address"
                                value={registration.email}
                                onChange={(e) => setRegistration({ ...registration, email: e.target.value })}
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <Input
                                type="tel"
                                placeholder="Phone Number"
                                value={registration.phone}
                                onChange={(e) => setRegistration({ ...registration, phone: e.target.value })}
                              />
                            </div>
                            <Button onClick={handleRegister} className="w-full">
                              Proceed to Payment
                            </Button>
                          </div>
                        ) : (
                          <div className="grid gap-4 py-4">
                            <RadioGroup
                              value={paymentDetails.method}
                              onValueChange={(value) => setPaymentDetails({ ...paymentDetails, method: value })}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upi" id="upi" />
                                <Label htmlFor="upi">UPI</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card">Credit/Debit
                                Card</Label>
                              </div>
                            </RadioGroup>

                            {paymentDetails.method === "upi" ? (
                              <div className="flex items-center gap-4">
                                <Input
                                  placeholder="Enter UPI ID"
                                  value={paymentDetails.upiId}
                                  onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                                />
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <Input
                                  placeholder="Card Number"
                                  value={paymentDetails.cardNumber}
                                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                  <Input
                                    placeholder="MM/YY"
                                    value={paymentDetails.expiryDate}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                                  />
                                  <Input
                                    placeholder="CVV"
                                    type="password"
                                    maxLength={3}
                                    value={paymentDetails.cvv}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                                  />
                                </div>
                              </div>
                            )}

                            <Button onClick={handlePayment} className="w-full">
                              Pay ₹{selectedEvent?.price}
                            </Button>
                          </div>
                        )}
                        {registrationSuccess && (
                          <Alert className="mb-4">
                            <AlertDescription>
                              Registration successful! You will receive a confirmation email shortly.
                            </AlertDescription>
                          </Alert>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clubs Tab Content */}
          <TabsContent value="clubs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map(club => (
                <Card key={club.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{club.logo}</span>
                      <CardTitle>{club.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {club.members} members
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Open Positions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {club.positions.map(position => (
                          <Badge key={position} variant="secondary">{position}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Internal Chat Section */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Club Chat
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogTitle>Club Chat - {club.name}</DialogTitle>
                        <div className="h-64 overflow-y-auto space-y-2 mb-4">
                          {club.chat.messages.map(message => (
                            <div
                              key={message.id}
                              className={`p-2 rounded-lg ${
                                message.user === "current_user"
                                  ? "bg-blue-100 ml-8"
                                  : "bg-gray-100 mr-8"
                              }`}
                            >
                              <div className="text-xs text-gray-500">{message.user}</div>
                              <div>{message.text}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(club.id)}
                          />
                          <Button onClick={() => handleSendMessage(club.id)}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4">
                          Join Club
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogTitle>Apply to {selectedClub?.name}</DialogTitle>
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center gap-4">
                            <User className="w-4 h-4 text-gray-500" />
                            <Input
                              placeholder="Your Name"
                              value={clubApplication.name}
                              onChange={(e) => setClubApplication({ ...clubApplication, name: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <Input
                              type="email"
                              placeholder="Email Address"
                              value={clubApplication.email}
                              onChange={(e) => setClubApplication({ ...clubApplication, email: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <Input
                              type="tel"
                              placeholder="Phone Number"
                              value={clubApplication.phone}
                              onChange={(e) => setClubApplication({ ...clubApplication, phone: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <Select 
                              onValueChange={(value) => setClubApplication({ ...clubApplication, role: value })}
                              value={clubApplication.role}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                              </SelectTrigger>
                              <SelectContent>
                                {club.positions.map(position => (
                                  <SelectItem key={position} value={position}>
                                    {position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {clubApplication.role && club.requirements[clubApplication.role] && (
                            <Alert>
                              <AlertDescription>
                                Requirements: {club.requirements[clubApplication.role]}
                              </AlertDescription>
                            </Alert>
                          )}
                          <div className="flex items-center gap-4">
                            <GraduationCap className="w-4 h-4 text-gray-500" />
                            <Input
                              placeholder="Education Background"
                              value={clubApplication.education}
                              onChange={(e) => setClubApplication({ ...clubApplication, education: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <Textarea
                              placeholder="Relevant Experience"
                              value={clubApplication.experience}
                              onChange={(e) => setClubApplication({ ...clubApplication, experience: e.target.value })}
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Link2 className="w-4 h-4 text-gray-500" />
                            <Input
                              placeholder="Portfolio/GitHub URL"
                              value={clubApplication.portfolio}
                              onChange={(e) => setClubApplication({ ...clubApplication, portfolio: e.target.value })}
                            />
                          </div>
                        </div>
                        {applicationSuccess && (
                          <Alert className="mb-4">
                            <AlertDescription>
                              Application submitted successfully! We'll review your application and get back to you soon.
                            </AlertDescription>
                          </Alert>
                        )}
                        <DialogFooter>
                          <Button onClick={handleClubApplication} className="w-full">
                            Submit Application
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab Content */}
          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryPosts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <img
                    src={post.content}
                    alt={post.caption}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="space-y-4 pt-4">
                    <p className="text-gray-600">{post.caption}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${post.likes > 0 ? "fill-red-500 stroke-red-500" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="text-sm">
                          <span className="font-medium">{comment.user}:</span> {comment.text}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsHub;