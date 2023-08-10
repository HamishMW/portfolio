import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://gd03champ.web.app/icon.svg',
    brandTitle: 'GANISH DEEPAK Components',
    brandUrl: 'https://gd03champ.web.app',
  },
});
