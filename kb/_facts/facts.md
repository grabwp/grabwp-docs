# GrabWP facts for the KB (round 2, verified against /tmp/o56-prod)

Prod snapshot: HEAD 07301048 (release commit 2026-10-26). Paths are relative to /tmp/o56-prod.
Legend: [OK] r1 was right. [FIXED] r1 was wrong, corrected here. [DROPPED] r1 claim not found in code. [ADDED] missing in r1. UNVERIFIED = could not confirm in code.
Note: the code strings below are quoted exactly. One status-checker string has an em dash in code; it is shown here with a hyphen.

---

## 1. Plugin map

Versions all [OK] (readme.txt:7 "Stable tag", and the `Version:` header of each main file).

| Plugin | Version | Hard dependency (`Requires Plugins`) | Source |
|---|---|---|---|
| grabwp-tenancy (Base) | 1.1.14 | none | grabwp-tenancy/grabwp-tenancy.php:6 |
| grabwp-tenancy-pro | 1.1.17 | grabwp-tenancy | grabwp-tenancy-pro/grabwp-tenancy-pro.php:6,17 |
| grabwp-tenancy-waas | 1.1.24 | grabwp-tenancy, grabwp-tenancy-pro | grabwp-tenancy-waas/grabwp-tenancy-waas.php:6,16 |
| grabwp-tenancy-stripe | 1.1.7 | grabwp-tenancy-waas | grabwp-tenancy-stripe/grabwp-tenancy-stripe.php:8,9 |
| grabwp-tenancy-sepay | 1.1.5 | grabwp-tenancy-waas | grabwp-tenancy-sepay/grabwp-tenancy-sepay.php:8,9 |
| grabwp-tenancy-xendit | 1.0.5 | grabwp-tenancy-waas | grabwp-tenancy-xendit/grabwp-tenancy-xendit.php:8,9 |
| grabwp-tenancy-discounts | 1.0.0 | grabwp-tenancy-waas | grabwp-tenancy-discounts/grabwp-tenancy-discounts.php:8,10 |
| grabwp-tenancy-partner | 1.4.1 | grabwp-tenancy, grabwp-tenancy-pro, grabwp-tenancy-waas | grabwp-tenancy-partner/grabwp-tenancy-partner.php:6,16 |
| grabwp-restore | 1.0.5 | none declared | grabwp-restore/grabwp-restore.php:5 |
| grabwp-templates-shop | 1.0.3 | none declared (needs WooCommerce, see 2) | grabwp-templates-shop/grabwp-templates-shop.php:6 |

Requirements [ADDED]: Base, Pro, WaaS, Partner: WordPress 5.0+ and PHP 7.4+ (grabwp-tenancy/grabwp-tenancy.php:13,15). Restore: WordPress 6.2+, PHP 7.4+ (grabwp-restore/grabwp-restore.php:11,12). Templates Shop: WordPress 6.0+, PHP 7.4+ (grabwp-templates-shop/grabwp-templates-shop.php:13,15). Tested up to 7.1 (grabwp-tenancy/readme.txt:5).
Add-on versions that WaaS expects: the Add-ons tab shows "Requires WaaS Update" / "Requires WaaS %s" (grabwp-tenancy-waas/admin/views/addons.php:56,143). Discounts shows "GrabWP Tenancy Discounts needs GrabWP Tenancy WaaS %s or newer. Discounts are off until WaaS is updated." (grabwp-tenancy-discounts/grabwp-tenancy-discounts.php:112).

Role in plain words:
- Base: shared database with a table prefix per tenant, separate uploads folder per tenant, domain and path routing, basic tenant admin (grabwp-tenancy/readme.txt:21-26). [OK]
- Pro: dedicated MySQL or SQLite database per tenant, own plugins and themes per tenant, backup and restore, clone, Fix URLs, S3 storage, CDN, license (grabwp-tenancy-pro/readme.txt:17-23). [OK]
- WaaS: sells sites: signup, plans, billing, dashboard, subscriptions, suspension. [OK]
- Billing providers: Polar and WooCommerce are built into WaaS (grabwp-tenancy-waas/includes/billing/class-grabwp-tenancy-waas-polar-adapter.php, class-grabwp-tenancy-waas-woocommerce-hooks.php); Stripe, SePay, Xendit are separate add-ons. [OK]
- Partner and Templates Shop: pricing notes say "GrabWP Tenancy Partner and GrabWP Template Shop are not released yet" (project-hub cs/pricing-and-license.md, Notes from Tai). They exist in the prod tree. UNVERIFIED whether they are publicly released; the KB should not describe them as available until the owner confirms.
- "Cross-Database Migration" [FIXED]: Pro readme says "Restore across database types (shared MySQL <-> dedicated MySQL <-> SQLite)" (grabwp-tenancy-pro/readme.txt:21). It is a property of Restore, not a separate screen. UNVERIFIED end to end. The only "Migrate" button in Pro is "Migrate uploads now" for local to S3 (grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-admin-form-renderer.php:288).

---

## 2. Admin surface

All pages need `manage_options` unless stated.

### Base
- Top menu label "Tenancy" (page title "GrabWP Tenancy"), slug `grabwp-tenancy`, position 3 (grabwp-tenancy/includes/class-grabwp-tenancy-admin.php:270-278). [OK]
- Submenus: "All Tenants" (:280), "Add New" (page title "Add New Tenant", slug `grabwp-tenancy-create`, :289), "Settings" (:307), "Status" (:316), "Upgrade to Pro" (:326, only when `should_show_upsell()` is true, i.e. Pro not active). [OK]
- Hidden pages (parent is a label string, so no menu item): "Edit Tenant" slug `grabwp-tenancy-edit` (:298); "GrabWP setup" slug from `PAGE_SLUG` (grabwp-tenancy/includes/class-grabwp-tenancy-setup-wizard.php:65); "Clone Tenant" slug `grabwp-tenancy-clone`, parent null (grabwp-tenancy/includes/backup/class-grabwp-tenancy-clone-admin.php:76). [OK]
- Settings tabs: "Tenant Capabilities", "Performance & Security", "Routing" (grabwp-tenancy/admin/views/settings.php:24-26). [OK]
- Status tabs: "Plugin General" (tab=general, default), "Base Plugin" (tab=base), "Pro Plugin" (tab=pro) (grabwp-tenancy/admin/views/status.php:73,77,81). [OK, line numbers corrected]
- Status has a "run setup wizard" button via `GrabWP_Tenancy_Setup_Wizard::get_entry_link()` (status.php:65-66). [ADDED]

