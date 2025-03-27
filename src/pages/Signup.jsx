import React, { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { AuthForm } from "../components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [userType, setUserType] = useState("Regular User");
  // const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = (data) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, any signup will succeed
      // Create user object with submitted data
      const userData = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: data.name || data.email.split("@")[0],
        email: data.email,
        userType: userType,
        expertise: userType === "Retired User" ? "Stocks" : "",
        experience: userType === "Retired User" ? "12 years" : "",
        description:
          userType === "Retired User" ? "Love to Trade and Stock" : "",
      };

      // Log user in after signup
      login(userData);

      toast({
        title: "Account created",
        description:
          "Welcome to Retired Mentor! Your account has been created successfully.",
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
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your Retired Mentor account
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
                    <RadioGroupItem value="Regular User" id="r-regular" />
                    <Label htmlFor="r-regular">Regular User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Retired User" id="r-retired" />
                    <Label htmlFor="r-retired">Retired User</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

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
