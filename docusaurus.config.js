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
      },
      az: {
        label: 'Azərbaycan dili',
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
    navbar: {
      title: 'InfoSec Lessons',
      logo: {
        alt: 'EF Logo',
        src: 'img/shield.png',
      },
      items: [
        { to: '/', label: 'Lessons', position: 'left' },
        {
          href: 'https://github.com/farzaliyevemil/infoseclessons',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        }
      ],
    },
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
