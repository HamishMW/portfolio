import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/projects',
  },
  {
    label: 'About',
    pathname: '/#details',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Dribbble',
    url: config.dribbble,
    icon: 'dribbble',
  },
  {
    label: 'Medium',
    url: config.medium,
    icon: 'medium',
  },
  {
    label: 'Figma',
    url: config.figma,
    icon: 'figma',
  },
  {
    label: 'Instagram',
    url: config.instagram,
    icon: 'instagram',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
