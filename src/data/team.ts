export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  avatarFallback: string;
}

export const team: TeamMember[] = [
  {
    name: "Somesh",
    role: "Co-Founder",
    bio: "Professional Yapper with a knack for astrology and charts. Firmly believes his hair is on a secret mission to make a mircalous comeback. Stay Tuned!",
    avatarUrl: "./assets/white-boy-with-black-curls-hair.png",
    avatarFallback: "Somesh Tangde",
  },
  {
    name: "Shubham",
    role: "Co-Founder",
    bio: "Doesn't Yap much, but when he does, it's worth it. Lives on iced tea and americanos.",
    avatarUrl: "./assets/white-boy-black-hair-black-hoodie-with-glasses.png",
    avatarFallback: "Shubham Gaur",
  },
  {
    name: "Akshata",
    role: "UI Design",
    bio: "Code Ninja with a cosmic twist. Believes in astrology, yaps to her friends like it's her full time job and swears to star gods for her debugging skills.",
    avatarUrl: "./assets/akshata.jpg",
    avatarFallback: "Akshata",
  },
];

// <a href="https://ibb.co/8XXSmQM"><img src="https://i.ibb.co/CWWTwSB/white-boy-with-black-curls-hair.png" alt="white-boy-with-black-curls-hair" border="0"></a>
// <a href="https://ibb.co/Rj1JkSX"><img src="https://i.ibb.co/5KdJg9Q/white-boy-black-hair-black-hoodie-with-glasses.png" alt="white-boy-black-hair-black-hoodie-with-glasses" border="0"></a>
// <a href="https://ibb.co/SftvY0p"><img src="https://i.ibb.co/1zr2yKx/akshata.jpg" alt="akshata" border="0"></a>
