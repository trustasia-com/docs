// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WeKey Docs',
  tagline: '让数字身份认证更简单',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.wekey.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'trustasia-com', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/trustasia-com/docs/tree/master',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/trustasia-com/docs/tree/master/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      metadata: [{name: 'keywords', content: 'IDaaS, 身份认证, OIDC, OAuth2, SSO'}],
      navbar: {
        logo: {
          alt: 'WeKey Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.png',
          href: 'https://wekey.com',
        },
        items: [
          {
            type: "doc",
            docId: "docs/README",
            position: "left",
            label: "文档",
          },
          {
            type: "doc",
            docId: "sdk/README",
            position: "left",
            label: "SDK",
          },
          {
            to: "api",
            position: "left",
            label: "API",
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://github.com/trustasia-com/docs',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        logo: {
          alt: "Logo",
          src: "img/trustasia.svg",
        },
        style: 'dark',
        links: [
          {
            label: "文档",
            to: "/",
          },
          {
            label: "GitHub",
            href: "https://github.com/trustasia-com",
          },
          {
            label: "关于我们",
            href: "https://wekey.com/aboutus",
          },
          {
            label: "联系我们",
            href: "mailto: hello@wekey.com",
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 亚数信息科技（上海）有限公司，用 Docusaurus 构建。`,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
