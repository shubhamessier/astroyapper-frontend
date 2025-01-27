import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onAboutClick?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ onAboutClick, showBackButton, onBack, title = "AstroYapper" }: HeaderProps) {
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-rose-100 shadow-sm">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showBackButton && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="mr-4 text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <span className="text-2xl font-sans tracking-[-0.05em] text-gray-900">
              {title}
            </span>
          </div>
          {onAboutClick && (
            <Button
              variant="ghost"
              onClick={onAboutClick}
              className="text-gray-700"
            >
              About
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}