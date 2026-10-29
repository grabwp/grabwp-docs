// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  beforeYouBuy: ['before-you-buy'],

  manageSites: [
    {
      type: 'category',
      label: 'Getting started',
      collapsible: true,
      collapsed: false,
      items: ['manage-sites/install', 'manage-sites/first-site', 'manage-sites/wp-admin-map'],
    },
    {
      type: 'category',
      label: 'How to',
      collapsible: true,
      collapsed: true,
      items: [
        'manage-sites/create-and-manage-sites',
        'manage-sites/domains-and-dns',
        'manage-sites/direct-login',
        'manage-sites/clone-a-site',
        'manage-sites/backup-and-restore',
        'manage-sites/plugins-and-themes',
        'manage-sites/database-options',
        'manage-sites/site-settings',
        'manage-sites/fix-urls',
        'manage-sites/s3-storage',
        'manage-sites/scheduled-jobs',
        'manage-sites/wp-cli',
        'manage-sites/licence',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: true,
      collapsed: true,
      items: [
        'manage-sites/free-settings',
        'manage-sites/pro-settings',
        'manage-sites/where-site-data-lives',
      ],
    },
  ],

  sellSites: [
    {
      type: 'category',
      label: 'Getting started',
      collapsible: true,
      collapsed: false,
      items: ['sell-sites/how-waas-works', 'sell-sites/set-up-waas', 'sell-sites/go-live-checklist'],
    },
    {
      type: 'category',
      label: 'How to',
      collapsible: true,
      collapsed: true,
      items: [
        'sell-sites/plans',
        'sell-sites/benefits-and-add-ons',
        'sell-sites/templates',
        'sell-sites/frontend-pages',
        'sell-sites/signup-flow',
        'sell-sites/appearance',
        'sell-sites/payments',
        'sell-sites/trials-and-subscriptions',
        'sell-sites/client-domains',
        'sell-sites/emails',
        'sell-sites/dashboard-and-provisioning',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: true,
      collapsed: true,
      items: [
        'sell-sites/waas-settings',
        'sell-sites/shortcodes-blocks-emails',
        'sell-sites/statuses',
      ],
    },
  ],

  help: [
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsible: true,
      collapsed: false,
      items: [
        'help/getting-help',
        {
          type: 'category',
          label: 'Setup and server',
          collapsible: true,
          collapsed: true,
          items: [
            'help/red-notice-load-php',
            'help/mu-plugin-or-data-directory-notice',
            'help/path-urls-return-404',
          ],
        },
        {
          type: 'category',
          label: 'Sites (Pro)',
          collapsible: true,
          collapsed: true,
          items: [
            'help/site-login-fails',
            'help/custom-domain-not-working',
            'help/client-cannot-install-plugins',
            'help/backup-restore-and-save-problems',
            'help/pro-license-messages',
          ],
        },
        {
          type: 'category',
          label: 'Selling (WaaS)',
          collapsible: true,
          collapsed: true,
          items: [
            'help/signup-problems',
            'help/site-shows-temporarily-unavailable',
            'help/emails-or-renewals-not-running',
            'help/payment-provider-errors',
          ],
        },
        'help/for-your-clients',
      ],
    },
    {
      type: 'category',
      label: 'Hosting',
      collapsible: true,
      collapsed: true,
      items: ['help/hosting-requirements', 'help/web-server-guide', 'help/hosting-with-xcloud'],
    },
    {
      type: 'category',
      label: 'Lookup',
      collapsible: true,
      collapsed: true,
      items: ['help/glossary', 'help/notices-and-errors', 'help/release-notes'],
    },
  ],
};

export default sidebars;
