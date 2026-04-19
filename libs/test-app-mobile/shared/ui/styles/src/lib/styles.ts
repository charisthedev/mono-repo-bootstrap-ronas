import { StyleSheet } from 'react-native-unistyles';
import { appThemes } from './themes';
import { spacings } from './variables';

StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  themes: appThemes,
});

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
   
  export interface UnistylesThemes {
    light: AppThemes['light'];
  }
}

export const commonStyle = StyleSheet.create({
  container: {
    paddingHorizontal: spacings.md,
  },
  fullFlex: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
});
