// import React from "react";
// import { useParams } from "react-router-dom";
// import {
//   Mail,
//   Award,
//   Briefcase,
//   MessageCircle,
//   Calendar,
//   FileText,
// } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { CustomButton } from "@/components/ui/custom-button";
// import { Separator } from "@/components/ui/separator";
// import { useAuth } from "../context/AuthContext";

// const ProfilePage = () => {
//   const { id } = useParams();
//   const { user } = useAuth();

//   // Use user data from auth context if available, otherwise use sample data
//   const profile = {
//     name: user?.name || "Ramesh Kumar",
//     email: user?.email || "rameshk@gmail.com",
//     userType: user?.userType || "Retired User",
//     expertise: user?.expertise || "Music",
//     experience: user?.experience || "25 years",
//     description:
//       user?.description ||
//       "Love to sing and play various musical instruments. I have been teaching music for over two decades and have performed in numerous concerts across the country.",
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-wisdom-light-blue to-background py-20 px-4">
//       <div className="container mx-auto max-w-4xl">
//         <Card className="overflow-hidden bg-card shadow-card animate-fade-in">
//           {/* Profile Header */}
//           <div className="relative">
//             {/* Background Banner */}
//             <div className="h-40 bg-gradient-hero"></div>

//             {/* Profile Image & Name */}
//             <div className="flex flex-col items-center -mt-16">
//               <div className="h-32 w-32 rounded-full border-4 border-card bg-wisdom-blue text-white font-bold text-4xl flex items-center justify-center shadow-lg">
//                 {profile.name.charAt(0)}
//               </div>

//               <h1 className="mt-4 text-3xl font-display font-bold text-foreground">
//                 {profile.name}
//               </h1>
//               <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-wisdom-light-blue text-wisdom-blue text-sm font-medium">
//                 {profile.userType}
//               </div>
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="p-6 md:p-8">
//             {/* Contact & Info */}
//             <div className="flex flex-col md:flex-row gap-6 mb-6">
//               <div className="flex-1 space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <Mail className="mt-1 h-5 w-5 text-wisdom-blue" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Email</p>
//                     <p className="font-medium">{profile.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <Award className="mt-1 h-5 w-5 text-wisdom-blue" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Expertise</p>
//                     <p className="font-medium">{profile.expertise}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <Briefcase className="mt-1 h-5 w-5 text-wisdom-blue" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Experience</p>
//                     <p className="font-medium">{profile.experience}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold mb-2">About</h3>
//                 <p className="text-muted-foreground">{profile.description}</p>
//               </div>
//             </div>

//             <Separator className="my-6" />

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold mb-4">
//                 Connect with {profile.name.split(" ")[0]}
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
//                 <CustomButton className="bg-wisdom-blue hover:bg-wisdom-blue/90">
//                   <MessageCircle className="h-4 w-4" />
//                   Chat Request
//                 </CustomButton>

//                 <CustomButton className="bg-wisdom-blue hover:bg-wisdom-blue/90">
//                   <Calendar className="h-4 w-4" />
//                   Schedule a Meet
//                 </CustomButton>

//                 <CustomButton className="bg-wisdom-blue hover:bg-wisdom-blue/90">
//                   <FileText className="h-4 w-4" />
//                   View Work
//                 </CustomButton>
//               </div>

//               <div className="mt-6 text-center text-sm text-muted-foreground">
//                 No work uploaded yet.
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  Award,
  Briefcase,
  MessageCircle,
  Calendar,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // User Profile Data (From Context or Defaults)
  const profile = {
    name: user?.name || "Ramesh Kumar",
    email: user?.email || "rameshk@gmail.com",
    userType: user?.userType || "Retired User",
    expertise: user?.expertise || "Music",
    experience: user?.experience || "25 years",
    description:
      user?.description ||
      "Love to sing and play various musical instruments. I have been teaching music for over two decades and have performed in numerous concerts across the country.",
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-100 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
          {/* Profile Header */}
          <div className="relative">
            {/* Background Banner */}
            <div className="h-40 bg-gradient-to-r from-blue-300 to-indigo-500"></div>

            {/* Profile Image & Name */}
            <div className="flex flex-col items-center -mt-16">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-500 text-white font-bold text-4xl flex items-center justify-center shadow-lg">
                {profile.name.charAt(0)}
              </div>

              <h1 className="mt-4 text-3xl font-display font-bold text-gray-900">
                {profile.name}
              </h1>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                {profile.userType}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            {/* Contact & Info */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="mt-1 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="mt-1 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Expertise</p>
                    <p className="font-medium">{profile.expertise}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Briefcase className="mt-1 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{profile.experience}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700">{profile.description}</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-4">
                Connect with {profile.name.split(" ")[0]}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <CustomButton className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat Request
                </CustomButton>

                <CustomButton className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule a Meet
                </CustomButton>

                <CustomButton className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Work
                </CustomButton>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                No work uploaded yet.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
