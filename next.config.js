const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

const pluginAntdLess = withAntdLess({
  modifyVars: {
    "@primary-color": "#f14f04",
  },
  images: {
    domains: [
      "https://nhaphang.monamedia.net/",
      "img.alicdn.com",
      "cbu01.alicdn.com",
      "gd2.alicdn.com",
      "gd1.alicdn.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = withPlugins([[pluginAntdLess]], nextConfig);
