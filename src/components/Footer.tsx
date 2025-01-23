import { Separator } from "./ui/separator";
import { SocialLinks } from "./SocialLinks";
import { socialLinks } from "../data/social";

export function Footer() {
  return (
    <footer className="py-16 bg-white/40 border-t border-rose-100">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <span className="text-2xl font-sans tracking-[-0.05em] text-gray-900">
            AstroYapper
          </span>
          <div className="flex flex-col items-center space-y-6">
            <SocialLinks links={socialLinks} />
            <a
              href="mailto:info@astroyapper.com"
              className="text-gray-600 hover:text-rose-400 transition-colors"
            >
              info@astroyapper.com
            </a>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AstroYapper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}