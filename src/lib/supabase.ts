import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

// Create a mock client for development if credentials are missing
const createMockClient = () => {
  console.warn('⚠️ Using mock Supabase client. Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
  
  return {
    from: () => ({
      insert: async () => ({ error: null }),
      select: async () => ({ data: [], error: null }),
    }),
    auth: {
      signUp: async () => ({ data: null, error: null }),
      signIn: async () => ({ data: null, error: null }),
    },
  };
};

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
      },
    })
  : createMockClient() as any;