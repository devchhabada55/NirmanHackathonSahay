import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';

const CommunityHub = () => {
  const [communities] = useState([
    {
      id: 1,
      name: 'Coding Enthusiasts',
      members: 234,
      description: 'A space for passionate programmers to collaborate and learn',
      tags: ['Programming', 'Tech', 'Learning'],
      posts: [
        {
          id: 1,
          author: 'Alex Kumar',
          content: 'Just wrapped up an amazing React workshop! Check out the resources below 👇',
          likes: 45,
          comments: 12
        }
      ]
    },
    {
      id: 2,
      name: 'Art Club',
      members: 156,
      description: 'Express yourself through various art forms',
      tags: ['Art', 'Creative', 'Design'],
      posts: [
        {
          id: 1,
          author: 'Priya Shah',
          content: 'Upcoming sketching workshop this weekend! Limited spots available.',
          likes: 32,
          comments: 8
        }
      ]
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Communities</h1>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Create Community
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map(community => (
          <Card key={community.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{community.name}</span>
                <Badge variant="secondary">{community.members} members</Badge>
              </CardTitle>
              <p className="text-gray-600">{community.description}</p>
              <div className="flex gap-2 mt-2">
                {community.tags.map(tag => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              {community.posts.map(post => (
                <div key={post.id} className="border rounded-lg p-4 mb-4">
                  <div className="font-medium mb-2">{post.author}</div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Heart size={16} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <MessageCircle size={16} />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <div className="w-full">
                <Input placeholder="Write a post..." className="mb-2" />
                <Button className="w-full">Post</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityHub;
