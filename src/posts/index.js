import { lazy } from 'react';
import TestBannerVideo from '../assets/post-inclusive-motion.mp4';
import TestBannerPlaceholder from '../assets/post-inclusive-motion-placeholder.jpg';
import PineappleBanner from '../assets/spr-background.jpg';
import PineappleBannerPlaceholder from '../assets/spr-background-placeholder.jpg';

const TestPost = lazy(() => import('../posts/test.mdx'));
const PineapplePost = lazy(() => import('../posts/pineapple.mdx'));

const posts = [
  {
    title: 'Accessible motion design for the web',
    description: 'This is a rad test post',
    bannerVideo: TestBannerVideo,
    bannerPlaceholder: TestBannerPlaceholder,
    bannerAlt: 'An animation of Kaneda from the film Akira sliding sideways on a motorcycle away from the camera',
    bannerCredit: 'Akira, 1988',
    tags: ['development', 'design', 'accessiblity'],
    path: '/test',
    content: TestPost,
    date: '2019-06-29',
  },
  {
    title: 'Pine face',
    description: 'A tasty pineapple post',
    banner: PineappleBanner,
    bannerPlaceholder: PineappleBannerPlaceholder,
    tags: ['pineapple', 'pizza'],
    path: '/pineapple',
    content: PineapplePost,
    date: '2019-06-29',
  },
];

export default posts;
