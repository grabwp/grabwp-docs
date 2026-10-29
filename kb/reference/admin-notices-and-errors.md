---
title: "Notices and error messages"
description: "Lookup table of exact admin notices, status warnings and error messages across GrabWP plugins, with their cause and troubleshooting guide."
sidebar_label: "Notices and error messages"
sidebar_position: 1
tags: [reference, troubleshooting, plan-base, plan-pro, plan-waas, addon, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Stripe 1.1.7, SePay 1.1.5, Discounts 1.0.0, Restore 1.0.5"
last_verified_date: "2026-10-29"
---

**Short answer:** this page lists the exact notice and error texts shown by GrabWP in wp-admin, on the **Status** screen and during signup or login. Match the text you see to find its cause and the troubleshooting page that fixes it.

## Base (GrabWP Tenancy) notices and errors

| Exact message in UI | Where it appears | Cause in code | Troubleshooting guide |
|---|---|---|---|
| `load.php is not included in wp-config.php.` | Admin notice on every wp-admin page (with link **View Status →**) | `GRABWP_TENANCY_LOADED` is not defined because the `# BEGIN GrabWP Tenancy` block in `wp-config.php` is missing or not reached. | [Notice: "load.php is not included in wp-config.php."](/kb/troubleshooting/red-notice-load-php) |
| `Could not find the stop-editing marker in wp-config.php. Please add the line manually.` | Installer / setup check | GrabWP could not find the stop-editing marker in `wp-config.php` to insert the `load.php` block automatically. | [Notice: "load.php is not included in wp-config.php."](/kb/troubleshooting/red-notice-load-php) |
| `MU-plugin is not installed. Tenant features may not work.` | Admin notice on GrabWP plugin pages (with link **View Status →**) | `mu-grabwp-tenancy.php` is missing from `wp-content/mu-plugins`. | [Notices about the MU-plugin or data directory](/kb/troubleshooting/mu-plugin-or-data-directory-notice) |
| `Auto-install of MU-plugin will not work. Manual installation required.` | **Tenancy > Status > Plugin General** (**MU-Plugins Dir Writable** row) | The `wp-content/mu-plugins` folder is not writable by PHP. | [Notices about the MU-plugin or data directory](/kb/troubleshooting/mu-plugin-or-data-directory-notice) |
| `Data directory is missing.` | Admin notice on wp-admin pages (with link **View Status →**) | The base tenant data folder (default `wp-content/grabwp-tenancy`) does not exist. | [Notices about the MU-plugin or data directory](/kb/troubleshooting/mu-plugin-or-data-directory-notice) |
| `Plugin needs write access to create tenant directories and manage configuration files.` | **Tenancy > Status > Plugin General** (**Data Dir Writable** row) | The base tenant data folder is not writable by PHP. | [Notices about the MU-plugin or data directory](/kb/troubleshooting/mu-plugin-or-data-directory-notice) |
| `Could not read tenants.php, so nothing was changed. Check the file and its permissions.` | Tenant create, edit or delete action | `tenants.php` could not be read before saving changes. | [Notices about the MU-plugin or data directory](/kb/troubleshooting/mu-plugin-or-data-directory-notice) |
| `Root .htaccess needs to be updated for tenant routing.` | Admin notice on GrabWP plugin pages (Apache and LiteSpeed only) | The `# BEGIN GrabWP Tenancy` rewrite block in root `.htaccess` is missing, lacks the current path prefix rule, or sits after `# BEGIN WordPress`. | [Path URLs (/site/...) show 404 or a wrong page](/kb/troubleshooting/path-urls-return-404) |
| `ℹ .htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` | **Tenancy > Status > Plugin General** (**Web Server** row) | The web server is Nginx, which does not read `.htaccess` files. | [Path URLs (/site/...) show 404 or a wrong page](/kb/troubleshooting/path-urls-return-404) |
| `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.` | **Tenancy > Status > Plugin General** (**mod_rewrite** row) | Apache `mod_rewrite` is reported as not loaded (`✗ Not loaded`). | [Path URLs (/site/...) show 404 or a wrong page](/kb/troubleshooting/path-urls-return-404) |
| `⚠ Yes. GrabWP Tenancy is not designed for Multisite` | **Tenancy > Status > Plugin General** (**WordPress Multisite** row) | WordPress Multisite is active on the main site. | [Hosting requirements](/kb/choose/hosting-requirements) |
| `You're using a legacy path structure. To comply with WordPress standards:` | **Tenancy > Status** (all tabs) | The tenant data folder is at an older location (`wp-content/grabwp` or `wp-content/uploads/grabwp-tenancy`). Followed by steps `1. Deactivate the plugin`, `2. Rename and move the entire ... folder to ...` and `3. Reactivate the plugin`. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Multiple tenants.php files detected` | **Tenancy > Status** path warning | More than one candidate `tenants.php` file exists on disk; only one is loaded at boot. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Multiple global config.php files detected` | **Tenancy > Status** path warning | Pro `config.php` exists at both new (`wp-content/grabwp-tenancy-pro/config.php`) and legacy (`wp-content/uploads/grabwp-tenancy-pro/config.php`) locations. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Data directory inside uploads/` | **Tenancy > Status** path warning | Active base directory is `wp-content/uploads/grabwp-tenancy`. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Pro config directory inside uploads/` | **Tenancy > Status** path warning | Active Pro config directory is `wp-content/uploads/grabwp-tenancy-pro`. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `SQLite directory inside uploads/` | **Tenancy > Status** path warning | Active SQLite directory is `wp-content/uploads/grabwp-tenancy-sqlite`. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Directory paths hardcoded in wp-config.php` | **Tenancy > Status** info notice | `GRABWP_TENANCY_DIRS_FROM_WPCONFIG` is set because directory constants were defined in `wp-config.php` before `load.php`. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Multiple tenant-aliases.php files detected` | **Tenancy > Status** path warning | More than one `tenant-aliases.php` file exists across candidate directories. | [Where tenant data lives](/kb/concepts/where-tenant-data-lives) |
| `Invalid or expired admin access token.` | Tenant auto-login (`wp-login.php?grabwp_token_error=1`) | The `grabwp_token` is older than 1800 seconds (30 minutes) or its HMAC-SHA256 signature does not match. | [Tenant dashboard icon sends me to the login page](/kb/troubleshooting/tenant-dashboard-login-fails) |
| `Tenant identification failed.` | Tenant auto-login (`wp-login.php?grabwp_token_error=1`) | `$this->plugin->get_tenant_id()` returned empty on the login request. | [Tenant dashboard icon sends me to the login page](/kb/troubleshooting/tenant-dashboard-login-fails) |
| `No admin user found for tenant access.` | Tenant auto-login (`wp-login.php?grabwp_token_error=1`) | No administrator user exists in the tenant database (or shared object cache returned the wrong database state). | [Tenant dashboard icon sends me to the login page](/kb/troubleshooting/tenant-dashboard-login-fails) |

## Pro (GrabWP Tenancy Pro) notices and errors

| Exact message in UI | Where it appears | Cause in code | Troubleshooting guide |
|---|---|---|---|
| `Please enter a license key.` | **Tenancy > License** | The license activation form was submitted with an empty key. | [Pro license messages](/kb/troubleshooting/pro-license-messages) |
| `This does not look like a GrabWP Pro license key. It should start with GRABWPPRO-.` | **Tenancy > License** | The entered key does not match the `GRABWPPRO-` prefix and character format. | [Pro license messages](/kb/troubleshooting/pro-license-messages) |
| `Organization ID not configured.` | **Tenancy > License** | Returned during license check when the organization ID constant is empty. | [Pro license messages](/kb/troubleshooting/pro-license-messages) |
| `Invalid response from license server.` | **Tenancy > License** | The reply from the license server could not be parsed as expected JSON data. | [Pro license messages](/kb/troubleshooting/pro-license-messages) |
| `Activation mismatch; refusing to clear license.` | **Tenancy > License** | The activation ID passed to clear the license does not match the stored activation ID. | [Pro license messages](/kb/troubleshooting/pro-license-messages) |
| `Failed to save Pro settings. Please check file permissions.` | **Tenancy > Pro Settings** | GrabWP Pro could not write `config.php` in the Pro config folder. | [Backup, restore or "Failed to save Pro settings"](/kb/troubleshooting/backup-restore-and-save-problems) |
| `The Isolated MySQL password is not available any more.` | Setup wizard / Pro database setup | The stored MySQL password could not be read or decrypted. | [Database options](/kb/concepts/database-options) |
| `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.` | **Tenancy > Pro Settings > Isolation** and tenant create/edit form | Informational warning shown when new sites are configured to get their own themes. | [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins) |
| `symlink() is not available on this server.` | **Tenancy > Pro Settings > Symlink** | The PHP `symlink()` function is disabled on the host. | [Hosting requirements](/kb/choose/hosting-requirements) |

## WaaS (GrabWP Tenancy WaaS) notices and errors

| Exact message in UI | Where it appears | Cause in code | Troubleshooting guide |
|---|---|---|---|
| `Name is required.` | Signup form / validator | Customer name field is empty on signup. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `Valid email is required.` | Signup form / validator | Customer email field is empty or not a valid email address. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `Please choose a template to get started.` | Signup form / validator | No starter template was selected when required. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `Please choose an available template.` | Signup form / validator | The chosen template does not exist or is inactive. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `This template is not available for the selected plan. Please choose a different template or upgrade your plan.` | Signup form / validator | The chosen template is restricted from the selected plan. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `Please choose an available plan.` | Signup form / validator | The selected plan does not exist or is inactive. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `This site name is reserved. Please choose another.` | Signup form / validator | The chosen subdomain slug is in the reserved list (`www`, `mail`, `admin`, `api`, `cdn`, `ftp`, `smtp`, `imap`, `pop`, `ns1`, `ns2`, `dns`, `cpanel`, `webmail`, `app`). | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `This site name is already taken. Please try another.` | Signup form / validator | Another tenant already uses this site name. | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `This site name is temporarily reserved by another checkout. Please try another.` | Signup form / validator | An active provisioning intent holds the chosen site name for up to 2 hours (`RESERVATION_TTL`). | [Signup stops or shows an error](/kb/troubleshooting/signup-problems) |
| `Enter a platform domain such as example.com.` | Setup wizard (WaaS storefront step) | Platform domain input did not pass domain validation. | [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant) |
| `Custom domains are not available while sites use path URLs.` | Customer dashboard Domains tab | Routing mode is set to `path`, which disables custom domains. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Custom domains are not available for your current plan.` | Customer dashboard Domains tab | The tenant's plan does not have the `allow_custom_domain` benefit enabled. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Maximum 2 custom domains allowed.` | Customer dashboard Domains tab | The tenant already has 2 custom domains attached. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Cannot remove your platform subdomain.` | Customer dashboard Domains tab | The customer tried to delete the primary platform subdomain. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Verify this domain before setting it as primary.` | Customer dashboard Domains tab | The customer tried to make an unverified custom domain the primary domain. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Domain is not mapped to a tenant.` | Custom domain verification | The domain is not present in the tenant's mapped domains list. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Domain is reachable but is not serving this site yet.` | Custom domain verification | The HTTP verification probe reached a server, but the response did not match the tenant. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Domain did not respond. Point DNS and add it on the server, then try again.` | Custom domain verification | The HTTP verification request to the custom domain failed or timed out. | [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) |
| `Settings saved.` / `Signup and Dashboard pages checked.` / `WooCommerce anchor product is ready.` | **Waas > Settings > General** | Success notices after saving settings or running repair buttons. | [WaaS settings](/kb/reference/waas-settings) |
| `New API key generated. Copy it now - it will not be shown again:` | **Waas > Settings > General** (**API Keys**) | Warning notice shown once right after generating a REST API key. | [WaaS settings](/kb/reference/waas-settings) |

## Add-ons and companion plugins

| Exact message in UI | Plugin | Cause in code | Troubleshooting guide |
|---|---|---|---|
| `Stripe secret key is not configured.` | GrabWP Tenancy Stripe | Stripe checkout or API call ran without **Secret Key** saved under **Waas > Settings > Billing Providers**. | [Payment provider errors](/kb/troubleshooting/payment-provider-errors) |
| `SePay is active. Add VND as primary or secondary currency in WaaS > Settings > Billing Providers before customers can pay with SePay.` | GrabWP Tenancy SePay | One-time admin notice shown when SePay is active and `VND` is not configured. | [Payment provider errors](/kb/troubleshooting/payment-provider-errors) |
| `Sepay requires VND currency. Please set VND as primary or secondary currency in WaaS settings first.` | GrabWP Tenancy WaaS / SePay | Currency validator error when SePay is enabled without `VND` as primary or secondary currency. | [Payment provider errors](/kb/troubleshooting/payment-provider-errors) |
| `GrabWP Tenancy Discounts needs GrabWP Tenancy WaaS %s or newer. Discounts are off until WaaS is updated.` | GrabWP Tenancy Discounts | The installed WaaS version is older than the minimum required by the Discounts add-on. | [Base, Pro or WaaS](/kb/choose/free-pro-waas) |
| `Discounts are off. Codes are kept, but checkouts, quotes and pages ignore them until you turn discounts on below.` | GrabWP Tenancy Discounts | Shown on **Waas > Discounts** when **Enable discounts** is unchecked. | [Where things are in wp-admin](/kb/reference/menu-map) |
| `Warning: Destructive Operation` (`This will REPLACE your entire WordPress site including the database, uploads, plugins, and themes. Your current admin credentials will be replaced by those from the backup. ...`) | GrabWP Restore | Shown on **Tools > GrabWP Restore** before restoring a backup archive over the current WordPress install. | [Backup, restore or "Failed to save Pro settings"](/kb/troubleshooting/backup-restore-and-save-problems) |

## Changed in recent versions

| Version | Change |
|---|---|
| Base 1.1.14 | Added warning on **Tenancy > Settings** and **Tenancy > Status > Base Plugin** when a constant in `wp-config.php` overrules a setting. |
| Base 1.1.13 | Added routing mode lock notice (`The routing mode is set by GRABWP_TENANCY_ROUTING_MODE in wp-config.php. Remove the constant to change it here.`). |
| Pro 1.1.17 | Added warning `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.` on **Tenancy > Pro Settings > Isolation**. |

## Related

- [What to send when you ask for help](/kb/start-here/getting-help)
- [Base settings](/kb/reference/base-settings)
- [Pro settings](/kb/reference/pro-settings)
- [WaaS settings](/kb/reference/waas-settings)
- [Troubleshooting](/grabwp-tenancy/troubleshooting)
