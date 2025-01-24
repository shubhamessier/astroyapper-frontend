import { ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { FeatureCard } from "../components/FeatureCard";
import { features } from "../data/features";

interface HomeProps {
  onSignUpClick: () => void;
}

export function Home({ onSignUpClick }: HomeProps) {
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

        {/* Auth Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="h-14" onClick={onSignUpClick}>
            Sign Up
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14">
            Log In
          </Button>
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