### Pro (all under Tenancy)
- "Pro Settings" slug `grabwp-tenancy-pro-settings` (grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-admin-pages.php:36). [OK]
- Pro Settings tabs: Isolation, Database, Directories, Symlink, Storage, Backup, Routing (legacy only; redirects to Base `grabwp-tenancy-settings#tab-routing`, pro-settings.php:21-22,43), CDN (grabwp-tenancy-pro/admin/views/pro-settings.php:36-45). [OK]
- "License" slug `grabwp-tenancy-license` [FIXED path]: grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-admin-licensing.php:67 (not includes/licensing/). View: admin/views/license-screen.php.
- Hidden per-tenant pages (parent is a label): "Tenant Extensions" `grabwp-tenancy-pro-extensions` (admin-pages.php:45); "Tenant Settings" `grabwp-tenancy-pro-tenant-settings` (:54); "Tenant Overrides" `grabwp-tenancy-pro-overrides` (:64, registered only if `grabwp_tenancy_pro_overrides_supported()`, which needs a new enough Base); "Clone Tenant" `grabwp-tenancy-pro-clone` (grabwp-tenancy-pro/includes/backup/class-grabwp-tenancy-pro-clone-admin.php:54); "Backup Tenant" `grabwp-tenancy-pro-backup` and "Restore Tenant" `grabwp-tenancy-pro-restore` (.../class-grabwp-tenancy-pro-backup-admin.php:170,178); "Fix URLs" `grabwp-tenancy-pro-fix-urls` (.../class-grabwp-tenancy-pro-fix-urls-admin.php:44). [OK, Overrides condition ADDED]
- Tenant action tab bar: "Edit", "Extensions", "Clone", "Fix URLs", "Backup", "Restore", "Settings", and "Overrides" only when supported; plus external links to the tenant homepage and wp-admin (grabwp-tenancy-pro/admin/views/partial-tenant-action-nav.php:21-60) [FIXED path; r1 cited admin/views without the plugin folder].
- Tenant list row action is titled "Plugins & Themes" and opens Extensions (grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-admin-pages.php:285). The Pro Settings hint says "Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site." (grabwp-tenancy-pro/admin/views/partials/pro-settings-content-isolation.php:133) [FIXED line; r1 said :121].

### WaaS
- Top menu label is "Waas" (not "WaaS"), slug `grabwp-tenancy-waas` (grabwp-tenancy-waas/admin/class-grabwp-tenancy-waas-admin.php:51-58) [FIXED]. Settings page title is "WaaS Settings" (admin/views/waas-settings.php:35).
- Submenus: Dashboard, Subscriptions, Domains, Templates (admin.php:61-64); "Settings" is added from grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas.php:455.
- Hidden pages (parent null): Activity Log, Plans, Tags, Tag Groups, Bulk, Subscription Detail (admin.php:65-70) [OK]; "Provisioning" slug `waas-provisioning` (grabwp-tenancy-waas/admin/class-grabwp-tenancy-waas-admin-provisioning.php:38) and "Billing Providers" slug `grabwp-tenancy-waas-billing-providers` (.../class-grabwp-tenancy-waas-admin-billing-providers.php:15,35) [ADDED].
- Settings tabs (tab=): General, Appearance, Signup Flow, Email, Plans, Benefits, Services, Billing Providers (billing), Activity Log (activity), Provisioning, Add-ons (grabwp-tenancy-waas/admin/views/waas-settings.php:17-27). [OK]
- Subscriptions screen has admin actions "Change Plan" and "Extend Period" per cs/faq-and-workflows.md (Manual trial section). UNVERIFIED in code by me; confirm labels in grabwp-tenancy-waas/admin/views/subscription-detail.php before quoting.

### Add-ons and companions
- Payment adapters (Stripe, SePay, Xendit) add fields to WaaS > Settings > Billing Providers; no own menu. [OK] (Stripe field text at grabwp-tenancy-stripe/includes/class-grabwp-tenancy-stripe-adapter.php:208; SePay at grabwp-tenancy-sepay/includes/class-grabwp-tenancy-sepay-adapter.php:420.)
- Discounts: "Discounts" under Waas (grabwp-tenancy-discounts/includes/class-grabwp-tenancy-discounts-admin.php:40). [OK]
- Partner: "Partners" under Waas, slug `grabwp-waas-partners` (grabwp-tenancy-partner/includes/class-gtp-plugin.php:224). [OK] (path `includes/class-gtp-plugin.php` exists.)
- Templates Shop: "Templates Shop" (`gts-settings`) and "Sync Templates" (`gts-sync`) under WooCommerce, capability `manage_woocommerce` (grabwp-templates-shop/includes/class-gts-plugin.php:63,72). [OK]
- Restore: "GrabWP Restore" under Tools, slug `grabwp-restore`; the menu is NOT added on WordPress Multisite (grabwp-restore/includes/class-grabwp-restore-admin.php:27-30) [ADDED].

---

## 3. Glossary candidates (verified)

Drop list: r1 terms 70 "Passwordless Magic Link (OTP)" is kept but renamed; r1 terms 22 "Tenant Mapping File" kept. Dropped as unsupported: "Cross-Database Migrations" as a feature (see 1), "Domain Filesystem Symlinking" described as "virtual host directories to WordPress root" (wrong, see term 25).

