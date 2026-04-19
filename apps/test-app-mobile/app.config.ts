import { EASConfig, ExpoConfig } from '@expo/config';
const createConfig = (): Omit<ExpoConfig, 'extra'> & {
  extra: {
    eas: EASConfig;
  } & typeof extra;
} => {
  const projectId = '';
  const appId = 'com.test.app.dev';
  const extra = {
    eas: { projectId } as EASConfig,
  };
  return {
    name: 'Test App Dev',
    slug: 'test-app-app',
    scheme: 'test-app-dev',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: `https://u.expo.dev/${projectId}`,
    },
    ios: {
      bundleIdentifier: appId,
      supportsTablet: false,
      buildNumber: '1',
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: appId,
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    plugins: [
      'expo-router',
      'expo-localization',
      [
        '@sentry/react-native/expo',
        // TODO Update organization and project name
        { organization: '', project: '' },
      ],
    ],
    experiments: {
      reactCanary: true,
    },
    extra,
  };
};
export default createConfig;
