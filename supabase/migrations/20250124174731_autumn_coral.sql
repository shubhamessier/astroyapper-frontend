/*
  # Create users table for Google OAuth

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `google_id` (text, unique) - Google OAuth user ID
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `date_of_birth` (date)
      - `time_of_birth` (time)
      - `timezone` (text)
      - `place_of_birth` (text)
      - `gender` (text)
      - `relationship_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `users` table
    - Add policy for users to read/update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  date_of_birth date,
  time_of_birth time,
  timezone text,
  place_of_birth text,
  gender text,
  relationship_status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO public
  USING (google_id = current_setting('request.jwt.claims')::json->>'sub');

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO public
  USING (google_id = current_setting('request.jwt.claims')::json->>'sub')
  WITH CHECK (google_id = current_setting('request.jwt.claims')::json->>'sub');

-- Allow users to insert their own data
CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (google_id = current_setting('request.jwt.claims')::json->>'sub');