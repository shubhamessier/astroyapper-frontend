import { Star, Heart, Compass, Moon } from "lucide-react";
import { TeamMember } from "../components/TeamMember";
import { team } from "../data/team";

export function About() {
  const values = [
    {
      icon: Star,
      title: "Authenticity",
      description: "We honor the ancient traditions while embracing modern interpretations.",
    },
    {
      icon: Heart,
      title: "Inclusivity",
      description: "Astrology is for everyone, regardless of background or experience.",
    },
    {
      icon: Compass,
      title: "Innovation",
      description: "We use technology to make cosmic wisdom more accessible.",
    },
    {
      icon: Moon,
      title: "Growth",
      description: "We support your journey of personal development and self-discovery.",
    },
  ];

  // Calculate the grid columns based on team size
  const gridCols = team.length <= 3 ? team.length : Math.min(3, Math.ceil(team.length / 2));

  return (
    <div className="space-y-24">
      {/* Vision Section */}
      <section>
        <h1 className="font-sans text-5xl sm:text-6xl text-gray-900 mb-8 leading-[1.1] tracking-[-0.05em]">
          Our Vision
        </h1>
        <div className="space-y-6 text-lg text-gray-600 leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-rose-100 shadow-sm">
          <p>
            AstroYapper was born from a desire to make astrology more accessible
            and meaningful in our daily lives. We believe that the ancient wisdom
            of the stars can provide guidance and insight in our modern world.
          </p>
          <p>
            Our mission is to bridge the gap between traditional astrological
            knowledge and contemporary life, creating a space where cosmic wisdom
            meets modern technology.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="font-sans text-3xl sm:text-4xl text-gray-900 mb-8 leading-[1.1] tracking-[-0.05em]">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4">
                <value.icon className="h-6 w-6 text-rose-400" />
                <h3 className="font-sans text-2xl tracking-[-0.05em] text-gray-900">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
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
              We're a diverse group of astrologers, designers, and developers
              united by our passion for cosmic wisdom and technological
              innovation.
            </p>

            <div 
              className="grid gap-8"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                maxWidth: `${gridCols * 300}px`,
                margin: '0 auto'
              }}
            >
              {team.map((member) => (
                <TeamMember key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}