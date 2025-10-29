import { baseMeta } from '~/utils/meta';
import { json } from '@remix-run/node';
import config from '~/config.json';

export async function loader() {
  // Define all projects manually
  const projects = [
    {
      slug: 'pcos-femcare',
      title: 'PCOS Healthcare App',
      description: 'End-to-end UX research and design for a healthcare app helping women manage PCOS',
      category: 'UX Case Study',
      year: '2022',
      featured: true,
    },
    {
      slug: 'ai-b2b-saas',
      title: 'AI-Powered B2B SaaS',
      description: 'Designing intelligent workflows for enterprise teams with AI-driven insights',
      category: 'UX Case Study',
      year: '2024',
      featured: true,
    },
    {
      slug: 'microanimations',
      title: 'Micro-Interactions Collection',
      description: 'A curated collection of delightful UI animations and micro-interactions',
      category: 'Interaction Design',
      year: '2023-2024',
      featured: true,
    },
    {
      slug: 'mental-health',
      title: 'Mental Health for Young Professionals',
      description: 'Product case study designing mental wellness solutions for young professionals',
      category: 'Product Case Study',
      year: '2023',
      featured: false,
    },
    {
      slug: 'figma-variables-testing',
      title: 'User Testing with Figma Variables',
      description: 'Leveraging Figma Variables to create dynamic, testable prototypes',
      category: 'UX Research',
      year: '2024',
      featured: false,
    },
    {
      slug: 'b2b-design-system',
      title: 'B2B SaaS Design System',
      description: 'Comprehensive design system for enterprise SaaS products',
      category: 'Design Systems',
      year: '2023',
      featured: false,
    },
    {
      slug: 'fintech-design-system',
      title: 'Fintech Design System',
      description: 'Scalable design system built for Qwark\'s fintech platform',
      category: 'Design Systems',
      year: '2023-2024',
      featured: false,
    },
  ];

  return json({ projects });
}

export function meta() {
  return baseMeta({
    title: 'Projects',
    description: `A collection of UX case studies, design systems, and product work by ${config.name}. From 0-to-1 products to enterprise design systems.`,
  });
}

export { Projects as default } from './projects';
