// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
const remarkExternalLinks = require('./src/remark/external-links.js');
// NOTE: We avoid importing '@docusaurus/Translate' here because it is not
// resolvable in this environment when running some CLI commands like
// write-translations. We'll localize navbar labels after we configure
// a safe translation path.

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'InfoSec Lessons',
  tagline: 'Practical cybersecurity lessons, learning paths, and field notes',
  favicon: 'img/shield.png',

  url: 'https://farzaliyevemil.github.io',
  baseUrl: '/infoseclessons/',
  trailingSlash: true,

  organizationName: 'farzaliyevemil',
  projectName: 'infoseclessons',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'az'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      az: {
        label: 'Azərbaycan dili',
        direction: 'ltr',
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
          editLocalizedFiles: true,
          remarkPlugins: [remarkExternalLinks],
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
        { to: '/', label: 'Start', position: 'left' },
        { to: '/about', label: 'About', position: 'left' },
        { to: '/search', label: 'Search', position: 'left' },
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
    footer: {
      style: 'dark',
      links: [],
      copyright: 'Copyright © Emil Farzaliyev.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
