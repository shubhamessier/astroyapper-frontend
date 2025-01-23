import { Mail, Twitter, Instagram } from "lucide-react";
import type { SocialLink } from "../data/social";

const iconMap = {
  email: Mail,
  twitter: Twitter,
  instagram: Instagram,
};

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex items-center space-x-6">
      {links.map((link) => {
        const Icon = iconMap[link.type];
        return (
          <a
            key={link.type}
            href={link.href}
            target={link.type !== 'email' ? "_blank" : undefined}
            rel={link.type !== 'email' ? "noopener noreferrer" : undefined}
            className="text-gray-600 hover:text-rose-400 transition-colors p-2"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}