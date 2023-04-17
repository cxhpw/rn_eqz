import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<AppParamList> = {
  enabled: true,
  prefixes: ['rntemplate://'],
  config: {
    screens: {
      Detail: 'detail/:id',
    },
  },
};
