import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: './icon.svg',
    brandTitle: 'Muhammad Tariq Asim Components',
    brandUrl: 'https://tariqw.com',
  },
});
