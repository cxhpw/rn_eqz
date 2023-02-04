import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<AppParamList> = {
  enabled: true,
  prefixes: ['rntemplate://'],
  config: {
    screens: {
      Home: {
        screens: {
          Two: 'two',
          Three: 'three',
        },
      },
      Detail: 'user',
    },
  },
};
