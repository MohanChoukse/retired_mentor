import React, { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { AuthForm } from "../components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("Regular User");
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = (data) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, any login will succeed
      toast({
        title: "Login successful",
        description: "Welcome back to retired mentro!",
      });

      // Create user object with mock data
      const userData = {
        id: 1,
        name: data.name || "Mohan Chouksey",
        email: data.email,
        userType: userType,
        expertise: userType === "Retired User" ? "Stocks" : "",
        experience: userType === "Retired User" ? "12 years" : "",
        description:
          userType === "Retired User" ? "Love to Trade and Stock" : "",
      };

      // Redirect to dashboard
      // navigate("/dashboard");
      // Call login function from AuthContext
      login(userData);
    }, 1500);
  };

  const handleGoogleLogin = (token: string) => {
    setIsLoading(true);

    // Here you would normally send the token to your backend for verification
    console.log("Google access token:", token);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      toast({
        title: "Google login successful",
        description: "Welcome back to Retired mentor!",
      });

      // Redirect to dashboard
      // navigate("/dashboard");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12">
        <div className="grid w-full max-w-md space-y-8 bg-card p-8 shadow-sm border rounded-xl animate-scale-in">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>

          {/* User Type Selection */}
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-3">Select User Type</h3>
                <RadioGroup
                  defaultValue="Regular User"
                  onValueChange={setUserType}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Regular User" id="regular" />
                    <Label htmlFor="regular">Regular User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Retired User" id="retired" />
                    <Label htmlFor="retired">Retired User</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <AuthForm
            type="login"
            onSubmit={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
