const presets = [
  [
    '@babel/env',
    {
      targets: {
        browsers: '> 0.25%, not dead',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
  '@babel/preset-react',
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-arrow-functions',
];

module.exports = { presets, plugins };
