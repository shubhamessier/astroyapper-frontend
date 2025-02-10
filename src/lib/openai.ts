import { ASTROLOGY_SYSTEM_PROMPT } from "./prompt";
import { supabase } from "./supabase";

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

interface UserProfile {
  full_name: string;
  date_of_birth: string;
  time_of_birth: string;
  timezone: string;
  place_of_birth: string;
  gender: string;
  relationship_status: string;
}

async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

function createUserContext(profile: UserProfile): string {
  return `
User Profile Information:
- Name: ${profile.full_name}
- Date of Birth: ${profile.date_of_birth}
- Time of Birth: ${profile.time_of_birth}
- Birth Place: ${profile.place_of_birth}
- Timezone: ${profile.timezone}
- Gender: ${profile.gender}
- Relationship Status: ${profile.relationship_status}

Please use this information to provide personalized astrological insights when relevant to the user's questions.`;
}

export async function getAstrologicalResponse(
  message: string
): Promise<string> {
  try {
    const profile = await getUserProfile();
    const systemMessage = profile
      ? `${ASTROLOGY_SYSTEM_PROMPT}\n\n${createUserContext(profile)}`
      : ASTROLOGY_SYSTEM_PROMPT;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response from OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I apologize, but I'm having trouble connecting to my celestial wisdom at the moment. Please try again shortly.";
  }
}
