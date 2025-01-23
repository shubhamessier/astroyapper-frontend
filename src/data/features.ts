import { Moon, Sun, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

export const features: Feature[] = [
  {
    id: "daily",
    icon: Sun,
    title: "Daily Astrological Guidance",
    description:
      "Receive personalized daily horoscopes and cosmic insights tailored to your birth chart and current planetary positions. Our advanced algorithms combine traditional wisdom with modern astronomical data.",
    details: [
      "Personalized daily horoscopes",
      "Planetary transit interpretations",
      "Lucky hours and favorable times",
    ],
  },
  {
    id: "personal",
    icon: Moon,
    title: "Detailed Birth Charts",
    description:
      "Generate comprehensive birth charts with detailed interpretations of planetary positions and aspects. Understand your unique cosmic blueprint and life path through interactive visualizations.",
    details: [
      "Interactive chart visualization",
      "Detailed aspect analysis",
      "Progressive forecasting",
    ],
  },
  {
    id: "community",
    icon: Heart,
    title: "Connect with Others",
    description:
      "Join a vibrant community of astrology enthusiasts. Share experiences, participate in discussions, and learn from others on similar cosmic journeys. Access exclusive events and workshops.",
    details: ["Live astrology workshops", "Expert consultations"],
  },
];
