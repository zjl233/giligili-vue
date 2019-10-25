const path = require('path');

// let webstrom recognize the vue @ alias
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
