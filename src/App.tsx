import React, { useState } from "react";
import {
  ChevronRight,
  Mail,
  Github,
  Twitter,
  Instagram,
  Star,
  Users,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import About from "./pages/About";
import { supabase } from "./lib/supabase";

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setError(null);
      const { error: supabaseError } = await supabase
        .from("waitlist")
        .insert([{ email }]);

      if (supabaseError) {
        if (supabaseError.code === "23505") {
          setError("This email is already on the waitlist!");
        } else {
          setError("Something went wrong. Please try again.");
        }
        return;
      }

      setIsSubmitted(true);
      triggerConfetti();
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  if (showAbout) {
    return <About onBack={() => setShowAbout(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-indigo-50/50">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-sans tracking-[-0.05em] text-gray-900">
                AstroYapper
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowAbout(true)}
              className="text-gray-700"
            >
              About
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center space-y-16">
            <div className="space-y-6">
              <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl text-gray-900 leading-[1.1] tracking-[-0.05em]">
                Your Personal Guide to the Cosmos
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Discover your astrological path and insights, tailored just for
                you.
              </p>
            </div>

            {/* Waitlist Form */}
            <div className="max-w-xl mx-auto">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email to stay updated"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 h-14 rounded-full border border-rose-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent text-base shadow-sm"
                  required
                />
                <Button type="submit" size="lg" className="h-14">
                  Join Waitlist
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              {error && (
                <p className="text-rose-600 mt-4 text-center text-base bg-rose-50 py-2 px-4 rounded-full">
                  {error}
                </p>
              )}
              {isSubmitted && !error && (
                <p className="text-emerald-600 mt-4 text-center text-base bg-emerald-50 py-2 px-4 rounded-full">
                  Thank you! You've been added to the waitlist.
                </p>
              )}
            </div>

            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-rose-100">
              <p className="text-lg text-gray-600 leading-relaxed">
                Astroyapper is your friendly neighbourhood astrologer, designed
                for genZ and millennials who are curious about astrology and
                want to explore their cosmic journey. We provide personalized
                daily horoscopes, detailed birth charts, and a community of
                astrology enthusiasts to connect with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl md:text-5xl text-gray-900 mb-6 tracking-[-0.05em]">
              Explore Our Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the tools and insights that will guide your astrological
              journey.
            </p>
          </div>

          <div>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="daily">Daily Insights</TabsTrigger>
                <TabsTrigger value="personal">Personal Charts</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 shadow-sm">
                  <div className="flex items-start space-x-6">
                    <Star className="h-8 w-8 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-sans text-2xl mb-4 tracking-[-0.05em] text-gray-900">
                        Daily Astrological Guidance
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Receive personalized daily horoscopes and cosmic
                        insights tailored to your birth chart and current
                        planetary positions.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="personal" className="mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 shadow-sm">
                  <div className="flex items-start space-x-6">
                    <Sparkles className="h-8 w-8 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-sans text-2xl mb-4 tracking-[-0.05em] text-gray-900">
                        Detailed Birth Charts
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Generate comprehensive birth charts with detailed
                        interpretations of planetary positions and aspects.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="community" className="mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 shadow-sm">
                  <div className="flex items-start space-x-6">
                    <Users className="h-8 w-8 text-rose-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-sans text-2xl mb-4 tracking-[-0.05em] text-gray-900">
                        Connect with Others
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Join a community of astrology enthusiasts, share
                        experiences, and learn from others on similar cosmic
                        journeys.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white/40 border-t border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8">
            <span className="text-2xl font-sans tracking-[-0.05em] text-gray-900">
              AstroYapper
            </span>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center space-x-6">
                <a
                  href="mailto:info@astroyapper.com"
                  className="text-gray-600 hover:text-rose-400 transition-colors p-2"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/astroyapper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-rose-400 transition-colors p-2"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/astroyapper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-rose-400 transition-colors p-2"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/astroyapper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-rose-400 transition-colors p-2"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
              <a
                href="mailto:info@astroyapper.com"
                className="text-gray-600 hover:text-rose-400 transition-colors"
              >
                info@astroyapper.com
              </a>
            </div>
            <Separator className="my-6" />
            <p className="text-center text-gray-500 text-sm">
              &copy; 2024 AstroYapper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
