---
title: "Troubleshooting"
description: "Common issues and how to fix them"
order: 6
section: base
---

# Troubleshooting

## First: Check the Status Page

Go to **GrabWP Tenancy → Status**. This page checks all plugin components automatically and provides **Auto Fix** buttons for most common issues.

---

## Plugin Issues

### "Tenancy" menu doesn't appear in WordPress admin
Go to **GrabWP Tenancy → Status** and check the **wp-config.php Loader** and **MU-Plugin** rows. Use **Auto Fix** if either shows a warning or error.

### Errors after activation
Use the Status page to verify all components. If errors persist, deactivate the plugin - your site returns to its previous state and no tenant data is removed.

---

## Domain Issues

### Site doesn't load or shows the wrong page
- Verify the domain is added in your hosting control panel
- Verify DNS points to your server (use [dnschecker.org](https://dnschecker.org))
- Wait for DNS propagation - up to 24 hours
- Clear browser cache and try in incognito mode

### "Domain already in use" error
Each domain can only be assigned to one tenant site. Check your tenant list, remove the domain from its current site, then reassign it.

### "Invalid domain format" error
Use standard format: `example.com` or `sub.example.com`. No IP addresses, no `localhost`, no special characters.

---

## Content Issues

### Tenant site shows the main site's content
1. Deactivate then reactivate the plugin
2. Check the Status page for any errors
3. Clear all caches - browser, WordPress cache plugin, hosting/CDN cache

### Media uploads fail
Check **GrabWP Tenancy → Status → Base Plugin Status** - the upload directory should be listed there. Verify WordPress has write access to the `wp-content/uploads/` directory.

---

## Access Issues

### Can't log into a tenant site
Generate a new access token: **GrabWP Tenancy → Tenants → Get Token**. Tokens expire after 24 hours.

### Forgot tenant admin password
Use the "Forgot Password" link on the tenant site's login page (`yourdomain.com/wp-login.php`).

---

## Getting Help

When contacting support, include:
- WordPress version
- PHP version
- Error messages from the Status page
- Steps you've already tried

**Support channels:**
- [WordPress Support Forum](https://wordpress.org/support/plugin/grabwp-tenancy/)
- Email: hello@grabwp.com
