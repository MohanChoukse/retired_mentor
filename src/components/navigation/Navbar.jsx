// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { CustomButton } from "../ui/custom-button";
// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   // Handle scroll events
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);
//   const navLinks = [
//     {
//       title: "Home",
//       path: "/",
//     },
//     {
//       title: "Mentors",
//       path: "/retired-mentors",
//     },
//     {
//       title: "Dashboard",
//       path: "/dashboard",
//     },
//     {
//       title: "About Us",
//       path: "/about",
//     },
//   ];
//   const isActive = (path) => {
//     if (path === "/" && location.pathname === "/") return true;
//     if (path !== "/" && location.pathname.startsWith(path)) return true;
//     return false;
//   };
//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
//         isScrolled
//           ? "bg-background/80 backdrop-blur-md shadow-sm border-border/50"
//           : "bg-transparent border-transparent"
//       )}
//     >
//       <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center space-x-2"
//             aria-label="Retired Mentor"
//           >
//             <div className="relative flex items-center">
//               <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-sm">
//                 <span className="font-display text-white font-bold text-lg">
//                   RM
//                 </span>
//               </div>
//               <span className="ml-2 text-xl font-display font-semibold tracking-tight">
//                 Retired Mentor
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={cn("nav-link", isActive(link.path) && "active")}
//               >
//                 {link.title}
//               </Link>
//             ))}
//           </nav>

//           {/* Auth buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link to="/login">
//               <CustomButton variant="outline" size="sm">
//                 Sign In
//               </CustomButton>
//             </Link>
//             <Link to="/signup">
//               <CustomButton size="sm">Get Started</CustomButton>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden rounded-md p-2 inline-flex items-center justify-center transition-colors hover:bg-muted"
//             aria-expanded={isMobileMenuOpen}
//           >
//             <span className="sr-only">Open main menu</span>
//             {isMobileMenuOpen ? (
//               <X className="block h-6 w-6" aria-hidden="true" />
//             ) : (
//               <Menu className="block h-6 w-6" aria-hidden="true" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu, show/hide based on menu state */}
//       <div
//         className={cn(
//           "md:hidden transition-all duration-300 overflow-hidden",
//           isMobileMenuOpen ? "max-h-[400px] border-t" : "max-h-0"
//         )}
//       >
//         <div className="px-4 pt-2 pb-3 space-y-1 bg-background">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={cn(
//                 "block px-3 py-3 rounded-md text-base",
//                 isActive(link.path)
//                   ? "text-primary font-medium"
//                   : "text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
//               )}
//             >
//               {link.title}
//             </Link>
//           ))}
//           <div className="pt-2 pb-1 flex flex-col space-y-2">
//             <Link to="/login" className="w-full">
//               <CustomButton variant="outline" size="sm" className="w-full">
//                 Sign In
//               </CustomButton>
//             </Link>
//             <Link to="/signup" className="w-full">
//               <CustomButton size="sm" className="w-full">
//                 Get Started
//               </CustomButton>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Bell, User, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "../ui/custom-button";
import { useAuth } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, notifications } = useAuth();
  const notificationCount = notifications?.length || 0;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation links change based on authentication status
  const navLinks = isAuthenticated
    ? user?.userType === "Retired User"
      ? [
          { title: "Home", path: "/" },
          { title: "Dashboard", path: "/retired-user-dashboard" },
          { title: "About Us", path: "/about" },
        ]
      : [
          { title: "Home", path: "/" },
          { title: "Find Mentors", path: "/retired-mentors" },

          { title: "About Us", path: "/about" },
        ]
    : [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/about" },
      ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    toast.info("Edit profile feature coming soon!");
  };

  const handleViewNotification = (message) => {
    toast.info(message);
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user?.id || "default"}`);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border/50"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="RetiredMentor"
          >
            <div className="relative flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-sm">
                <span className="font-display text-white font-bold text-lg">
                  RM
                </span>
              </div>
              <span className="ml-2 text-xl font-display font-semibold tracking-tight">
                Retired Mentor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn("nav-link", isActive(link.path) && "active")}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Auth buttons or Logout button based on auth status */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative rounded-full p-2 hover:bg-muted">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-[10px]">
                          {notificationCount}
                        </Badge>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="px-4 py-2 font-medium">Notifications</div>
                    <DropdownMenuSeparator />
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="px-4 py-3 cursor-pointer"
                          onClick={() =>
                            handleViewNotification(notification.message)
                          }
                        >
                          <div>
                            <p>{notification.message}</p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-muted-foreground">
                        No notifications
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1 rounded-full p-2 hover:bg-muted">
                      <User className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-4 py-2 text-sm font-medium">
                      {user?.name || "User"}
                    </div>
                    <DropdownMenuSeparator />
                    {/* Show Edit Profile only for Retired Users */}
                    {user?.userType === "Retired User" && (
                      <>
                        <DropdownMenuItem onClick={handleViewProfile}>
                          <User className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleEditProfile}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Profile</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <CustomButton variant="outline" size="sm">
                    Sign In
                  </CustomButton>
                </Link>
                <Link to="/signup">
                  <CustomButton size="sm">Get Started</CustomButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center transition-colors hover:bg-muted"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] border-t" : "max-h-0"
        )}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-background">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-3 py-3 rounded-md text-base",
                isActive(link.path)
                  ? "text-primary font-medium"
                  : "text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              )}
            >
              {link.title}
            </Link>
          ))}

          {/* Mobile auth buttons or logout button */}
          {/* Mobile auth buttons or user actions */}
          <div className="pt-2 pb-1 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                {/* Mobile notifications */}
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    <span>Notifications</span>
                  </div>
                  {notificationCount > 0 && (
                    <Badge className="px-1.5 py-0.5 bg-red-500">
                      {notificationCount}
                    </Badge>
                  )}
                </div>

                {/* Mobile edit profile - only for Retired Users */}
                <div
                  className="flex items-center px-3 py-2 cursor-pointer"
                  onClick={handleViewProfile}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>View Profile</span>
                </div>

                <div
                  className="flex items-center px-3 py-2 cursor-pointer"
                  onClick={handleEditProfile}
                >
                  <Edit className="h-5 w-5 mr-2" />
                  <span>Edit Profile</span>
                </div>
                {/* Mobile logout */}
                <CustomButton
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </CustomButton>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <CustomButton variant="outline" size="sm" className="w-full">
                    Sign In
                  </CustomButton>
                </Link>
                <Link to="/signup" className="w-full">
                  <CustomButton size="sm" className="w-full">
                    Get Started
                  </CustomButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
