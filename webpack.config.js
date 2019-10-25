const path = require('path');

// let webstrom recognize the vue @ alias
module.exports = {
  resolve: {
    alias: {
      // eslint-disable-next-line global-require
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
