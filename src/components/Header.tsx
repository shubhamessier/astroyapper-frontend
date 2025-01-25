import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onAboutClick?: () => void;
  onJoinCommunityClick?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({
  onAboutClick,
  onJoinCommunityClick,
  showBackButton,
  onBack,
  title = "AstroYapper",
}: HeaderProps) {
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
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onAboutClick ? onAboutClick : () => alert("About clicked")}
              className="text-gray-700"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={onJoinCommunityClick ? onJoinCommunityClick : () => alert("Join the Community clicked")}
              className="text-gray-700"
            >
              Join the Community
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
