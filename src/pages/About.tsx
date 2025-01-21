import {
  ArrowLeft,
  Star,
  Heart,
  Compass,
  Moon,
  Mail,
  Twitter,
  Instagram,
  Github,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

interface AboutProps {
  onBack: () => void;
}

function About({ onBack }: AboutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-indigo-50/50">
      <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-rose-100 shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mr-4 text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-2xl font-sans tracking-[-0.05em] text-gray-900">
              About
            </span>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {/* Vision Section */}
            <section>
              <h1 className="font-sans text-5xl sm:text-6xl text-gray-900 mb-8 leading-[1.1] tracking-[-0.05em]">
                Our Vision
              </h1>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 shadow-sm">
                <p>
                  AstroYapper was born from a desire to make astrology more
                  accessible and meaningful in our daily lives. We believe that
                  the ancient wisdom of the stars can provide guidance and
                  insight in our modern world.
                </p>
                <p>
                  Our mission is to bridge the gap between traditional
                  astrological knowledge and contemporary life, creating a space
                  where cosmic wisdom meets modern technology.
                </p>
              </div>
            </section>

            {/* Values Section */}
            <section>
              <h2 className="font-sans text-3xl sm:text-4xl text-gray-900 mb-8 leading-[1.1] tracking-[-0.05em]">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm">
                  <div className="flex items-center space-x-4 mb-4">
                    <Star className="h-6 w-6 text-rose-400" />
                    <h3 className="font-sans text-2xl tracking-[-0.05em] text-gray-900">
                      Authenticity
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    We honor the ancient traditions while embracing modern
                    interpretations.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm">
                  <div className="flex items-center space-x-4 mb-4">
                    <Heart className="h-6 w-6 text-rose-400" />
                    <h3 className="font-sans text-2xl tracking-[-0.05em] text-gray-900">
                      Inclusivity
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Astrology is for everyone, regardless of background or
                    experience.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm">
                  <div className="flex items-center space-x-4 mb-4">
                    <Compass className="h-6 w-6 text-rose-400" />
                    <h3 className="font-sans text-2xl tracking-[-0.05em] text-gray-900">
                      Innovation
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    We use technology to make cosmic wisdom more accessible.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm">
                  <div className="flex items-center space-x-4 mb-4">
                    <Moon className="h-6 w-6 text-rose-400" />
                    <h3 className="font-sans text-2xl tracking-[-0.05em] text-gray-900">
                      Growth
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    We support your journey of personal development and
                    self-discovery.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section>
              <h2 className="font-sans text-3xl sm:text-4xl text-gray-900 mb-8 leading-[1.1] tracking-[-0.05em]">
                Our Team
              </h2>
              <div className="space-y-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 shadow-sm">
                  <p className="text-lg text-gray-600 leading-relaxed mb-12">
                    We're a diverse group of astrologers, designers, and
                    developers united by our passion for cosmic wisdom and
                    technological innovation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Luna Starling */}

                    {/* Aria Zhang */}
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="h-24 w-24 border-2 border-rose-100">
                        <AvatarImage src="../../assets/white-boy-with-black-curls-hair.png" />
                        <AvatarFallback>Somesh Tangde</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-sans text-xl tracking-[-0.05em] text-gray-900 mb-2">
                          Somesh Tangde, Co-Founder
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Professional Yapper, likes to yap a lot. Believes in
                          Astrology and the power of the stars.
                        </p>
                      </div>
                    </div>

                    {/* Sam Rivera */}
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="h-24 w-24 border-2 border-rose-100">
                        <AvatarImage src="../../assets/white-boy-black-hair-black-hoodie-with-glasses.png" />
                        <AvatarFallback>Shubham Gaur</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-sans text-xl tracking-[-0.05em] text-gray-900 mb-2">
                          Shubham Gaur, Co-Founder
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Doesn't Yap much, but when he does, it's worth it.
                          Lives on iced tea and americanos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-white/40 border-t border-rose-100">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8">
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
            </div>
            <Separator className="mb-6" />
            <p className="text-center text-gray-500 text-sm">
              &copy; 2024 AstroYapper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
