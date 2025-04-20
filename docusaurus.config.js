// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome to Information Security World',
  tagline: 'Your Practical Guide to Cybersecurity',
  favicon: 'img/shield.png',

  url: 'https://farzaliyevemil.github.io',
  baseUrl: '/infoseclessons/',

  organizationName: 'farzaliyevemil',
  projectName: 'infoseclessons',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'az'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        navbar: {
          items: [
            { to: '/intro', label: 'Start', position: 'left' },
            { to: '/about', label: 'About', position: 'left' },
            {
              type: 'localeDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/farzaliyevemil/infoseclessons',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
      },
      az: {
        label: 'Azərbaycan dili',
        direction: 'ltr',
        navbar: {
          items: [
            { to: '/az/intro', label: 'Başla', position: 'left' },
            { to: '/az/about', label: 'Haqqında', position: 'left' },
            {
              type: 'localeDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/farzaliyevemil/infoseclessons',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/farzaliyevemil/infoseclessons/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Emil Farzaliyev.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
