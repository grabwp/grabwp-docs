---
title: "Glossary: server and setup"
description: "Plain meaning of the terms about files GrabWP adds to your server, cron and suspension."
sidebar_label: "Server and setup"
sidebar_position: 3
tags: [glossary, server, for-operator, for-cs]
last_verified_version: "Base 1.1.14, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** this page explains the files and server settings GrabWP changes or depends on, and the words used when a site is suspended.

## .htaccess block

**Plain meaning:** a block of rewrite rules that GrabWP adds to the root `.htaccess` file so path URLs work. It is named `GrabWP Tenancy`. It is for Apache.
**Where you see it:** **Tenancy > Status**, or the notice `Root .htaccess needs to be updated for tenant routing.`
**Why it matters:** if the block is missing, or sits after `# BEGIN WordPress`, path URLs can fail. Nginx does not use `.htaccess`.
**More:** [What GrabWP changes on your server](/kb/concepts/what-grabwp-changes-on-your-server) | [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)

## MU-plugin

**Plain meaning:** a must-use plugin, a small file that WordPress always loads. GrabWP's file is `mu-grabwp-tenancy.php` in the mu-plugins folder.
**Where you see it:** **Tenancy > Status**, row **MU-Plugins Dir Writable**.
**Why it matters:** without it you see `MU-plugin is not installed. Tenant features may not work.` If the folder is not writable, install needs a manual step.
**More:** [MU-plugin or data directory notices](/kb/troubleshooting/mu-plugin-or-data-directory-notice)

## Preset constants

**Plain meaning:** a setting such as `DISALLOW_FILE_MODS` that is already defined in `wp-config.php` before GrabWP loads.
**Where you see it:** **Tenancy > Settings**.
**Why it matters:** a preset constant overrules the matching setting on the screen, so changing the screen has no effect.
**More:** [Base settings](/kb/reference/base-settings)

## Suspended site page

**Plain meaning:** the page visitors see when a tenant site is blocked. The default text is `{tenant_domain} is temporarily unavailable` with HTTP code 503.
**Where you see it:** **Waas > Settings > Email**, template **Suspended site page**.
**Why it matters:** it needs Base 1.1.12 or newer and WaaS 1.1.21 or newer. With an older Base the site is not blocked.
**More:** [A customer site says "temporarily unavailable"](/kb/troubleshooting/site-shows-temporarily-unavailable)

## Suspension flag

**Plain meaning:** a small file at `{base}/suspended/{tenant_id}.php`, written by WaaS, that tells Base to block that tenant. It holds the reason, the HTTP code and the page.
**Where you see it:** in the data directory. Reasons are `admin`, `cancelled`, `trial_ended` and `unpaid`.
**Why it matters:** removing the block means restoring the subscription, which removes the flag.
**More:** [Subscription lifecycle](/kb/concepts/subscription-lifecycle)

## wp-config.php block

**Plain meaning:** a short block that GrabWP writes into `wp-config.php`, between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy`. It loads GrabWP early, before WordPress starts the site. It is also called the early loader.
**Where you see it:** the red notice `load.php is not included in wp-config.php.`
**Why it matters:** without it tenants are not recognised. If GrabWP cannot find the "stop editing" line it shows `Could not find the stop-editing marker in wp-config.php. Please add the line manually.`
**More:** [Notice: load.php](/kb/troubleshooting/red-notice-load-php) | [What GrabWP changes on your server](/kb/concepts/what-grabwp-changes-on-your-server)

## WP-Cron

**Plain meaning:** WordPress's built-in scheduler for timed jobs.
**Where you see it:** **Tenancy > Settings > Performance & Security**, setting **Disable WP-Cron**, on by default. The help text says "Run a server cron job instead."
**Why it matters:** scheduled jobs such as renewal checks and invoices only run if a server cron job calls `wp-cron.php`.
**More:** [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron) | [Emails or renewals not running](/kb/troubleshooting/emails-or-renewals-not-running)
