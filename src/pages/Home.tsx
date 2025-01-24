import { useState } from "react";
import { ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { FeatureCard } from "../components/FeatureCard";
import { features } from "../data/features";
import { supabase } from "../lib/supabase";

export function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-20">
        <div className="space-y-6">
          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl text-gray-900 leading-[1.1] tracking-[-0.05em]">
            Astrology, Made Personal.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your astrological path and insights, tailored just for you.
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full" // Added w-full to form
          >
            <input
              type="email"
              placeholder="Enter your email here."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 rounded-full border border-rose-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent text-lg shadow-md min-w-0
        px-4 sm:px-6 py-2 sm:py-0 
        m-0 sm:mr-3 
        "
              required
            />
            <Button type="submit" size="lg" className="h-14 w-full sm:w-auto">
              {" "}
              {/* Added w-full for smaller screens */}
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
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-16 mt-40">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 tracking-[-0.05em]">
            Explore Our Features
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Astroyapper is your modern astrology buddy, that understands you in
            every way, and makes the best predictions for your day. Made
            possible by blending both AI and Astrology to create something
            seamless.
          </p>
        </div>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id}>
                {feature.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <FeatureCard feature={feature} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
