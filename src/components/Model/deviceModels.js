const iphone11 = '/assets/iphone-11.glb';
const macbookPro = '/assets/macbook-pro.glb';

export const ModelAnimationType = {
  SpringUp: 'spring-up',
  LaptopOpen: 'laptop-open',
};

export const deviceModels = {
  phone: {
    url: iphone11,
    width: 374,
    height: 512,
    position: { x: 0, y: 0, z: 0 },
    animation: ModelAnimationType.SpringUp,
  },
  laptop: {
    url: macbookPro,
    width: 1280,
    height: 800,
    position: { x: 0, y: 0, z: 0 },
    animation: ModelAnimationType.LaptopOpen,
  },
};
