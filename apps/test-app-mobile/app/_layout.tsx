import { store } from '@mono-repo-ronas-bootstrap/test-app-mobile/shared/data-access/store';
import { fonts } from '@mono-repo-ronas-bootstrap/test-app-mobile/shared/ui/styles';
import { setLanguage } from '@ronas-it/react-native-common-modules/i18n';
import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Fragment, ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';

export { ErrorBoundary } from 'expo-router';
const translations = {
  en: {
    ...require('i18n/test-app-mobile/app/en.json'),
    ...require('i18n/test-app-mobile/shared/en.json'),
  },
};
const useLanguage = setLanguage(translations, 'en');
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App(): ReactElement {
  useLanguage('en');

  return (
    <Stack>
      <Stack.Screen name='index' />
    </Stack>
  );
}

function RootLayout(): ReactElement | null {
  const [loaded, error] = useFonts(fonts);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Fragment>
      <Provider store={store}>
        <StatusBar style='light' />
        <App />
      </Provider>
    </Fragment>
  );
}
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  dsn: Constants.expoConfig?.extra?.sentry?.dsn,
  environment: Constants.expoConfig?.extra?.env,
  debug: false,
  integrations: [navigationIntegration],
  enableNativeFramesTracking: !isRunningInExpoGo(), // Tracks slow and frozen frames in the application
  enabled: !__DEV__,
});

export default Sentry.wrap(RootLayout);
