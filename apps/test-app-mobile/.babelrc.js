module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'app',
          autoProcessImports: '@mono-repo-ronas-bootstrap/test-app-mobile',
        },
      ],
      ['react-native-worklets/plugin'],
    ],
  };
};
