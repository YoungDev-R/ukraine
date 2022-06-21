/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: '',
  },
  basePath: '/wip/sounds-of-ukraine'
}

// const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');



module.exports = nextConfig




// module.exports = withPlugins([
//   [optimizedImages, {
//     /* config for next-optimized-images */
//   }],

//   // your other plugins here

// ]);



// const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');

// module.exports = withPlugins([
//   [optimizedImages, {
//     /* config for next-optimized-images */
//   }],

//   // your other plugins here

// ]);


// module.exports = {
//   // https://github.com/vercel/next.js/issues/21079
//   // Remove this workaround whenever the issue is fixed
//   images: {
//     loader: 'imgix',
//     path: '',
//   },
//   nextConfig
// }