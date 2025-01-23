export interface SocialLink {
  name: string;
  href: string;
  type: 'email' | 'twitter' | 'instagram';
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    href: 'mailto:info@astroyapper.com',
    type: 'email',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/astroyapper',
    type: 'twitter',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/astroyapper',
    type: 'instagram',
  },
];