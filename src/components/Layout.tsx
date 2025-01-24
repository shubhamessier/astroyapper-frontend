import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  onAboutClick?: () => void;
  onChatClick?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Layout({
  children,
  onAboutClick,
  onChatClick,
  showBackButton,
  onBack,
  title,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-indigo-50/50">
      <Header
        onAboutClick={onAboutClick}
        onChatClick={onChatClick}
        showBackButton={showBackButton}
        onBack={onBack}
        title={title}
      />
      <main className="pt-44 pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}