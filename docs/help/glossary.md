---
title: "Glossary"
description: "Plain meaning of terms used across GrabWP Tenancy, Pro and WaaS, organized alphabetically from A to Z."
sidebar_label: "Glossary"
tags: [glossary, reference, plan-base, plan-pro, plan-waas, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** this glossary explains the technical terms, settings, and file names used across GrabWP plugins in plain words, organized alphabetically from A to Z.
**Needs:** Free

## A

### Activity log

**Plain meaning:** a record of platform actions and system events.  
**Where you see it:** **Waas > Settings > Activity Log**. The setting **Retention (days)** ranges from 7 to 365 and defaults to 90.  
**Why it matters:** old entries are automatically pruned by a daily cron job, so it is an operational log rather than a permanent archive.  
**More:** [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning)

### Anchor product

**Plain meaning:** an internal WooCommerce product that WaaS uses for cart checkouts when WooCommerce is selected as the billing provider.  
**Where you see it:** **Waas > Settings > General**, button **Create/Repair WooCommerce Anchor Product**.  
**Why it matters:** if checkouts fail when using WooCommerce billing, clicking the repair tool generates or fixes the product, confirmed by `WooCommerce anchor product is ready.`.  
**More:** [Payments](/sell-sites/payments)

### Asset CDN

**Plain meaning:** serving client site static media and assets from a custom CDN domain.  
**Where you see it:** **Tenancy > Pro Settings > CDN**. Disabled by default.  
**Why it matters:** specifying an incorrect CDN hostname breaks images, styles, and scripts across client sites.  
**More:** [Pro settings](/manage-sites/pro-settings)

### Auth Mode

**Plain meaning:** how customers authenticate into their platform dashboard. Choices are **WAAS Auth (Email signup)** (default) and **WordPress Auth (Login required)**.  
**Where you see it:** **Waas > Settings > General**, field **Auth Mode**.  
**Why it matters:** with WAAS Auth, customers sign up with an email and receive a one-time login code by email, making reliable transactional email mandatory.  
**More:** [Set up WaaS](/sell-sites/set-up-waas)

### Auto backup

**Plain meaning:** automated background backups of client sites on a schedule.  
**Where you see it:** **Tenancy > Pro Settings > Backup**. Disabled by default. Schedule options include manual, daily, weekly, fortnightly, and monthly, retaining between 1 and 30 archives (default 7).  
**Why it matters:** automatic backups run via scheduled WordPress hooks and require an active server cron job.  
**More:** [Backup and restore](/manage-sites/backup-and-restore) | [Scheduled jobs and server cron](/manage-sites/scheduled-jobs)

## B

### Backup

**Plain meaning:** a standalone ZIP archive of an individual site containing its database, custom plugins and themes, config, and uploads. Backup execution follows 7 steps.  
**Where you see it:** the **Backup** tab of a site under **Tenancy > All Tenants**. Needs Pro.  
**Why it matters:** provides a safe restore point before making major site changes or updates.  
**More:** [Backup and restore](/manage-sites/backup-and-restore)

### Backup offload

**Plain meaning:** automatically copying backup ZIP archives to external cloud object storage.  
**Where you see it:** **Tenancy > Pro Settings > Backup**, setting **Offload Driver** with options **Disabled**, **Use Platform S3 Storage**, or **Custom S3 Endpoint**.  
**Why it matters:** controls whether backups are kept off-server and whether local copies are deleted via **Delete Local Copy**.  
**More:** [Backup and restore](/manage-sites/backup-and-restore)

### Benefit

**Plain meaning:** a feature permission or usage limit assigned to a subscription plan, such as `allow_custom_domain`.  
**Where you see it:** **Waas > Settings > Benefits** and on each plan edit screen.  
**Why it matters:** customers cannot access specific capabilities unless their plan includes the matching benefit.  
**More:** [Benefits, services and add-ons](/sell-sites/benefits-and-add-ons)

### Billing provider

**Plain meaning:** the payment gateway service that processes subscription charges. Polar and WooCommerce are built into WaaS; Stripe, SePay, and Xendit are available via add-on plugins.  
**Where you see it:** **Waas > Settings > Billing Providers**.  
**Why it matters:** each gateway requires its own API keys and currency configuration (for example, SePay requires VND).  
**More:** [Payments](/sell-sites/payments)

### Broken symlinks

**Plain meaning:** a filesystem symbolic link for a plugin or theme that points to a target directory that no longer exists on disk.  
**Where you see it:** **Tenancy > Pro Settings > Symlink**, button **Fix All Tenant Broken Symlinks**.  
**Why it matters:** broken symlinks cause plugins or themes to disappear or trigger PHP warnings inside client sites.  
**More:** [Install method (symlink or copy)](#install-method-symlink-or-copy) | [Per-site plugins and themes](/manage-sites/plugins-and-themes)

### Built-in trial

**Plain meaning:** a free trial managed natively by WaaS without requiring payment gateway integration. Defaults to 14 days; configurable from 1 to 365 days per plan.  
**Where you see it:** plan settings under **Waas > Settings > Plans**. Automated reminder emails trigger at 7, 3, and 1 days before trial expiration.  
**Why it matters:** when an unpaid trial expires, the site is suspended with the unavailable landing page.  
**More:** [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)

## C

### Clone

**Plain meaning:** copying an existing site (or the main site) into a new, independent client site. Base clone executes in 6 steps; Pro clone executes in 7 steps.  
**Where you see it:** the **Clone** tab on **Tenancy > All Tenants**.  
**Why it matters:** cloning is the primary mechanism used by WaaS to provision new customer sites from starter templates.  
**More:** [Clone a site](/manage-sites/clone-a-site)

### CNAME Target

**Plain meaning:** the target DNS hostname that customers point their custom domain toward when Domain Mode is set to **Cloudflare SaaS (CNAME)**.  
**Where you see it:** **Waas > Settings > General**, in the **Custom Domains** section.  
**Why it matters:** this value is shown in customer DNS setup instructions so their domain routes to your Cloudflare fallback origin.  
**More:** [Domain Mode](#domain-mode) | [Client custom domains](/sell-sites/client-domains)

### Currencies (primary and secondary)

**Plain meaning:** the currency units used for platform pricing. Primary defaults to `USD`; secondary is optional (default empty).  
**Where you see it:** **Waas > Settings > Billing Providers**.  
**Why it matters:** specific gateways require specific currencies; for example, SePay requires VND as primary or secondary currency.  
**More:** [Payment provider errors](/help/payment-provider-errors) | [Payments](/sell-sites/payments)

### Custom domain

**Plain meaning:** a customer's own domain name (such as `clientstore.com`) connected to their site.  
**Where you see it:** the customer dashboard and **Waas > Domains**.  
**Why it matters:** requires the plan benefit `allow_custom_domain`. A site can have at most 2 custom domains and cannot use custom domains while running in path mode.  
**More:** [A custom domain does not work](/help/custom-domain-not-working) | [Client custom domains](/sell-sites/client-domains)

## D

### Data directory

**Plain meaning:** the directory on the server where GrabWP stores site files, uploads, and configuration files. Default is `wp-content/grabwp-tenancy`.  
**Where you see it:** **Tenancy > Status**. Site uploads reside in `{base}/{tenant_id}/uploads`.  
**Why it matters:** must exist and be writable by the web server user for sites to function properly.  
**More:** [Where site data lives](/manage-sites/where-site-data-lives) | [Install GrabWP](/manage-sites/install)

### DCV Delegation

**Plain meaning:** a Cloudflare DNS delegation record that enables automatic SSL certificate validation and renewals for custom hostnames.  
**Where you see it:** **Waas > Settings > General**, inside **Custom Domains** when using Cloudflare SaaS.  
**Why it matters:** required for seamless SSL issuance when customers connect third-party domains.  
**More:** [Domain Mode](#domain-mode) | [Client custom domains](/sell-sites/client-domains)

### Discount rule

**Plain meaning:** a promotional discount managed by the GrabWP Tenancy Discounts add-on. Durations include **First payment only**, **Fixed number of payments (including first)**, and **Every payment until plan change or cancellation**.  
**Where you see it:** **Waas > Discounts**. Displayed on frontend pages using the `[grabwp_waas_promo]` shortcode.  
**Why it matters:** allows running coupon promotions during checkout. When discounts are toggled off, existing codes are preserved but ignored.  
**More:** [Before you buy](/before-you-buy)

### Domain Mode

**Plain meaning:** the method used to connect customer custom domains. Choices are **Cloudflare SaaS (CNAME)** (default) and **Direct IP (A record)**.  
**Where you see it:** **Waas > Settings > General**, under **Custom Domains**.  
**Why it matters:** determines which DNS instructions are displayed to customers in their dashboard.  
**More:** [Client custom domains](/sell-sites/client-domains)

### Domain routing

**Plain meaning:** routing visitors to the correct site based on the requested HTTP host name.  
**Where you see it:** **Tenancy > Settings > Routing**, setting **Routing Mode**.  
**Why it matters:** enables subdomains (`site1.example.com`) and custom domains (`client.com`). Requires DNS and web server virtual host configuration.  
**More:** [Site addresses, domains and DNS](/manage-sites/domains-and-dns)

### Domain symlink

**Plain meaning:** a Pro feature titled **Domain Symlink (Clean URLs)** that shortens asset URLs by removing the internal data path (`/wp-content/uploads/grabwp-tenancy/{tenant-id}/` becomes `/wp-content/`).  
**Where you see it:** **Tenancy > Pro Settings > Symlink**.  
**Why it matters:** produces cleaner asset URLs but requires the PHP `symlink()` function and specific web server rewrite rules.  
**More:** [Web server guide](/help/web-server-guide) | [Pro settings](/manage-sites/pro-settings)

### Domain verification

**Plain meaning:** an automated HTTP probe that checks whether a custom domain correctly routes to the customer's site.  
**Where you see it:** the customer dashboard and **Waas > Domains**.  
**Why it matters:** custom domains must pass verification before they can be designated as the primary site address.  
**More:** [A custom domain does not work](/help/custom-domain-not-working)

## E

### Extensions

**Plain meaning:** plugins and themes assigned to a specific site.  
**Where you see it:** the **Extensions** tab of a site, opened via the **Plugins & Themes** row action under **Tenancy > All Tenants**. Needs Pro.  
**Why it matters:** allows managing plugins and themes individually per client site without granting site owners full file access.  
**More:** [Per-site plugins and themes](/manage-sites/plugins-and-themes)

## F

### Fix URLs

**Plain meaning:** a Pro search-and-replace tool that updates old domains and paths inside a site's database tables to its current address.  
**Where you see it:** the **Fix URLs** tab on a site under **Tenancy > All Tenants**.  
**Why it matters:** repairs broken image paths, internal links, and serialized options after cloning or domain changes.  
**More:** [Fix URLs](/manage-sites/fix-urls)

## G

### GrabWP Restore

**Plain meaning:** a standalone companion plugin that restores a full site backup archive onto a WordPress install.  
**Where you see it:** **Tools > GrabWP Restore**. Deliberately hidden on WordPress Multisite.  
**Why it matters:** replaces the entire WordPress database, uploads, plugins, and themes from a backup archive.  
**More:** [Backup and restore](/manage-sites/backup-and-restore) | [Before you buy](/before-you-buy)

### Grace period

**Plain meaning:** the number of days a client site remains accessible after a subscription is cancelled before being suspended. Defaults to 7 days; 0 suspends immediately.  
**Where you see it:** **Waas > Settings > General**, field **Grace Period (days)**.  
**Why it matters:** grants customers time to reconsider cancellation or export data before access is cut off.  
**More:** [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)

## H

### .htaccess block

**Plain meaning:** a block of rewrite rules inserted into the root `.htaccess` file on Apache and LiteSpeed web servers so path-based URLs route to client sites. Named `# BEGIN GrabWP Tenancy`.  
**Where you see it:** root `.htaccess` and **Tenancy > Status**.  
**Why it matters:** must appear before `# BEGIN WordPress` for path routing to function. Nginx does not use `.htaccess` and requires manual server block rules.  
**More:** [Web server guide](/help/web-server-guide) | [Install GrabWP](/manage-sites/install)

## I

### Install method (symlink or copy)

**Plain meaning:** how a client site receives plugin or theme files from the main site. Symlinks link directly to existing files; copies duplicate files into the site's directory. Default is symlink.  
**Where you see it:** **Tenancy > Pro Settings > Isolation**.  
**Why it matters:** symlinks conserve server storage space and automatically receive updates made to the main site; copies provide complete filesystem isolation.  
**More:** [Per-site plugins and themes](/manage-sites/plugins-and-themes)

### Isolated MySQL

**Plain meaning:** a database isolation mode where a site connects to its own dedicated MySQL database. Needs Pro.  
**Where you see it:** **Tenancy > Pro Settings > Database**, option **Isolated MySQL Database**.  
**Why it matters:** provides complete database separation. The operator supplies dedicated database connection credentials per site.  
**More:** [Database options](/manage-sites/database-options)

### Isolated SQLite

**Plain meaning:** a database isolation mode where a site runs on a dedicated SQLite database file. Needs Pro and the PHP `pdo_sqlite` extension.  
**Where you see it:** **Tenancy > Pro Settings > Database**, option **Isolated SQLite Database**.  
**Why it matters:** provides lightweight, fast per-site database isolation without requiring a MySQL server or separate database users.  
**More:** [Database options](/manage-sites/database-options)

### Isolation level

**Plain meaning:** the degree of separation applied to newly created sites. Four levels: **Shared**, **Simple**, **Advanced**, and **Custom**.  
**Where you see it:** **Tenancy > Pro Settings > Isolation**, setting **Level of isolation for new sites**.  
**Why it matters:** determines whether sites share or isolate uploads, plugins, and themes. Applies to newly created sites only.  
**More:** [Per-site plugins and themes](/manage-sites/plugins-and-themes)

## M

### Main site

**Plain meaning:** the primary WordPress installation where GrabWP plugins are installed and managed by the platform operator.  
**Where you see it:** your primary administrative dashboard domain.  
**Why it matters:** the server configuration, PHP version, and platform settings on the main site serve as the foundation for all client sites.  
**More:** [Before you buy](/before-you-buy)

### MU-plugin

**Plain meaning:** a must-use plugin automatically loaded by WordPress on every request. GrabWP uses `wp-content/mu-plugins/mu-grabwp-tenancy.php`.  
**Where you see it:** **Tenancy > Status**, row **MU-Plugins Dir Writable**.  
**Why it matters:** handles early site detection and routing; missing MU-plugins trigger warning notices in wp-admin.  
**More:** [Notices about the MU-plugin or data directory](/help/mu-plugin-or-data-directory-notice)

## P

### Path alias

**Plain meaning:** a human-readable slug (such as `my-shop`) used in path URLs instead of the 6-character site ID. Uses lowercase letters, digits, and single hyphens.  
**Where you see it:** **Tenancy > Settings > Routing** (setting provided by Pro).  
**Why it matters:** makes URLs like `example.com/site/my-shop` cleaner than `example.com/site/abc123`.  
**More:** [Site addresses, domains and DNS](/manage-sites/domains-and-dns)

### Path routing

**Plain meaning:** routing visitors to client sites using a subfolder URL structure (`example.com/{prefix}/{tenant}/`). Default prefix is `site`.  
**Where you see it:** **Tenancy > Settings > Routing**, setting **Routing Mode**.  
**Why it matters:** enables multi-site testing and client previews without requiring wildcard DNS or domain configuration.  
**More:** [Path URLs (/site/...) show 404 or a wrong page](/help/path-urls-return-404) | [Web server guide](/help/web-server-guide)

### Per-tenant overrides

**Plain meaning:** per-site configuration toggles that override global capability and security settings. Options are **Use global setting**, **Yes**, or **No**.  
**Where you see it:** the **Overrides** tab on an individual site row. Needs Pro.  
**Why it matters:** lets operators selectively relax or enforce restrictions (such as plugin installations) for specific trusted sites.  
**More:** [Site settings and overrides](/manage-sites/site-settings)

### Plan

**Plain meaning:** a subscription product offered to customers containing a recurring price, billing interval, and set of benefits.  
**Where you see it:** **Waas > Settings > Plans**.  
**Why it matters:** dictates which templates, storage limits, and feature benefits a customer receives upon signup.  
**More:** [Plans](/sell-sites/plans)

### Platform domain

**Plain meaning:** the primary domain under which WaaS customer subdomains are created (for example, `example.com`).  
**Where you see it:** **Waas > Settings > General**, field **Platform Domain**.  
**Why it matters:** if left empty, the platform operates in path mode and customer custom domains are disabled.  
**More:** [Set up WaaS](/sell-sites/set-up-waas)

### Preset constants

**Plain meaning:** WordPress configuration constants (such as `DISALLOW_FILE_MODS` or `DISABLE_WP_CRON`) defined in `wp-config.php` before GrabWP loads.  
**Where you see it:** **Tenancy > Settings**.  
**Why it matters:** preset constants take precedence over settings configured in wp-admin, locking those options.  
**More:** [Free settings](/manage-sites/free-settings)

### Provisioning

**Plain meaning:** the automated background sequence that clones a starter template, configures site options, sets up subscriptions, and delivers a client site after payment.  
**Where you see it:** **Waas > Settings > Provisioning**.  
**Why it matters:** executes asynchronously via background jobs; stuck intents can be retried or dismissed by the operator.  
**More:** [How WaaS works](/sell-sites/how-waas-works) | [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning)

### Provisioning intent

**Plain meaning:** a database record tracking the lifecycle of an individual signup from `checkout_pending` through `completed` or `failed_terminal`.  
**Where you see it:** **Waas > Settings > Provisioning**.  
**Why it matters:** temporarily reserves the customer's chosen site name for 2 hours (`RESERVATION_TTL`) while awaiting checkout completion.  
**More:** [Statuses](/sell-sites/statuses) | [Signup problems](/help/signup-problems)

## R

### REST API key

**Plain meaning:** an authentication secret used to interact with the WaaS REST API via the `X-GrabWP-WaaS-API-Key` request header.  
**Where you see it:** **Waas > Settings > General**, under **API Keys**.  
**Why it matters:** shown only once upon generation; required for integrating external checkouts, portals, or automation tools.  
**More:** [Set up WaaS](/sell-sites/set-up-waas)

### Restore

**Plain meaning:** restoring a site's database, uploads, and configuration from a previously created backup archive. Pro restore executes in 8 steps.  
**Where you see it:** the **Restore** tab of a site under **Tenancy > All Tenants**. Needs Pro.  
**Why it matters:** completely replaces the site's active database tables and files with archive contents.  
**More:** [Backup and restore](/manage-sites/backup-and-restore)

### Routing mode

**Plain meaning:** the system rule controlling how visitors reach client sites: `path`, `domain`, or `both` (default).  
**Where you see it:** **Tenancy > Settings > Routing**, setting **Routing Mode**.  
**Why it matters:** controls whether the platform accepts path URLs, subdomains/domains, or both simultaneously.  
**More:** [Site addresses, domains and DNS](/manage-sites/domains-and-dns)

## S

### Service

**Plain meaning:** an optional recurring or one-time add-on product that customers can purchase on top of their base plan.  
**Where you see it:** **Waas > Settings > Services**.  
**Why it matters:** services maintain their own contract lifecycles (`active`, `past_due`, `cancelled`) alongside base subscriptions.  
**More:** [Benefits, services and add-ons](/sell-sites/benefits-and-add-ons)

### settings.php

**Plain meaning:** the configuration file where GrabWP Tenancy Base saves global settings, located at `{base}/settings.php`.  
**Where you see it:** managed automatically via **Tenancy > Settings**.  
**Why it matters:** must be writable by the web server user for global settings changes to persist.  
**More:** [Free settings](/manage-sites/free-settings)

### Shared database

**Plain meaning:** a database configuration where all client sites share the main WordPress MySQL database, distinguished by table prefixes.  
**Where you see it:** **Tenancy > Pro Settings > Database**, option **Shared Database (with table prefixes)**. Base always works this way.  
**Why it matters:** simple to configure and requires no extra database user creation, though all sites share common MySQL resources.  
**More:** [Database options](/manage-sites/database-options)

### Storage driver

**Plain meaning:** the filesystem storage engine used for client uploads: `local` disk storage or `s3` object storage. Default is `local`.  
**Where you see it:** **Tenancy > Pro Settings > Storage**.  
**Why it matters:** before switching drivers, use **Migrate uploads now** to copy files, avoiding broken media links.  
**More:** [Pro settings](/manage-sites/pro-settings) | [S3 storage](/manage-sites/s3-storage)

### Suspended site page

**Plain meaning:** the landing page displayed to visitors (HTTP 503) when a client site is suspended due to non-payment or administrator action.  
**Where you see it:** **Waas > Settings > Email**, template **Suspended site page**.  
**Why it matters:** replaces site content while keeping the main customer dashboard accessible for account renewals.  
**More:** [A customer site says "temporarily unavailable"](/help/site-shows-temporarily-unavailable)

### Suspension flag

**Plain meaning:** a small flag file written to `wp-content/grabwp-tenancy/suspended/{tenant_id}.php` that signals GrabWP to block access to a suspended site.  
**Where you see it:** on disk in the GrabWP data directory. Suspension reasons include `admin`, `cancelled`, `trial_ended`, and `unpaid`.  
**Why it matters:** removed automatically when a subscription is renewed, reactivated, or converted to paid.  
**More:** [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)

## T

### Table prefix

**Plain meaning:** the unique prefix prepended to all database tables for a client site. In Base, it matches the site ID followed by an underscore (for example, abc123_posts).  
**Where you see it:** in MySQL database managers like phpMyAdmin.  
**Why it matters:** keeps tables for different sites strictly separated inside a shared database.  
**More:** [Tenant ID](#tenant-id) | [Database options](/manage-sites/database-options)

### Template

**Plain meaning:** a pre-configured starter site used as the clone blueprint when provisioning new customer sites.  
**Where you see it:** **Waas > Templates**.  
**Why it matters:** can be assigned to specific plans, giving customers different design or feature baselines.  
**More:** [Templates](/sell-sites/templates)

### Tenant

**Plain meaning:** an independent client site served by the single WordPress installation. In technical settings and code, sites are referenced as tenants.  
**Where you see it:** **Tenancy > All Tenants**.  
**Why it matters:** each tenant has its own isolated content, uploads, and options, with optional dedicated database and extensions in Pro.  
**More:** [Create and manage sites](/manage-sites/create-and-manage-sites)

### Tenant ID

**Plain meaning:** the unique 6-character identifier (lowercase letters and digits) assigned to every site, such as `abc123`.  
**Where you see it:** **Tenancy > All Tenants** and in path routing URLs.  
**Why it matters:** reserved names (`admin1`, `test01`, `public`, `system`, `config`, `backup`) are blocked from use.  
**More:** [Create and manage sites](/manage-sites/create-and-manage-sites)

### tenants.php

**Plain meaning:** the critical mapping file located at `{base}/tenants.php` that associates domain hostnames and path prefixes with site IDs.  
**Where you see it:** in the GrabWP data directory; managed automatically by GrabWP.  
**Why it matters:** loaded during early boot; if unreadable, GrabWP displays `Could not read tenants.php, so nothing was changed. Check the file and its permissions.`.  
**More:** [Where site data lives](/manage-sites/where-site-data-lives) | [Site addresses, domains and DNS](/manage-sites/domains-and-dns)

## W

### WaaS

**Plain meaning:** Website as a Service: the GrabWP Tenancy WaaS plugin that provides billing, customer self-signup, provisioning, and dashboard management.  
**Where you see it:** the **Waas** menu in wp-admin.  
**Why it matters:** turns a WordPress installation into a multi-tenant website hosting business; requires Base and Pro.  
**More:** [How WaaS works](/sell-sites/how-waas-works)

### wp-config.php block

**Plain meaning:** the early loader code snippet inserted between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` inside `wp-config.php`.  
**Where you see it:** `wp-config.php`; reported by the red notice `load.php is not included in wp-config.php.`.  
**Why it matters:** must execute before `wp-settings.php` so GrabWP can identify the site and switch database prefixes before WordPress initializes.  
**More:** [Notice: load.php is not included in wp-config.php](/help/red-notice-load-php) | [Install GrabWP](/manage-sites/install)

### WP-Cron

**Plain meaning:** the built-in WordPress scheduler for time-based background tasks.  
**Where you see it:** **Tenancy > Settings > Performance & Security**, setting **Disable WP-Cron** (enabled by default with help text "Run a server cron job instead.").  
**Why it matters:** disabled by default on client requests to maintain fast response times, requiring an external server cron job to execute scheduled events.  
**More:** [Scheduled jobs and server cron](/manage-sites/scheduled-jobs) | [Emails or renewals not running](/help/emails-or-renewals-not-running)
