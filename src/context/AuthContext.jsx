import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to Retired Mentor!" },
    { id: 2, message: "Complete your profile to get started." },
    { id: 3, message: "You have a new connection request." },
  ]);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const authStatus = localStorage.getItem("isAuthenticated");

    if (storedUser && authStatus === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (userData) => {
    // Add an id field if it doesn't exist
    const userWithId = {
      ...userData,
      id: userData.id || "user-" + Math.random().toString(36).substr(2, 9),
    };

    // Store user data and auth status
    localStorage.setItem("user", JSON.stringify(userWithId));
    localStorage.setItem("isAuthenticated", "true");

    // Update state
    setUser(userWithId);
    setIsAuthenticated(true);

    toast.success("Logged in successfully");

    // Redirect based on user type
    if (userWithId.userType === "Retired User") {
      navigate("/retired-user-dashboard");
    } else {
      navigate("/retired-mentors");
    }
  };

  // Logout function
  const logout = () => {
    // Clear storage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    // Update state
    setUser(null);
    setIsAuthenticated(false);

    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
    notifications,
    setNotifications,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
