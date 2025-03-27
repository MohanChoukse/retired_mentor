import React, { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MentorCard } from "@/components/mentors/MentorCard";
import { useAuth } from "../context/AuthContext";

// Mock data for other mentors that can be searched
const mockOtherMentors = [
  {
    id: 1,
    name: "Dr. Rakesh Sharma",
    expertise: "Aerospace Engineering",
    experience: "35 years at ISRO",
    description:
      "Former scientist with expertise in satellite communications and space technology.",
  },
  {
    id: 2,
    name: "Prof. Meera Patel",
    expertise: "Computer Science",
    experience: "28 years at IIT Delhi",
    description:
      "Specialized in artificial intelligence and machine learning algorithms.",
  },
  {
    id: 3,
    name: "Rajiv Kapoor",
    expertise: "Finance",
    experience: "40 years at State Bank of India",
    description: "Expert in banking regulations and financial risk management.",
  },
];

const RetiredUserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = () => {
    // Simple search logic - filter mentors by expertise or name (case insensitive)
    const results = mockOtherMentors.filter(
      (mentor) =>
        mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    setHasSearched(true);

    if (results.length === 0) {
      toast.info("No mentors found for your search criteria.");
    } else {
      toast.success(`Found ${results.length} mentors.`);
    }
  };

  const handleEditProfile = () => {
    toast.info("Edit profile feature coming soon!");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 pt-6 py-12 px-4 space-y-8 mt-12">
        {/* User info card */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-2xl md:text-3xl font-display">
              Welcome, {user?.name || "User"}!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-medium">
                  {user?.email || "Not available"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User Type</p>
                <p className="text-lg font-medium">
                  {user?.userType || "Retired User"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expertise</p>
                <p className="text-lg font-medium">
                  {user?.expertise || "Stocks"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="text-lg font-medium">
                  {user?.experience || "12 years"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-lg">
                {user?.description || "Love to Trade and Stock"}
              </p>
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Search section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Find Other Mentors</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Search results */}
        <div className="mb-8">
          {hasSearched && searchResults.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>

        {/* Logout button */}
        <div className="flex justify-center mb-6">
          <Button
            variant="default"
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default RetiredUserDashboard;
