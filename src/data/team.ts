export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  avatarFallback: string;
  linkedinUrl: string; // Added LinkedIn URL
}

export const team: TeamMember[] = [
  {
    name: "Somesh",
    role: "Co-Founder",
    bio: "Professional Yapper with a knack for astrology and charts. Firmly believes his hair is on a secret mission to make a mircalous comeback. Stay Tuned!",
    avatarUrl: "https://i.ibb.co/CWWTwSB/white-boy-with-black-curls-hair.png",
    avatarFallback: "Somesh Tangde",
    linkedinUrl: "https://www.linkedin.com/in/someshtangde07/",
  },
  {
    name: "Shubham",
    role: "Co-Founder",
    bio: "Doesn't Yap much, but when he does, it's worth it. Lives on iced tea and americanos.",
    avatarUrl:
      "https://i.ibb.co/5KdJg9Q/white-boy-black-hair-black-hoodie-with-glasses.png",
    avatarFallback: "Shubham Gaur",
    linkedinUrl: "https://www.linkedin.com/in/shubhamgaur10",
  },
  {
    name: "Akshata",
    role: "UI Design",
    bio: "Code Ninja with a cosmic twist. Believes in astrology, yaps to her friends like it's her full time job and swears to star gods for her debugging skills.",
    avatarUrl: "https://i.ibb.co/1zr2yKx/akshata.jpg",
    avatarFallback: "Akshata",
    linkedinUrl: "https://www.linkedin.com/in/akshata-shinde1718/",
  },
];
