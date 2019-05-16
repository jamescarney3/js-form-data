
module.exports = {
  presets: [
    [
      '@babel/preset-env', { targets: { node: 'current' } },
    ],
    [
      'minify', {
        mangle: { exclude: ['MyCustomError'] },
        keepFnName: true,
      },
    ],
  ],
};
