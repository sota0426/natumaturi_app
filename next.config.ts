
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isProd ? '/natumaturi_app' : '',
  assetPrefix: isProd ? '/natumaturi_app/' : '',
};
