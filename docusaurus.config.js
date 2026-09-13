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

  // Hard gate: a docs site that hands readers dead links erodes exactly the
  // trust it is trying to build. The tree is currently clean, so failures here
  // are regressions to fix before merge, not legacy debt.
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

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

  // Old routes that changed when lessons moved between folders. Sources:
  // git history of docs/ (renames + delete/recreate moves without explicit
  // slugs). Keep this list aligned with future lesson moves.
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/general-security/microsoft-certifications', to: '/certifications/microsoft-certifications'},
          {from: '/foundations/operating-systems/windows/sysprep', to: '/operating-systems/windows/sysprep'},
          {from: '/foundations/operating-systems/windows/wsl', to: '/operating-systems/windows/wsl'},
          {from: '/general-security/malware-types', to: '/red-teaming/malware-types'},
          {from: '/general-security/password-best-practices', to: '/general-security/iam-account-management'},
          {from: '/general-security/open-source', to: '/general-security/assessment/security-tools'},
          {from: '/general-security/open-source-identity-access-secrets', to: '/general-security/assessment/security-tools'},
          {from: '/general-security/open-source-monitoring-and-detection', to: '/general-security/assessment/security-tools'},
          {from: '/general-security/open-source-network-security-tools', to: '/general-security/assessment/security-tools'},
        ],
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {tagName: 'link', rel: 'icon', href: '/infoseclessons/img/pwa-icon-192.png'},
          {tagName: 'link', rel: 'manifest', href: '/infoseclessons/manifest.json'},
          {tagName: 'meta', name: 'theme-color', content: '#0f766e'},
        ],
      },
    ],
  ],

  themeConfig: {
    // Manifest fields consumed by @docusaurus/plugin-pwa.
    pwa: {
      title: 'InfoSec Lessons',
      shortTitle: 'InfoSec Lessons',
      description: 'Practical cybersecurity lessons, learning paths, and field notes',
      themeColor: '#0f766e',
      backgroundColor: '#0b1220',
      icons: [
        {src: 'img/pwa-icon-192.png', sizes: '192x192', type: 'image/png'},
        {src: 'img/pwa-icon-512.png', sizes: '512x512', type: 'image/png'},
      ],
    },
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
