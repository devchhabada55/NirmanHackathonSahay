import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, MapPin, Users, Utensils, ShoppingBag, Clock, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const Accommodation = () => {
  const [properties] = useState([
    {
      id: 1,
      type: 'Flat',
      title: '2BHK Near College',
      location: 'Kothrud',
      distance: '0.5 km',
      rent: 15000,
      deposit: 50000,
      amenities: ['Furnished', 'WiFi', 'Power Backup'],
      preferredTenants: 'Students',
      available: 'Immediate'
    },
    {
      id: 2,
      type: 'PG',
      title: 'Boys PG Accommodation',
      location: 'Karve Nagar',
      distance: '1 km',
      rent: 8000,
      deposit: 20000,
      amenities: ['Food', 'Laundry', 'WiFi'],
      preferredTenants: 'Boys',
      available: 'From Next Month'
    }
  ]);

  const [messes] = useState([
    {
      id: 1,
      name: 'Maharaj Mess',
      location: 'Near College Gate',
      rating: 4.5,
      monthlyRate: 3000,
      cuisine: 'North Indian',
      speciality: 'Pure Veg',
      menu: {
        monday: ['Paneer', 'Roti', 'Dal', 'Rice']
      }
    },
    {
      id: 2,
      name: 'South Indian Mess',
      location: 'Kothrud',
      rating: 4.3,
      monthlyRate: 2800,
      cuisine: 'South Indian',
      speciality: 'Home Style',
      menu: {
        monday: ['Dosa', 'Sambar', 'Chutney', 'Rice']
      }
    }
  ]);

  const [marketplaceItems] = useState([
    {
      id: 1,
      title: 'Engineering Drawing Kit',
      price: 800,
      condition: 'Like New',
      category: 'Academic',
      description: 'Complete drawing kit with all instruments',
      postedBy: 'Rahul S.',
      postedDate: '2 days ago',
      contact: '9876543210'
    },
    {
      id: 2,
      title: 'Physics Reference Books Set',
      price: 1200,
      condition: 'Good',
      category: 'Books',
      description: 'HC Verma + Resnick Halliday, slightly used',
      postedBy: 'Priya M.',
      postedDate: '1 week ago',
      contact: '9876543211'
    },
    {
      id: 3,
      title: 'Study Table',
      price: 2000,
      condition: 'Used',
      category: 'Furniture',
      description: 'Wooden study table with chair',
      postedBy: 'Amit K.',
      postedDate: '3 days ago',
      contact: '9876543212'
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Tabs defaultValue="properties">
        <TabsList className="mb-4">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="messes">Mess Services</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <div className="space-y-6">
            <div className="flex gap-4 mb-6">
              <Input placeholder="Search locations..." className="flex-1" />
              <Button>Filter</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map(property => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{property.title}</CardTitle>
                      <Badge>{property.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{property.location} ({property.distance} from college)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>₹{property.rent}/month</span>
                        <span>Deposit: ₹{property.deposit}</span>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Amenities:</div>
                        <div className="flex flex-wrap gap-2">
                          {property.amenities.map(amenity => (
                            <Badge key={amenity} variant="outline">{amenity}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>For: {property.preferredTenants}</span>
                        <span>Available: {property.available}</span>
                      </div>
                      <Button className="w-full">Contact Owner</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messes.map(mess => (
              <Card key={mess.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{mess.name}</CardTitle>
                    <Badge>⭐ {mess.rating}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{mess.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{mess.cuisine}</span>
                      <span>₹{mess.monthlyRate}/month</span>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Today's Special:</div>
                      <div className="flex flex-wrap gap-2">
                        {mess.menu.monday.map(item => (
                          <Badge key={item} variant="outline">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full">View Full Menu</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplace">
          <div className="space-y-6">
            <div className="flex gap-4 mb-6">
              <Input placeholder="Search items..." className="flex-1" />
              <Button>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Post New Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceItems.map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-2">{item.title}</CardTitle>
                        <Badge>{item.category}</Badge>
                      </div>
                      <span className="font-bold text-lg">₹{item.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{item.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">{item.condition}</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>{item.postedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{item.postedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          <span>{item.contact}</span>
                        </div>
                      </div>
                      <Button className="w-full">Contact Seller</Button>
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

export default Accommodation;