Core
1. Main site [OK]: the WordPress site where the plugins are installed. A "MAIN" source exists in Clone (`is_mainsite`, grabwp-tenancy/includes/backup/class-grabwp-tenancy-clone.php:114).
2. Tenant [OK]: one customer site served by the same WordPress install. Files: grabwp-tenancy/includes/class-grabwp-tenancy-tenant.php.
3. Tenant ID [FIXED]: exactly 6 characters, lowercase letters and digits (`/^[a-z0-9]{6}$/`), with a reserved list such as admin1, test01, public, system, config, backup (grabwp-tenancy/load-helper-security.php:101-125; tenant.php:97). r1's example "site1" is not valid.
4. Table prefix [FIXED]: the tenant's tables start with `{tenant_id}_` for example `abc123_posts`, set by `$table_prefix = GRABWP_TENANCY_TENANT_ID . '_'` (grabwp-tenancy/load-helper-boot-constants.php:130; `$wpdb->prefix` at :137). Not `wp_{id}_`. When Pro is active, `grabwp_tenancy_pro_set_database_prefix()` runs instead (load-helper-boot-constants.php:120-122); its exact prefix rule is UNVERIFIED.
5. Shared database [OK]: UI label "Shared Database (with table prefixes)" (grabwp-tenancy-pro/admin/views/partials/pro-settings-database.php:26).
6. Isolated MySQL [OK]: UI label "Isolated MySQL Database" (pro-settings-database.php:30). Credentials class is grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-database-credentials.php [FIXED path; no includes/database/ folder].
7. Isolated SQLite [OK]: UI label "Isolated SQLite Database" (pro-settings-database.php:34). Needs PHP `pdo_sqlite`; without it new installs default to shared (grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-config.php:128-130).
8. Data directory (base dir) [FIXED, replaces r1 "Isolated Uploads" path]: default `wp-content/grabwp-tenancy`; older layouts `wp-content/grabwp` and `wp-content/uploads/grabwp-tenancy` are still read (grabwp-tenancy/load-helper.php:57-74). Tenant uploads live at `{base}/{tenant_id}/uploads` (grabwp-tenancy/includes/class-grabwp-tenancy-path-manager.php:154). r1's `wp-content/uploads/sites/{id}/` is wrong. The Status page warns when data is in uploads/ (status-checker.php:220-221).
9. tenants.php [OK]: the file that maps tenants to domains and holds the routing mode, at `{base}/tenants.php` (grabwp-tenancy/load-helper-tenant-detection.php:30; written only by tenant-crud.php:312).
10. settings.php [ADDED]: Base settings file, `{base}/settings.php` (grabwp-tenancy/includes/class-grabwp-tenancy-settings.php:5).
11. Isolation level [FIXED]: Pro Settings > Isolation, "Level of isolation for new sites", four choices titled "Shared", "Simple", "Advanced", "Custom" (grabwp-tenancy-pro/admin/views/partials/pro-settings-content-isolation.php:41-62,96). Simple = own uploads, shared plugins and themes. A fresh install starts at Simple (pro-settings-content-isolation.php:50, default config isolate_uploads true at class-grabwp-tenancy-pro-config.php:42-47). Advanced = own plugins, themes and uploads (:54). Applies to new sites only (:92).
12. Extensions [OK]: plugins and themes of one tenant, managed on the tenant "Extensions" tab (admin-pages.php:45).
13. Install method symlink / copy [OK]: default `symlink` (class-grabwp-tenancy-pro-config.php:56). The Pro readme calls it "Extension Management: Sync, convert (symlink <-> copy), and repair broken symlinks" (grabwp-tenancy-pro/readme.txt:22).
14. Broken symlinks [OK]: the Symlink tab button "Fix All Tenant Broken Symlinks" (pro-settings-domain-symlink.php:140; class-grabwp-tenancy-pro-bulk-symlink-manager.php).
15. Routing mode [FIXED]: values `path`, `domain`, `both`; the stored mode in tenants.php decides, a valid `GRABWP_TENANCY_ROUTING_MODE` constant in wp-config.php wins, and no stored mode means `both` (grabwp-tenancy/load-helper-tenant-detection.php:73-101).
16. Path routing [OK]: tenant opens at `example.com/{prefix}/{tenant}`; `site` is the default prefix (grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-config.php:77). Path rewrite is written to the root `.htaccess` block "GrabWP Tenancy" (grabwp-tenancy/includes/class-grabwp-tenancy-installer.php:525).
17. Path alias [FIXED path]: a readable name instead of the 6 character ID; pattern `[a-z0-9](-?[a-z0-9])*` (grabwp-tenancy-pro/load-helper-pro.php:52). Class: grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-tenant-alias.php (not ...-routing-alias.php). Default: the config class says `alias_enabled => true` (class-grabwp-tenancy-pro-config.php:78) but the Pro defaults revision keeps old installs at false (class-grabwp-tenancy-pro-installer.php:42-46). So alias is on for new installs, off for installs upgraded from before the defaults revision.
18. Domain routing [OK]: tenant matched by hostname.
19. Custom domain [OK]: a customer's own domain on a tenant. Needs the plan benefit `allow_custom_domain` (grabwp-tenancy-waas/includes/dashboard/class-grabwp-tenancy-waas-dashboard-domains.php:41); at most 2 custom domains (:75-76); not offered in path mode (:37).
20. Domain verification [OK]: an HTTP check that the domain reaches the tenant (grabwp-tenancy-waas/includes/dashboard/class-grabwp-tenancy-waas-domain-verifier.php:40,72,76).
21. Domain Mode [FIXED labels]: WaaS Settings > General > "Domain Mode" with choices "Cloudflare SaaS (CNAME)" and "Direct IP (A record)" (grabwp-tenancy-waas/admin/views/waas-settings.php:302-313). Fields: "CNAME Target", "DCV Delegation", "Server Public IP" (:320,329,338). Default `cloudflare_saas` (class-grabwp-tenancy-waas-settings.php:83).
22. Platform domain [FIXED]: "Platform Domain"; leaving it empty gives customer sites path URLs; the page text says "Path mode: customer sites open at %s. No DNS needed." (waas-settings.php:163,173,179). The "Custom Domains" section is hidden in path mode (:298).
23. MU-plugin [FIXED]: file name is `mu-grabwp-tenancy.php` (constant `MU_PLUGIN_FILE`, grabwp-tenancy/includes/class-grabwp-tenancy-installer.php:21), not grabwp-tenancy-mu.php. Status row "MU-Plugins Dir Writable" (status-general.php:153).
24. Early loader (wp-config.php line) [FIXED]: GrabWP writes a block between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` containing `( $_grabwpl = __DIR__ . "/wp-content/plugins/grabwp-tenancy/load.php" ) && file_exists( $_grabwpl ) && require_once $_grabwpl;`, placed before the "stop editing" line (grabwp-tenancy/includes/class-grabwp-tenancy-installer.php:134-186,676). If it cannot find the marker the message is "Could not find the stop-editing marker in wp-config.php. Please add the line manually." (:183).
25. Domain symlink (Pro) [FIXED]: "Domain Symlink (Clean URLs)" rewrites tenant asset URLs from `/wp-content/uploads/grabwp-tenancy/{tenant-id}/` to `/wp-content/`; needs `symlink()` and web server rules (Nginx and LiteSpeed/Apache snippets) (pro-settings-domain-symlink.php:40-41,92-117). Buttons: "Fix All Tenant Broken Symlinks", "Sync All Tenant Domain Symlinks".
26. Direct login / login token [FIXED]: the main site builds a `grabwp_token` plus `grabwp_hash` URL; the token is a timestamp signed with HMAC-SHA256 and is valid for 1800 seconds (30 minutes) unless `GRABWP_TENANCY_TOKEN_TTL` is set (grabwp-tenancy/includes/class-grabwp-tenancy-tenant.php:319-345). r1 said 60 seconds: wrong. It is not single-use in code I read (UNVERIFIED for replay).
27. Clone [OK]: Base clone 6 steps, Pro clone 7 steps (see 4).
28. Backup / Restore [OK]: Pro backup 7 steps, restore 8 steps (see 4).
29. Fix URLs [FIXED path]: Pro screen "Fix URLs" (class-grabwp-tenancy-pro-fix-urls-admin.php:44); the replacer is class-grabwp-tenancy-pro-clone-url-replacer.php (no class-...-fix-urls.php exists).
30. Auto backup [OK]: Pro Settings > Backup; schedule `manual|daily|weekly|fortnightly|monthly`, default `manual`; retain 1 to 30, default 7; enabled `disabled` by default (class-grabwp-tenancy-pro-config.php:89-93). Cron hook `grabwp_tenancy_pro_auto_backup` (grabwp-tenancy-pro/includes/backup/class-grabwp-tenancy-pro-auto-backup.php:30,486).
31. Backup offload [OK]: Offload Driver choices "Disabled", "Use Platform S3 Storage", "Custom S3 Endpoint"; "Google Drive (Coming Soon)" and "FTP / SFTP (Coming Soon)" are shown but not available (pro-settings-backup-offload.php:42-65). Options "Auto Offload" and "Delete Local Copy" (:77,88).
32. Storage driver [OK]: `local` or `s3` (config.php:67); "Migrate uploads now" button; warning that switching s3 to local without migrating breaks media (class-grabwp-tenancy-pro-admin-form-renderer.php:279-288).
33. Asset CDN [FIXED path]: the class is grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-static-cdn.php (no cdn/ folder). Settings `cdn.enabled` false, `cdn.host` '' (config.php:81-82).
34. Per-tenant overrides [OK, with caveat]: Tenant Overrides lets one tenant use "Use global setting", "Yes" or "No" per on/off setting (grabwp-tenancy-pro/readme.txt:12 changelog 1.1.17). It also warns when a constant defined before GrabWP overrules the setting. Whether a tenant with an override stops inheriting later global changes: per-setting, "Use global setting" keeps inheriting. r1's blanket statement is [FIXED].
35. Preset constant rule [ADDED]: a constant such as DISALLOW_FILE_MODS already defined in wp-config.php before GrabWP loads overrules the Settings screen (grabwp-tenancy/includes/class-grabwp-tenancy-settings.php:230-256, `capture_preset_constants`).
36. Suspension flag [FIXED]: a file `{base}/suspended/{tenant_id}.php` (grabwp-tenancy/includes/class-grabwp-tenancy-path-manager.php:250-251) written by WaaS with the reason, HTTP status and page HTML (grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-tenant-status.php:131-135).
37. Suspended site page [FIXED]: editable under WaaS Settings > Email as "Suspended site page"; default text "{tenant_domain} is temporarily unavailable"; HTTP code 503 by default (email-templates.php:163-170; tenant-status.php:129). Needs Base 1.1.12+ and WaaS 1.1.21+ (cs/faq-and-workflows.md, Suspended sites).
38. WaaS [OK]. 39. Plan [OK] (grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-plan-manager.php). 40. Benefit [FIXED path]: grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-benefit-manager.php (no benefits/ folder); example key `allow_custom_domain`. 41. Service (add-on) [OK]: class-grabwp-tenancy-waas-addon-manager.php. 42. Template [OK]: class-grabwp-tenancy-waas-template-manager.php. 43. Provisioning [OK]: class-grabwp-tenancy-waas-provisioning-runner.php.
44. Provisioning intent [OK]: one row per signup, table `grabwp_waas_provisioning_intents`, default state `checkout_pending` (grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-provisioning-intent-store.php:15; installer-schema.php:141). A chosen site name is held for 2 hours (`RESERVATION_TTL`, intent-store.php:16).
45. Grace period [FIXED]: WaaS Settings > General, "Grace Period (days)", default 7, help text "Days before tenant is suspended after subscription cancellation. 0 = immediate." (waas-settings.php:375-376; class-grabwp-tenancy-waas-settings.php:70). Applies to cancelled subscriptions (tenant-status.php:60-67). The "Plan expired (grace period)" email reports "grace days left" (email-templates.php:56-62).
46. Built-in trial [ADDED]: default 14 days, plan-level 1 to 365 days; provider trial up to 730 days (grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-builtin-trial.php:22,77-78). Reminder emails at days "7,3,1" by default (email-templates.php:219).
47. Activity log [OK]: retention setting "Retention (days)", 7 to 365, default 90 (waas-settings.php:370-371; class-grabwp-tenancy-waas-settings.php:69).
48. Auth mode [FIXED]: WaaS Settings > General "Auth Mode": "WAAS Auth (Email signup)" (value `waas_auth`, default) or "WordPress Auth (Login required)" (`wp_login`) (waas-settings.php:282-291; class-grabwp-tenancy-waas-settings.php:63). Customer login code (OTP by email): grabwp-tenancy-waas/includes/auth/class-grabwp-tenancy-waas-auth-email.php; email "Verification code" expires in `{expires_minutes}` minutes.
49. Billing provider [OK]. 50. Anchor product [OK]: WooCommerce "anchor product"; repair button "Create/Repair WooCommerce Anchor Product" (waas-settings.php:393); success notice "WooCommerce anchor product is ready." (:137).
51. Primary / secondary currency [FIXED]: `currency_primary` default `USD`; `currency_secondary` default empty string (class-grabwp-tenancy-waas-currency-config.php:23,26), exchange rate default 25500 (class-grabwp-tenancy-waas-settings.php:79). r1 said secondary default VND: wrong.
52. Partner / Partner credits / Warm pool [OK in code, release status UNVERIFIED]: credits table `grabwp_waas_partners`, transactions `grabwp_partner_transactions` (grabwp-tenancy-partner/includes/class-gtp-credits.php:15-16). Warm pool states below. WP-CLI `wp grabwp-partner pool size <template> <n>` (grabwp-tenancy-partner/readme.txt:83).
53. Discount rule [FIXED]: duration choices "First payment only" (`once`), "Fixed number of payments (including first)" (`repeating`), "Every payment until plan change or cancellation" (`forever`) (grabwp-tenancy-discounts/admin/views/discount-edit.php:105-107); types `percent`-style and `fixed` (engine.php:218). Promo shortcode `[grabwp_waas_promo]` (class-grabwp-tenancy-discounts-frontend.php:53).
54. REST API key [OK]: header `X-GrabWP-WaaS-API-Key`; generated in WaaS Settings > General > "API Keys", shown once: "New API key generated. Copy it now - it will not be shown again:" (grabwp-tenancy-waas/includes/api/class-grabwp-tenancy-waas-rest-auth.php:83; waas-settings.php:142,405).

Dropped from r1: "Cloud Storage Driver" file path (wrong folder, term kept as 32), "Embed Code" file `assets/js/grabwp-embed.js` UNVERIFIED (not checked), "Campaign Link" (not found in code I read; UNVERIFIED), "Starter Site" (wizard step name not verified; UNVERIFIED).

---

## 4. Statuses and lifecycles

### Subscription status (stored in `grabwp_waas_subscriptions.status`, default `pending`; installer-schema.php:54)
Stored values seen in code: `pending`, `trial`, `active`, `warning`, `suspended`, `expired`, `cancelled` (class-grabwp-tenancy-waas-subscription-presenter.php:35-43; tenant-status.php:46-56). `pending_cancel` appears only as a mapped WooCommerce state (class-grabwp-tenancy-waas-woocommerce-normalizer.php:96) and in a comment (tenant-status.php:55); it is not a customer-facing label. [FIXED]

What the admin and customer see (badges, grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-subscription-presenter.php:35-43; `get_status_context()` :54-80):
- "Active" (active)
- "Expiring Soon": active and 7 days or fewer to period end
- "Expired": still `active` in the DB but the period end has passed, or `expired`
- "Grace Period": DB status `warning` [FIXED; r1 called it "warning"]
- "Suspended"
- "Cancelled"
- "Pending"
- "Trial"
- "Cancelling": DB status active with `cancel_at_period_end` set [FIXED; r1's `pending_cancel` was wrong]
Free plans skip the date based statuses (presenter.php:63-65).

What each status does to the site (grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-tenant-status.php:41-92):
- active, trial, warning: site stays on.
- pending: never suspends.
- suspended, expired: site is blocked at once.
- cancelled: blocked after the grace period; if Grace Period is 0 it is blocked at once; the "cancel immediately" path blocks at once (:60-67, :111-114).

### Suspension reason (stored in the flag file; tenant-status.php:128)
`admin` (suspended by the platform admin), `cancelled`, `trial_ended` (built-in trial ended unpaid), `unpaid` (everything else). [OK]

### Provisioning intent state (intent-store.php:19)
`checkout_pending`, `payment_confirmed`, `finalizing`, `tenant_created`, `clone_running`, `failed_retriable`, `completed`, `failed_terminal` [OK]. Retry limit 12 (`MAX_RETRIES`, class-grabwp-tenancy-waas-provisioning-runner.php:19, used at :197-202). `clone_status` column holds the clone job state (installer-schema.php:158); its values `running/completed/failed` UNVERIFIED. Stuck jobs are re-queued by hourly cron `grabwp_waas_scan_stale_intents` (installer.php:47). Description texts for each state in r1 are interpretation; KB should use "payment confirmed, site being built" level wording.

### Invoice status (class-grabwp-tenancy-waas-invoice-manager.php:105,215,292,306,320)
`pending`, `open`, `paid`, `voided`, `expired` [OK]; `pending` and `open` both mean unpaid (:215).

### Add-on service contract status (class-grabwp-tenancy-waas-addon-contract-manager.php:88,311,335,356)
`active`, `past_due`, `cancelled` [OK].

### Domain check results (domain-verifier.php:40,72,76) [OK, exact strings in section 5]

### Discount rule state (grabwp-tenancy-discounts/includes/class-grabwp-tenancy-discounts-engine.php:16-21)
Constants `applied`, `paused`, `not_started`, `ended`, `sold_out`. The UI labels "Active / Paused / Scheduled / Ended / Sold out" come from r1; UNVERIFIED, check discounts-list.php before quoting.

### Warm pool entry state (grabwp-tenancy-partner/includes/class-gtp-pool.php:155,165)
`cloning`, `ready`; anything else is counted `failed`. A `cloning` entry older than 30 minutes is treated as stale (`STALE_MIN`, :33,254). [OK]

### Pro license
Local status `active` or `inactive` (class-grabwp-tenancy-pro-license.php:128,255). The license server can report `granted`, `revoked`, `disabled`, `expired` (:48). [FIXED; r1 listed "active/inactive/revoked/expired" as one list]. Key format `GRABWPPRO-` followed by letters, digits, dashes (:53).

### Step lists
- Base clone, 6 steps (grabwp-tenancy/includes/backup/class-grabwp-tenancy-clone.php:35,119-124): 1 validate, 2 export database, 3 import database, 4 fix URLs, 5 copy uploads, 6 clean up. [OK]
- Pro clone, 7 steps (grabwp-tenancy-pro/includes/backup/class-grabwp-tenancy-pro-clone.php:23,100-120): 1 validate, 2 export database (skipped for SQLite fast clone), 3 import database, 4 link or copy extensions, 5 fix URLs, 6 copy uploads (can continue in the background for S3), 7 clean up and rewrite template URLs. [OK]
- Pro backup, 7 steps (.../class-grabwp-tenancy-pro-backup.php:33,123-129): validate, export database, export content (own plugins and themes), export config, export uploads, package ZIP, clean up. [OK]
- Pro restore, 8 steps (.../class-grabwp-tenancy-pro-restore.php:38,112-119): validate archive, extract, verify contents, restore database, restore content, restore config, restore uploads, clean up. [OK]
- GrabWP Restore standalone, 7 steps (grabwp-restore/includes/class-grabwp-restore-step-controller.php:15-31): validate, extract, import database, restore uploads, restore plugins, restore themes, clean up. [OK]

---

## 5. User-visible errors and notices (exact strings)

Line numbers corrected where r1 was off.

| Text | File:line | Cause (verified from code) |
|---|---|---|
| `load.php is not included in wp-config.php.` | grabwp-tenancy/includes/class-grabwp-tenancy-admin-notice.php:52 | Constant `GRABWP_TENANCY_LOADED` is not defined: the wp-config.php block is missing or not reached. Shown on every admin page to admins. With link "View Status →". |
| `MU-plugin is not installed. Tenant features may not work.` | admin-notice.php:62 | `mu-grabwp-tenancy.php` not in the mu-plugins folder; shown only on plugin pages. [FIXED file name] |
| `Data directory is missing.` | admin-notice.php:72 | The base data folder (default `wp-content/grabwp-tenancy`) does not exist. |
| `Root .htaccess needs to be updated for tenant routing.` | admin-notice.php:108 | Apache only; the GrabWP rewrite block is missing, lacks the rule for the current prefix, or sits after "# BEGIN WordPress" (:86-101). |
| `You're using a legacy path structure. To comply with WordPress standards:` then steps "1. Deactivate the plugin", "2. Rename and move the entire %1$s folder to %2$s", "3. Reactivate the plugin" | grabwp-tenancy/admin/views/status.php:95-105 | Data folder is in an older location. Matching Status row: "⚠ Using legacy path structure" (status-base.php:38). |
| `Invalid or expired admin access token.` | grabwp-tenancy/includes/class-grabwp-tenancy-loader.php:302 | Token older than 1800 s (30 min) or signature mismatch. [FIXED line and TTL]. Redirects to wp-login.php?grabwp_token_error=1 (loader.php:360-364). |
| `Tenant identification failed.` | loader.php:309 | Cause in r1 UNVERIFIED (read lines 305-310 before quoting a cause). |
| `No admin user found for tenant access.` | loader.php:316 | Tenant database has no administrator to log in as. |
| `ℹ .htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` | grabwp-tenancy/admin/views/status-general.php:102 (also setup-steps/check.php:128) | Web server reported as Nginx. [ADDED] |
| `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.` | status-general.php:114 | Apache without mod_rewrite. [ADDED] |
| `⚠ Yes. GrabWP Tenancy is not designed for Multisite` | status-general.php:125 | WordPress Multisite is on. [ADDED] |
| `Auto-install of MU-plugin will not work. Manual installation required.` | status-general.php:159 | mu-plugins folder not writable. [ADDED] |
| `Plugin needs write access to create tenant directories and manage configuration files.` | status-general.php:148 | Data dir not writable. [ADDED] |
| `Could not find the stop-editing marker in wp-config.php. Please add the line manually.` | grabwp-tenancy/includes/class-grabwp-tenancy-installer.php:183 | Automatic wp-config.php edit failed. [ADDED] |
| `Could not read tenants.php, so nothing was changed. Check the file and its permissions.` | grabwp-tenancy/includes/class-grabwp-tenancy-tenant-crud.php:257 | tenants.php unreadable. [ADDED] |
| Status checker titles: `Multiple tenants.php files detected`, `Multiple global config.php files detected`, `Data directory inside uploads/`, `Pro config directory inside uploads/`, `SQLite directory inside uploads/`, `Directory paths hardcoded in wp-config.php`, `Multiple tenant-aliases.php files detected` | grabwp-tenancy/includes/class-grabwp-tenancy-status-checker.php:182,209,220,230,241,261,277 | Warnings only. Messages at the next line of each. [ADDED] |
| `Please enter a license key.` | grabwp-tenancy-pro/includes/licensing/class-grabwp-tenancy-pro-license.php:98 | Empty key. [OK] |
| `This does not look like a GrabWP Pro license key. It should start with GRABWPPRO-.` | license.php:102 | Wrong format. [OK] |
| `Organization ID not configured.` | license.php:106 | r1 cause is a guess; UNVERIFIED. |
| `Invalid response from license server.` | license.php:171 | License server reply not understood. [OK] |
| `Activation mismatch; refusing to clear license.` | license.php:565 | [OK] |
| `Failed to save Pro settings. Please check file permissions.` | grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-admin-pages.php:322,385 | Could not write the Pro config file. [FIXED line; r1 said :166] |
| `The Isolated MySQL password is not available any more.` | grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-setup-steps.php:567 | [FIXED line; r1 said :267] |
| `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.` | pro-settings-content-isolation.php:133 | Advice, not an error. [FIXED line] |
| `Name is required.` / `Valid email is required.` | grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-provisioning-validator.php:71,74 | Signup form. [FIXED lines] |
| `Please choose a template to get started.` | validator.php:89 | No template chosen. |
| `Please choose an available template.` | validator.php:91 | Template missing or not active. |
| `This template is not available for the selected plan. Please choose a different template or upgrade your plan.` | validator.php:93 | Template restricted from this plan. |
| `Please choose an available plan.` | validator.php:96 | Plan missing or inactive. |
| `This site name is reserved. Please choose another.` | validator.php:375 | Reserved words: www, mail, admin, api, cdn, ftp, smtp, imap, pop, ns1, ns2, dns, cpanel, webmail, app (validator.php:15-18). [FIXED line, list ADDED] |
| `This site name is already taken. Please try another.` | validator.php:379 | |
| `This site name is temporarily reserved by another checkout. Please try another.` | validator.php:382 | Another checkout holds the name for up to 2 hours (intent-store.php:16). [FIXED: time added] |
| `Enter a platform domain such as example.com.` | grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-setup-steps.php:403 | [FIXED line; r1 said :180] |
| `Custom domains are not available while sites use path URLs.` | grabwp-tenancy-waas/includes/dashboard/class-grabwp-tenancy-waas-dashboard-domains.php:37 | [FIXED line] |
| `Custom domains are not available for your current plan.` | dashboard-domains.php:44 | Plan lacks `allow_custom_domain` (:41). |
| `Maximum 2 custom domains allowed.` | dashboard-domains.php:76 | |
| `Cannot remove your platform subdomain.` | dashboard-domains.php:114 | |
| `Verify this domain before setting it as primary.` | dashboard-domains.php:153 | (shows the verifier error instead when there is one) |
| `Domain is not mapped to a tenant.` / `Domain is reachable but is not serving this site yet.` / `Domain did not respond. Point DNS and add it on the server, then try again.` | grabwp-tenancy-waas/includes/dashboard/class-grabwp-tenancy-waas-domain-verifier.php:40,72,76 | [OK] |
| `Stripe secret key is not configured.` | grabwp-tenancy-stripe/includes/class-grabwp-tenancy-stripe-adapter.php:234 (also stripe-api.php:59) | [FIXED line] |
| `SePay is active. Add VND as primary or secondary currency in WaaS > Settings > Billing Providers before customers can pay with SePay.` | grabwp-tenancy-sepay/grabwp-tenancy-sepay.php:196 (admin notice, shown once) | [FIXED text; r1's text was not at this line] |
| `Sepay requires VND currency. Please set VND as primary or secondary currency in WaaS settings first.` | grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-currency-validator.php:125 | Checkout is refused without VND. [ADDED] Pattern `%1$s requires %2$s as primary or secondary currency.` at :45. |
| `API key for webhook authentication. Must be at least 10 alphanumeric characters.` | grabwp-tenancy-sepay/includes/class-grabwp-tenancy-sepay-adapter.php:420 | Field help text, not an error. |
| `Discounts are off. Codes are kept, but checkouts, quotes and pages ignore them until you turn discounts on below.` | grabwp-tenancy-discounts/admin/views/discounts-list.php:33 | [OK] |
| `The platform is busy, please retry.` | grabwp-tenancy-partner/includes/class-gtp-pool.php:119 | [FIXED cause] Raised when the tenants.php lock cannot be taken within 30 s (`locked()`, :117-119), HTTP 503. Not "pool is empty". |
| `No WaaS template has the slug "%s".` | grabwp-tenancy-partner/admin/class-gtp-admin-partners.php:339 | [FIXED line; r1 said :187] |
| `Warning: Destructive Operation` + `This will REPLACE your entire WordPress site including the database, uploads, plugins, and themes. Your current admin credentials will be replaced by those from the backup. ...` | grabwp-restore/views/admin-page.php:16-17 | [OK] |
| WooCommerce notice `WooCommerce anchor product is ready.`; `Signup and Dashboard pages checked.`; `Settings saved.` | waas-settings.php:133-137 | [ADDED] |

Known issue strings from cs/known-issues.md (not in this code, from provider): Xendit `The reference_id entered has been used before`, `Invalid parameter(s): billing_cycle`. UNVERIFIED in code.

---

## 6. Settings reference

### Base: Tenancy > Settings (stored in `{base}/settings.php`, grabwp-tenancy/includes/class-grabwp-tenancy-settings.php:5; defaults :81-94; labels and help :118-205)
Tab "Tenant Capabilities" [OK]:
- "Disable Install Plugins & Themes" (`disallow_file_mods`) default on, constant DISALLOW_FILE_MODS. Help: "Tenant admins cannot install, update or delete plugins and themes."
- "Disable Plugin & Theme File Editor" (`disallow_file_edit`) default on, DISALLOW_FILE_EDIT.
- "Hide Plugins Menu" (`hide_plugin_management`) default off.
- "Hide Appearance Menu" (`hide_theme_management`) default off.
- "Hide GrabWP Plugins" (`hide_grabwp_plugins`) default on. Help: hides every GrabWP plugin and the SQLite plugin from the tenant Plugins list.
Tab "Performance & Security":
- "Disable WP-Cron" (`disable_wp_cron`) default on, DISABLE_WP_CRON. Help: "Run a server cron job instead."
- "Disable XML-RPC" (`disable_xmlrpc`) default on.
- "Post Revisions to Keep" (`wp_post_revisions`) 0 to 100, default 3.
- "Days Before Trash Is Emptied" (`empty_trash_days`) 0 to 365, default 7; "0 deletes them right away."
- "Block External Requests" (`wp_http_block_external`) default off.
- "Allowed Hosts When Blocked" (`wp_accessible_hosts`) default `*.wordpress.org,*.grabwp.com`.
Tab "Routing": "Routing Mode" (`path`, `domain`, `both`; default `both`; `GRABWP_TENANCY_ROUTING_MODE` pins it) (load-helper-tenant-detection.php:89-101). Path prefix and alias fields are drawn by Pro (grabwp-tenancy-pro/admin/views/partials/pro-settings-routing.php); stored under Pro `routing.path_prefix` default `site` and `routing.alias_enabled` (config.php:76-79). Prefix maximum length 20 from r1: UNVERIFIED. [OK otherwise]
Precedence rule [ADDED]: a constant defined in wp-config.php before GrabWP loads overrules these settings (settings.php:230-256).

### Pro: Tenancy > Pro Settings (stored in `{pro base}/config.php`; defaults grabwp-tenancy-pro/includes/class-grabwp-tenancy-pro-config.php:41-95)
- Isolation: "Level of isolation for new sites" (Shared, Simple, Advanced, Custom). Custom switches: "Give each new site its own themes", "Give each new site its own plugins", "Give each new site its own uploads folder" (pro-settings-content-isolation.php:68-79). Defaults: themes off, plugins off, uploads on (config.php:42-47). Own themes always comes with its own wp-content folder (:62).
- Database: "Database Type" (Shared Database (with table prefixes), Isolated MySQL Database, Isolated SQLite Database); default Isolated SQLite when `pdo_sqlite` exists, else Shared (config.php:49,128-130). "Default MySQL Connection": MySQL Host, MySQL Database, MySQL Username (pro-settings-database.php:54-76); the password is stored encrypted (UNVERIFIED which cipher; setup wizard uses libsodium secretbox, class-grabwp-tenancy-setup-wizard.php:1400). MySQL details are set per tenant.
- Directories, Symlink, Storage, Backup, CDN: defaults in config.php:56-92. Storage region default `auto`.
- Auto backup defaults: disabled, `manual`, retain 7 (config.php:89-93).

### WaaS: Waas > Settings (option `grabwp_waas_settings`, class-grabwp-tenancy-waas-settings.php:15; defaults :63-86)
General tab labels [FIXED]: "Platform Domain", "WaaS Directory", "Signup Page", "Dashboard Page", "Templates Page", "Pricing Page", "Auth Mode", "Domain Mode", "CNAME Target", "DCV Delegation", "Server Public IP", "Retention (days)", "Grace Period (days)" (waas-settings.php:173-375). Sections "Platform", "Authentication", "Custom Domains", "Retention and grace period", "Repair tools", "API Keys". Defaults: auth `waas_auth`, domain mode `cloudflare_saas`, retention 90 (min 7, max 365, waas-settings.php:371), grace 7. Default page URLs /signup/, /dashboard/, /templates/, /pricing/ (settings.php:210-237). Buttons "Create/Repair Signup and Dashboard Pages", "Create/Repair WooCommerce Anchor Product", "Generate New API Key".
Currency (Billing Providers tab): `currency_primary` USD, `currency_secondary` empty [FIXED], exchange rate 25500, position `before`, thousand `,`, decimal `.` (settings.php:77-82; currency-config.php:15-26).
Appearance and Provider field lists in r1: UNVERIFIED in this pass (not re-read). Do not quote provider field names, defaults (Polar API base URL, Sepay `DH` prefix, Xendit currency list) before checking the adapters:
- Polar: grabwp-tenancy-waas/includes/billing/class-grabwp-tenancy-waas-polar-adapter.php
- Sepay: grabwp-tenancy-sepay/includes/class-grabwp-tenancy-sepay-adapter.php
- Xendit: grabwp-tenancy-xendit/includes/ (adapter class)

---

## 7. Shortcodes, blocks, emails, endpoints, cron

### Shortcodes [OK]
`[grabwp_waas_signup]` (grabwp-tenancy-waas/includes/shortcodes/class-grabwp-tenancy-waas-signup-shortcode.php:19), `[grabwp_waas_dashboard]` (dashboard-shortcode.php:16), `[grabwp_waas_pricing]` (pricing-shortcode.php:18), `[grabwp_waas_templates]` (templates-shortcode.php:65), `[grabwp_waas_login]` (login-shortcode.php:18), `[grabwp_waas_promo]` (grabwp-tenancy-discounts/includes/class-grabwp-tenancy-discounts-frontend.php:53).

### Blocks [FIXED names]
`grabwp-waas/signup`, `grabwp-waas/dashboard`, `grabwp-waas/pricing`, `grabwp-waas/login`, `grabwp-waas/template-browser` (grabwp-tenancy-waas/blocks/*/block.json:4). r1 used `grabwp/...`.

### Emails [FIXED, r1 list was largely invented]
Source: grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas-email-templates.php:31-170. Labels shown in Email settings:
Customer: "Welcome" (`welcome`), "Site setup complete" (`provisioning_complete`), "Renewal reminder" (`renewal_reminder`), "Plan expired (grace period)" (`grace_period_warning`), "Site suspended" (`suspension_notice`), "Invoice created" (`invoice_created`), "Invoice paid" (`invoice_paid`), "Free trial started" (`trial_started`), "Free trial ending" (`trial_ending`), "Free trial ended" (`trial_ended`), "Verification code" (`otp`, required).
Admin: "New signup" (`new_signup`), "Provisioning failed" (`provisioning_failed`), "Payment received" (`payment_received`), "Payment failed" (`payment_failed`), "Subscription cancelled" (`subscription_cancelled`), "Tenant suspended" (`tenant_suspended`).
Page: "Suspended site page" (`suspended_page`, required).
Count: 11 customer, 6 admin, 1 page = 18 templates. r1's `invoice_receipt`, `service_activated`, `service_payment_failed`, `service_cancelled`, `admin_new_signup`, `admin_provisioning_failed` do not exist [DROPPED]. Trial reminder days default "7,3,1" (:219).

### Webhooks
Route pattern `/wp-json/grabwp-waas/v1/webhooks/billing/{provider}` (grabwp-tenancy-waas/includes/api/class-grabwp-tenancy-waas-webhook-controller.php:15-16,48-50) [OK]; a legacy `/webhooks/polar` route also exists (:67) [ADDED]. Signature headers: Polar `webhook-signature` (and variants), Stripe `Stripe-Signature` (webhook-controller.php:349-350). Stripe events handled include `invoice.payment_failed`, `charge.refunded` (stripe-adapter.php:963,966). Polar events include `subscription.revoked`, `customer.state_changed` (webhook-controller.php:498,516). Full event lists and the Xendit and Sepay header details in r1 are UNVERIFIED; the KB does not need them. WooCommerce uses internal hooks, no webhook (class-grabwp-tenancy-waas-woocommerce-hooks.php).

### Partner REST [FIXED]
Namespace `grabwp-waas/v1`, base `partner`: `/partner/plans`, `/partner/templates`, `/partner/signup`, `/partner/intent/{id}`, `/partner/tenants/{id}`, `/partner/tenants/{id}/checkout`, `/partner/product-feed`, `/partner/download` (grabwp-tenancy-partner/includes/api/class-gtp-rest-partner-controller.php:19-76; ...product-feed-controller.php:16; ...download-controller.php:16). Auth header is `X-GrabWP-WaaS-API-Key` (class-gtp-plugin.php:142), not `X-GTP-Partner-Key` [DROPPED]. r1's `/grabwp-partner/v1/sites` does not exist.

### Cron hooks [FIXED names]
| Hook | Schedule | Source |
|---|---|---|
| `grabwp_waas_purge_activity_log` | daily | grabwp-tenancy-waas/includes/class-grabwp-tenancy-waas.php:287 |
| `grabwp_waas_check_expired_subscriptions` | daily (also run once after install) | class-grabwp-tenancy-waas.php:293; installer.php:99 |
| `grabwp_waas_purge_stale_pending_admins` | daily | class-grabwp-tenancy-waas.php:299 |
| `grabwp_waas_sync_polar_subscriptions` | twice daily | .../billing/class-grabwp-tenancy-waas-polar-subscription-sync.php:16 |
| `grabwp_waas_subscription_reconcile` | twice daily | .../billing/class-grabwp-tenancy-waas-subscription-reconciler.php:22 |
| `grabwp_waas_generate_renewal_invoices` | twice daily | .../class-grabwp-tenancy-waas-renewal-invoice-generator.php:30 |
| `grabwp_waas_refresh_storage_usage` | daily | .../class-grabwp-tenancy-waas-storage-usage.php:14 |
| `grabwp_waas_scan_stale_intents` | hourly | .../class-grabwp-tenancy-waas-installer.php:47 |
| `grabwp_waas_resume_provisioning_intent` | one-off | .../class-grabwp-tenancy-waas-provisioning-runner.php:15,81 |
| `grabwp_waas_tenant_suspend_after_grace` | one-off | .../class-grabwp-tenancy-waas-tenant-status.php:63 |
| `grabwp_tenancy_pro_auto_backup` | per tenant, chosen schedule | grabwp-tenancy-pro/includes/backup/class-grabwp-tenancy-pro-auto-backup.php:30,486 |
| `grabwp_pro_clone_media_copy` | one-off | .../class-grabwp-tenancy-pro-clone-uploads-copier.php:29,267 |
| `gtp_pool_cron` | hourly | grabwp-tenancy-partner/includes/class-gtp-plugin.php:70 |
| `gtp_purge_activity_log` | daily | class-gtp-plugin.php:80 |
| `grabwp_restore_cleanup_temp` | hourly | grabwp-restore/grabwp-restore.php:51 |
Why it matters: Base turns WP-Cron off by default (`disable_wp_cron` true), so these only run if a server cron job hits `wp-cron.php` (settings.php:86 default and help text "Run a server cron job instead."). Whether the tenant-facing flag disables cron on the main site as well: UNVERIFIED; the code defines DISABLE_WP_CRON only on tenant requests (settings.php:234-238 comment).

---

## 8. Feature by plan matrix (kept coarse; plan pricing lives in cs/pricing-and-license.md)

| Feature | Base (free) | Pro | WaaS | Evidence |
|---|:-:|:-:|:-:|---|
| Domain and path routing | yes | yes | yes | grabwp-tenancy/readme.txt:23 |
| Shared database with table prefix | yes | yes | yes | readme.txt:21 |
| Own uploads folder per tenant | yes | yes | yes | readme.txt:22 |
| Setup wizard, tenant Clone (6 steps) | yes | yes | yes | setup-wizard.php:65; clone.php:35 |
| Direct login token | yes | yes | yes | tenant.php:319 |
| Settings: capabilities, performance, routing mode | yes | yes | yes | settings.php |
| Isolated MySQL, Isolated SQLite | no | yes | yes | pro-settings-database.php:30,34 |
| Own plugins and themes per tenant, symlink or copy | no | yes | yes | pro-settings-content-isolation.php |
| Path prefix and path aliases | no | yes | yes | config.php:76-79 |
| Pro Clone (7), Backup (7), Restore (8) | no | yes | yes | see section 4 |
| Fix URLs | no | yes | yes | fix-urls-admin.php:44 |
| Per-tenant Settings and Overrides | no | yes | yes | admin-pages.php:54,64 |
| S3 storage, backup offload, auto backup | no | yes | yes | pro-settings-backup-offload.php |
| CDN, domain symlink | no | yes | yes | static-cdn.php; domain-symlink.php |
| Pro license (key GRABWPPRO-...) | n/a | yes | needs Pro | license.php:53 |
| Signup, plans, benefits, services, dashboard, subscriptions, domains, emails, activity log, REST API, blocks and shortcodes | no | no | yes | waas admin.php:61-70 |
| Built-in free trial, grace period, suspended page | no | no | yes | builtin-trial.php:22; tenant-status.php |
| Polar, WooCommerce billing | no | no | yes (built in) | billing/ |
| Stripe, SePay, Xendit, Discounts | no | no | add-on plugin | each plugin readme |
| Partner accounts, credits, warm pool | no | no | add-on plugin (release UNVERIFIED) | gtp-plugin.php:224 |
| Templates Shop (WooCommerce) | no | no | companion (release UNVERIFIED) | gts-plugin.php:63 |
| GrabWP Restore (standalone) | companion plugin for any non-multisite WordPress | | | restore-admin.php:27 |
r1 matrix rows dropped: "Cross-Database Migrations" (see 1), "Broken Symlink Detection & Auto-Repair" kept as a button (term 14), "Customizable HTML Email Notifications (14)" corrected to 17 emails plus the suspended page.
Pricing, trial length of Pro (14 days), license scope (1 WordPress install per license), support levels: owned by cs/pricing-and-license.md. KB must link there or restate only with owner approval.

---

## 9. Gaps and low-tech traps (verified or marked)

1. wp-config.php edit: GrabWP writes it automatically; manual add needed if the marker is not found or the file is not writable (installer.php:183). [FIXED: r1 said it must always be manual]. Status notice appears on every admin page until fixed (admin-notice.php:52).
2. Nginx: `.htaccess` rules do not apply; UI says so on Status (status-general.php:102). Path URLs failing on Nginx matches known issue "xCloud Nginx: path routing /site/{site-id} does not work" (cs/known-issues.md, 2026-06-10). The 404 symptom itself: UNVERIFIED in code, taken from known-issues.
3. MU-plugin folder not writable: Status shows "⚠ No" and "Manual installation required." (status-general.php:159). [OK]
4. SQLite fallback: silent in code (config.php:128-130 has a comment only); Pro Settings shows the default as Shared when `pdo_sqlite` is missing. Whether any notice explains why: UNVERIFIED.
5. Isolated MySQL needs a MySQL user with permission to create databases: stated in cs/faq-and-workflows.md ("needs a MySQL user with the CREATE DATABASE privilege", a planned master account screen). The code requires per-tenant credentials entered by the operator (pro-settings-database.php:49). [OK, source changed]
6. Symlink: default install method is symlink (config.php:56). Hosts that block `symlink()` break plugin activation: UNVERIFIED in code; the Domain Symlink tab does detect it ("symlink() is not available on this server.", pro-settings-domain-symlink.php:163).
7. WP-Cron off by default: confirmed (see section 7 note).
8. Loopback requests: UNVERIFIED in this pass; keep out of the KB until grepped (`wp_remote_get( home_url` in provisioning and domain verifier).
9. DNS vs server alias for custom domains: the verifier error says "Point DNS and add it on the server, then try again." (domain-verifier.php:76). [OK; wording comes from code]
10. "Anchor product": WooCommerce only; repair button exists (waas-settings.php:393). [OK]
11. SePay needs VND as primary or secondary currency; checkout is refused otherwise (currency-validator.php:125). It does not block saving settings in the code I read; r1's "hard validation error on saving" is UNVERIFIED. [FIXED]
12. Xendit amount units: UNVERIFIED, drop.
13. Overrides vs global: see term 34.
14. Moving the data folder: the Status steps are "Deactivate the plugin", rename and move, "Reactivate the plugin" (status.php:95-105). [OK]
15. [ADDED] xCloud login token loop: tenant dashboard icon leads to `wp-login.php?grabwp_token_error=1`; cause found 2026-10-27 (object cache drop-in shares one salt), fix is in review, workaround is Advanced or Custom isolation (cs/known-issues.md, PS-010). The token window is 30 minutes (matches tenant.php:342).
16. [ADDED] Tenants can upload plugins only if "Disable Install Plugins & Themes" is turned off; default is on (settings.php:94 defaults, cs/faq-and-workflows.md). A warning for tenants with that capability is built but not released (cs/faq-and-workflows.md, PS-009); do not state it as shipped.
17. [ADDED] Suspended page needs Base 1.1.12+ and WaaS 1.1.21+; with an older Base, WaaS runs but does not block suspended sites (cs/faq-and-workflows.md).
18. [ADDED] Release note: git history shows "bump WaaS 1.1.25" on 2026-10-23 (d5739d0b) followed by the 2026-10-26 release commit setting WaaS 1.1.24. Prod header says 1.1.24. Owner should confirm which is the intended public version before the KB quotes a WaaS version.
