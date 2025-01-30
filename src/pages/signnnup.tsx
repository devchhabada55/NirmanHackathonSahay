import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Mail, Lock, User, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
  skills: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    skills: ''
  });

  const calculateProgress = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.length > 0).length;
    return (filledFields / fields.length) * 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join Sahay
          </CardTitle>
          <CardDescription>
            Empowering Campus Life, One Connection at a Time
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Progress value={calculateProgress()} className="mb-6" />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Mail className="w-4 h-4" />
                College Email
              </label>
              <Input
                type="email"
                placeholder="you@viit.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Bookmark className="w-4 h-4" />
                Skills (Optional)
              </label>
              <Input
                type="text"
                placeholder="e.g., Python, UI/UX, Public Speaking"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 text-sm text-center">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
          <div className="text-xs text-gray-400">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-gray-600">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="underline hover:text-gray-600">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
