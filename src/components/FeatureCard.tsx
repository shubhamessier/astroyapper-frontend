import { Star } from "lucide-react";
import type { Feature } from "../data/features";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const { icon: Icon, title, description, details } = feature;
  
  return (
    <div className="feature-card group">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Icon className="feature-icon" />
            <div className="text-center sm:text-left">
              <h3 className="font-sans text-xl sm:text-2xl mb-4 tracking-[-0.05em] text-gray-900">
                {title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-primary/10">
            {details.map((detail, index) => (
              <li
                key={index}
                className="flex items-center justify-center sm:justify-start gap-2"
              >
                <Star className="h-4 w-4 text-primary/60" />
                <span className="text-gray-600">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}