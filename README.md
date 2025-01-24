# AstroYapper Code Document

## Project Structure (How to Contribute)

```
src/
├── components/        # Add Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   └── ...            # Feature-specific components
├── data/              # All the data variables to be added here, team details etc.
│   ├── features.ts    # Feature definitions
│   ├── team.ts        # Team member data
│   └── social.ts      # Social links configuration
├── lib/               # Utility functions and services
│   ├── supabase.ts    # Supabase client configuration
│   └── utils.ts       # Helper functions
├── pages/             # Add All the different pages here
│   ├── Home.tsx       # Landing page
│   └── About.tsx      # About page
└── assets/            # Static assets (fonts, images)
```

## Database Schema

### Tables

1. **Waitlist**
   ```sql
   CREATE TABLE waitlist (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text UNIQUE NOT NULL,
     created_at timestamptz DEFAULT now()
   );
   ```
   - Purpose: Stores email addresses for the waitlist
   - Security:
     - Anyone can join the waitlist
     - Only authenticated users can view the waitlist

2. **Profiles**
   ```sql
   CREATE TABLE profiles (
     id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
     full_name text,
     date_of_birth date,
     time_of_birth time,
     timezone text,
     place_of_birth text,
     gender text,
     relationship_status text,
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now()
   );
   ```
   - Purpose: Stores user profile information including astrological data
   - Relations: Connected to Supabase Auth users table
   - Fields:
     - `id`: Links to auth.users
     - `full_name`: User's full name
     - `date_of_birth`: Birth date for astrological calculations
     - `time_of_birth`: Precise birth time for accurate charts
     - `timezone`: Birth place timezone
     - `place_of_birth`: Location for astrological calculations
     - `gender`: User's gender identity
     - `relationship_status`: Current relationship status

### Row Level Security (RLS)

#### Waitlist Table
```sql
-- Anyone can join waitlist
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view waitlist
CREATE POLICY "Authenticated users can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);
```

#### Profiles Table
```sql
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
```

### Authentication

- Uses Supabase Auth with Google OAuth
- Email confirmation is disabled by default
- Authentication flow uses PKCE (Proof Key for Code Exchange)
- Session persistence is enabled

### Visual Design

- **Typography**

  - Primary: PP Editorial New (serif)
    - Used for headings and display text
    - Brings timeless elegance and sophistication
  - Secondary: System font stack
    - Used for body text and UI elements

- **Layout**
  - Maximum content width: 5xl (64rem/1024px)
  - Consistent spacing using Tailwind's spacing scale
  - Responsive grid systems
  - Glass-morphism effects for cards and UI elements

## Component Guidelines

### Creating New Components

0. Selecting the right branch

   - Use this command to create a new branch: `git checkout -b branch-name`

1. Place components in appropriate directories:

   - `components/ui/`: Base UI components
   - `components/`: Feature-specific components
   - `pages/`: Full page components

2. Follow the component template:

```tsx
import { type ComponentProps } from '../types';

interface Props {
  // Define strong types
}

export function ComponentName({ prop1, prop2 }: Props) {
  return (
    // JSX
  );
}
```

### How to Style components

1. Use consistent class patterns:

```tsx
className="
  // Layout
  flex items-center justify-between
  // Spacing
  p-4 my-2
  // Typography
  text-lg font-medium
  // Visual
  bg-white/80 backdrop-blur-sm rounded-2xl
  border border-rose-100 shadow-sm
  // States
  hover:bg-rose-50 transition-colors
"
```

## Data Management

### Adding New Content

1. Create or update data files in `src/data/`:

```tsx
// Example: src/data/features.ts
export interface Feature {
  id: string;
  title: string;
  description: string;
  // ...
}

export const features: Feature[] = [
  // Add new features here
];
```

2. Update database schema if needed:
   - Add migrations in `supabase/migrations/`
   - Follow the existing pattern for RLS policies

## Development Workflow

1. **Starting Development**

Install Project

```bash
npm install --force #if required
```

Run Project

```bash
npm run dev
```

2. **Adding New Features**

   - Create new components in appropriate directories
   - Update data files if needed
   - Add new routes if required
   - Update tests

3. **Database Changes**

   - Create new migration files
   - Test RLS policies
   - Update types

4. **Deployment**
   - Build and test locally
   - Deploy to Netlify
   - Verify Supabase connections

## Best Practices

1. **Code Organization**

   - Keep components focused and single-responsibility
   - Extract reusable logic into custom hooks
   - Maintain consistent file naming

2. **Performance**

   - Lazy load routes and heavy components
   - Optimize images and assets
   - Monitor bundle size

3. **State Management**

   - Use local state for UI-specific state
   - Use Supabase for persistent data
   - Consider context for shared state

4. **Testing**
   - Write unit tests for utilities
   - Add component tests for complex components
   - Test database operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request