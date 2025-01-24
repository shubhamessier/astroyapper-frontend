import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Spinner } from "@/components/Spinner";

interface ProfileData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  timezone: string;
  placeOfBirth: string;
  gender: string;
  relationshipStatus: string;
}

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    placeOfBirth: "",
    gender: "",
    relationshipStatus: "",
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            include_granted_scopes: 'true',
          },
        },
      });
      if (error) throw error;
      setShowProfileForm(true);
    } catch (error) {
      console.error('OAuth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      // Redirect to home or dashboard
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] w-full max-w-md mx-auto">
      {!showProfileForm ? (
        <div className="w-full space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm p-8">
          <div className="text-center space-y-4">
            <div className="inline-block p-3 rounded-full bg-rose-50">
              <img
                src="/src/assets/astrology-wheel.png"
                alt="AstroYapper"
                className="w-16 h-16"
              />
            </div>
            <div>
              <h1 className="text-4xl font-sans tracking-tight text-gray-900 mb-2">
                Welcome to AstroYapper
              </h1>
              <p className="text-gray-600">
                Begin your cosmic journey with a personalized astrological experience
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-12 flex items-center justify-center gap-3 text-base hover:bg-rose-50 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="mr-2 h-5 w-5" />
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white/80">
                  By continuing, you agree to our
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <a href="#" className="hover:text-rose-500">Terms of Service</a>
              {" and "}
              <a href="#" className="hover:text-rose-500">Privacy Policy</a>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleProfileSubmit} className="w-full space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm p-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-sans tracking-tight">Your Cosmic Profile</h1>
            <p className="text-gray-600">Help us understand your astrological journey better</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={profileData.fullName}
                onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                required
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Time of Birth</label>
              <input
                type="time"
                required
                value={profileData.timeOfBirth}
                onChange={(e) => setProfileData(prev => ({ ...prev, timeOfBirth: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <select
                required
                value={profileData.timezone}
                onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
              >
                {Intl.supportedValuesOf('timeZone').map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Place of Birth</label>
              <input
                type="text"
                required
                value={profileData.placeOfBirth}
                onChange={(e) => setProfileData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                required
                value={profileData.gender}
                onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Relationship Status</label>
              <select
                required
                value={profileData.relationshipStatus}
                onChange={(e) => setProfileData(prev => ({ ...prev, relationshipStatus: e.target.value }))}
                className="w-full h-12 rounded-full border border-rose-200 bg-white/80 px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="in-relationship">In a Relationship</option>
                <option value="married">Married</option>
                <option value="complicated">It's Complicated</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="mr-2 h-5 w-5" />
            ) : (
              'Complete Profile'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}