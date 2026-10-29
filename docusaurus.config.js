// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GrabWP Tenancy Docs',
  tagline: 'Multi-Tenant WordPress Made Simple',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.grabwp.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'grabwp',
  projectName: 'grabwp-docs',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'kb',
        path: 'kb',
        routeBasePath: 'kb',
        sidebarPath: './sidebars-kb.js',
        editUrl: 'https://github.com/taicv/grabwp-docs/tree/main/',
        tags: 'tags.yml',
        onInlineTags: 'throw',
        exclude: ['**/_facts/**'],
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'vi'],
        docsRouteBasePath: ['/', 'kb'],
        docsPluginIdForPreferredVersion: undefined,
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        searchContextByPaths: ['kb'],
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/taicv/grabwp-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'GrabWP Tenancy Docs',
        logo: {
          alt: 'GrabWP Tenancy Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'kb',
            sidebarId: 'kbSidebar',
            position: 'left',
            label: 'Knowledge Base',
          },
          {
            href: 'https://grabwp.com',
            label: 'grabwp.com',
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
                label: 'Overview',
                to: '/',
              },
              {
                label: 'GrabWP Tenancy Pro',
                to: '/category/grabwp-tenancy-pro',
              },
              {
                label: 'GrabWP Tenancy WaaS',
                to: '/category/grabwp-tenancy-waas',
              },
            ],
          },
          {
            title: 'Product',
            items: [
              {
                label: 'grabwp.com',
                href: 'https://grabwp.com',
              },
              {
                label: 'Pricing',
                href: 'https://grabwp.com/pro/',
              },
              {
                label: 'Free Plugin (WordPress.org)',
                href: 'https://wordpress.org/plugins/grabwp-tenancy/',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'WordPress.org Support',
                href: 'https://wordpress.org/support/plugin/grabwp-tenancy/',
              },
              {
                label: 'Email Us',
                href: 'mailto:hello@grabwp.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GrabWP. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
