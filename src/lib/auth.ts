import { supabase } from "./supabase";

export const handleGoogleLogin = async (credentialResponse: {
  credential: string;
}) => {
  try {
    // Sign in with Google ID token
    const {
      data: { user },
      error: signInError,
    } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: credentialResponse.credential,
    });

    if (signInError) {
      console.error("Error during Google sign-in:", signInError);
      throw signInError;
    }
    if (!user) throw new Error("No user returned from authentication");

    // Check if user profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error during profile fetch:", fetchError);
      throw fetchError;
    }

    if (!existingProfile) {
      // Create new user profile
      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          full_name:
            user.user_metadata?.full_name || user.user_metadata?.name || null, // Get full_name or name and if none, just insert null
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error during profile creation:", insertError);
        throw insertError;
      }

      return newProfile;
    }

    return existingProfile;
  } catch (error) {
    console.error("Failed to handle Google login:", error);
    throw error;
  }
};

export const getUser = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching user:", authError);
    return null;
  }

  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching user profile", profileError);
    return null;
  }

  return profile;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out", error);
  }
};
