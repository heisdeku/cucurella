module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@libs': './src/libs',
          '@screens': './src/screens',
          '@stacks': './src/stacks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
