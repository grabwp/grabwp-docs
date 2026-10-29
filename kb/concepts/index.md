---
title: "How GrabWP works"
description: "One concept per page: tenants, routing, data location, databases, isolation, server changes, login, scheduled jobs, subscriptions and signup."
sidebar_label: "Overview"
sidebar_position: 0
tags: [for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** each page explains one idea in plain words, tells you where to look in wp-admin and links to the step-by-step guide. Read them when you want to understand why GrabWP behaves the way it does.

## Pages in this section

- [What a tenant is](/kb/concepts/tenant): a separate site on the same install, and the rules for its 6 character ID.
- [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant): path URLs, domains and the routing mode.
- [Where tenant data lives](/kb/concepts/where-tenant-data-lives): the data folder, uploads and older locations.
- [Database options](/kb/concepts/database-options): shared, isolated MySQL and isolated SQLite.
- [Isolation levels](/kb/concepts/isolation-levels): Shared, Simple, Advanced and Custom.
- [What GrabWP changes on your server](/kb/concepts/what-grabwp-changes-on-your-server): the `wp-config.php` block, the MU-plugin, the `.htaccess` block and the folders.
- [Direct login to a tenant](/kb/concepts/direct-login): how the dashboard icon logs in and why it can fail.
- [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron): which jobs exist and why you need a server cron job.
- [Subscription lifecycle](/kb/concepts/subscription-lifecycle): statuses, trial, grace period and suspension.
- [How a signup becomes a site](/kb/concepts/how-signup-builds-a-site): the provisioning steps in plain words.
