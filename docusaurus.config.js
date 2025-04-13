// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome to Information Security World',
  tagline: 'Your Practical Guide to Cybersecurity',
  favicon: 'img/shield.png',

  // Set the production url of your site here
  url: 'https://farzaliyevemil.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/infoseclessons',

  // GitHub pages deployment config.
  organizationName: 'farzaliyevemil', // Your GitHub org/user name.
  projectName: 'infoseclessons', // Your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/farzaliyevemil/infoseclessons/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'InfoSec Lessons Blog',
            description: 'Cybersecurity articles, writeups, and insights',
          },
          editUrl: 'https://github.com/farzaliyevemil/infoseclessons/edit/main/blog/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'InfoSec Lessons',
        logo: {
          alt: 'InfoSec Logo',
          src: 'img/shield.png',
        },
        items: [
          { to: '/docs/intro', label: 'Lessons', position: 'left' },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/farzaliyevemil/infoseclessons',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/farzaliyevemil/infoseclessons/discussions',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/infoseclessons',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/farzaliyevemil/infoseclessons',
              },
            ],
          },
        ],
        copyright: '© 2025 InfoSec Lessons. All rights reserved.',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
