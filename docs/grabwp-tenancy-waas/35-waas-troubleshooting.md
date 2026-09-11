---
title: "Troubleshooting"
description: "Fix common WaaS issues - provisioning failures, webhook problems, template errors, domain verification, and email delivery"
order: 35
section: waas
---

# Troubleshooting

Common issues and how to fix them.

## Provisioning

### Site provisioning fails or hangs

**Symptoms:** Signup completes payment but site is never created, or spinner runs indefinitely.

**Check:**
1. Go to **WaaS → Settings → Provisioning** - look for stuck intents
2. Check the **Activity Log** (WaaS → Settings → Activity tab) for error details
3. Verify file system permissions:
   ```bash
   # The WaaS data directory must be writable by the web server
   ls -la wp-content/uploads/grabwp-tenancy-waas/
   ```
4. Check PHP error log for fatal errors during provisioning

**Common causes:**
- Insufficient disk space
- File permission issues (web server can't create directories)
- PHP memory limit too low - increase `memory_limit` in `php.ini`
- PHP max execution time - increase `max_execution_time` for long provisioning tasks

### Provisioning intent stuck in "pending"

1. Go to WaaS → Settings → Provisioning
2. Find the stuck intent
3. Click **Retry** to re-queue it, or **Dismiss** to discard it

## Payment & Billing

### Polar webhook not received

**Symptoms:** Customer pays but subscription stays pending. "Last webhook received" timestamp doesn't update.

**Check:**
1. Verify the webhook URL in Polar dashboard matches exactly:
   ```
   https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar
   ```
2. Check that your site is accessible from the internet (not localhost)
3. Verify the webhook secret matches between Polar and WaaS settings
4. Check Polar dashboard → Webhooks → Delivery log for failed attempts

**Common causes:**
- Wrong webhook URL (typo, HTTP instead of HTTPS)
- Firewall blocking incoming webhooks
- Webhook secret mismatch - copy-paste carefully, the `whsec_` prefix is required
- Site behind basic auth or maintenance mode

### Payment succeeds but site not provisioned

1. Check if the webhook was received (WaaS → Settings → Billing → last webhook timestamp)
2. If webhook received: check provisioning queue (WaaS → Settings → Provisioning)
3. If webhook not received: see "Polar webhook not received" above
4. Check Activity Log for errors

### WooCommerce checkout redirects to empty cart

- Verify the **Anchor Product** exists and is published (even if hidden)
- Click **Create/Repair WooCommerce Anchor Product** in WaaS → Settings → General
- Clear any WooCommerce cache plugins

## Templates

### Templates not appearing in gallery

**Check:**
1. Is the template marked as **Active**? (WaaS → Templates → Edit)
2. Is the source tenant still active? (Tenancy → All Tenants)
3. Is the template restricted to specific plans? Check **Allowed Plans** on the template
4. Does the template have a **thumbnail**? Templates without thumbnails may appear broken
5. Clear any page caching on the templates page

### Template preview not loading

- The preview URL uses `?grabwp_waas_preview=<slug>` - make sure your server/caching layer doesn't block this parameter
- Check that the source tenant site is accessible
- Verify there are no PHP errors in the tenant site

## Custom Domains

### Domain verification fails

**Check:**
1. DNS propagation may take up to 48 hours (usually 5-30 minutes)
2. Use a DNS checker to verify the record is visible:
   ```bash
   dig mybusiness.com CNAME    # For Cloudflare SaaS mode
   dig mybusiness.com A        # For Direct IP mode
   ```
3. Ensure the record value is correct:
   - CNAME mode: must point to your CNAME Target exactly
   - Direct IP mode: must point to your server IP exactly

### Custom domain shows wrong site or SSL error

**Cloudflare SaaS:**
- Check that the fallback origin is correctly configured in Cloudflare
- Verify the custom hostname is added in Cloudflare dashboard
- SSL provisioning can take a few minutes

**Direct IP:**
- Ensure your web server (Nginx/Apache) has a server block for the custom domain
- Run Certbot or equivalent for SSL on the new domain
- Reload/restart your web server after config changes

## Tenant Sites

### Tenant site not loading (404 or blank page)

1. Check domain/subdomain DNS resolves correctly
2. Verify the tenant exists in **Tenancy → All Tenants**
3. Check the tenant's database tables exist
4. Look for PHP errors in the error log
5. Verify wildcard DNS is configured: `*.yoursaas.com → your server IP`

### Tenant admin is inaccessible

- Try accessing via `tenant-slug.yoursaas.com/wp-admin/`
- If login fails, the tenant user may not have been created - check provisioning logs
- For WaaS Auth mode: tenants log in via OTP on the dashboard, not wp-login.php

## Email

### OTP codes not arriving

1. Check your spam/junk folder
2. Verify SMTP plugin is configured and working
3. Send a test email from **WP Mail SMTP → Email Test** (or your SMTP plugin's test feature)
4. In development: check Mailpit at `http://yourserver:8025/`

**Common causes:**
- No SMTP plugin installed (default `wp_mail()` often rejected by mail servers)
- SMTP credentials incorrect
- Port blocked by hosting provider (port 25/465/587)
- Sender email domain has no SPF/DKIM records

## File Permissions

### "Permission denied" errors

The web server user (usually `www-data` or `nginx`) needs write access to:

```bash
chown -R www-data:www-data wp-content/grabwp-tenancy/
chown -R www-data:www-data wp-content/grabwp-tenancy-pro/
chown -R www-data:www-data wp-content/uploads/grabwp-tenancy-waas/
chown -R www-data:www-data wp-content/uploads/
```

### S3 connection test fails

1. Double-check endpoint URL, bucket name, region
2. Verify access key and secret key are correct
3. For MinIO: enable **Path-Style Endpoint** checkbox
4. Check that the bucket exists and the credentials have read/write permission
5. Verify network connectivity - your server must be able to reach the S3 endpoint

## Performance

### Slow provisioning

- Increase PHP `memory_limit` to at least 256M
- Increase `max_execution_time` to at least 120 seconds
- For SQLite tenants: ensure SSD storage
- For S3 storage: provisioning uploads are slower than local - expected behavior

### Admin dashboard slow

- The subscriptions and domains list tables query the database - ensure indexes are intact
- If you have hundreds of tenants, consider MySQL performance tuning
- Clear object cache if using a caching plugin

## Getting Help

If you've tried the above and still have issues:

1. **Check the Activity Log** - WaaS → Settings → Activity for detailed error records
2. **Check PHP error log** - usually at `/var/log/php-fpm/error.log` or in your hosting control panel
3. **Check WordPress debug log** - enable `WP_DEBUG_LOG` in `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```
   Logs are written to `wp-content/debug.log`

---

**Back to:** [WaaS Documentation Index](/grabwp-tenancy-waas/waas-overview)
