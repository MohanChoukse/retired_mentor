
import React, { useState } from 'react';
import { MainLayout } from '../components/layouts/MainLayout';
import { AuthForm } from '../components/auth/AuthForm';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignup = (data: Record<string, string>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any signup will succeed
      toast({
        title: "Account created",
        description: "Welcome to WisdomWave! Your account has been created successfully.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12">
        <div className="grid w-full max-w-md space-y-8 bg-card p-8 shadow-sm border rounded-xl animate-scale-in">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your WisdomWave account
            </p>
          </div>
          
          <AuthForm 
            type="signup"
            onSubmit={handleSignup} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
