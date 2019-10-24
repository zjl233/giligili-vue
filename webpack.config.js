// let webstrom recognize the vue @ alias
module.exports = {
  resolve: {
    alias: {
      // eslint-disable-next-line global-require
      '@': require('path')
        .resolve(__dirname, 'src'),
    },
  },
};
