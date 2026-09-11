---
title: "Go-Live Checklist"
description: "Verify DNS, SSL, billing, templates, and end-to-end signup before opening to customers"
order: 30
section: waas
---

# Go-Live Checklist

Before opening your WaaS platform to real customers, run through this checklist to verify everything works end-to-end.

## Settings Verification

- [ ] **Platform Domain** is set and wildcard DNS (`*.yoursaas.com`) resolves to your server
- [ ] **SSL certificate** covers wildcard subdomains (`*.yoursaas.com`)
- [ ] **Signup, Dashboard, Templates pages** are created and linked in WaaS → Settings → General
- [ ] **At least one plan** is active (WaaS → Settings → Plans)
- [ ] **At least one template** is active (WaaS → Templates)
- [ ] **Billing provider** is enabled and status shows "Active" (for paid plans)
- [ ] **Auth mode** is set (WaaS Auth recommended for self-service)

## Test the Signup Flow

Walk through the complete customer experience:

### Free Plan Signup

1. Open your signup page (e.g., `https://yoursaas.com/signup/`) in an incognito/private browser window
2. Select the **Free** plan
3. Choose a template
4. Enter a site slug (e.g., `test-free`) and email address
5. Complete the OTP verification (check your email or Mailpit in dev)
6. Wait for provisioning to complete
7. Verify the tenant site loads at `test-free.yoursaas.com`

### Paid Plan Signup

1. Open the signup page in a fresh incognito window
2. Select the **Pro** plan
3. Choose a template
4. Enter a site slug and email
5. Complete payment via Polar checkout
6. Verify the webhook is received (check WaaS → Settings → Billing → "Last webhook received")
7. Verify the tenant site is provisioned

### Dashboard Access

1. Go to your dashboard page (e.g., `https://yoursaas.com/dashboard/`)
2. Log in with the email used during signup
3. Verify you can see:
   - Site overview with link to tenant admin
   - Subscription details
   - Domain management section
   - Account settings

## Email Delivery

- [ ] OTP emails are delivered (check spam folder)
- [ ] Use a real SMTP plugin in production (not `wp_mail()` default)
- [ ] Test with a non-dev email address

> **Dev environment:** Use Mailpit (`http://yourserver:8025/`) to catch all emails without real delivery.

## Template Gallery

1. Visit the templates page
2. Verify all active templates display with thumbnails
3. Test tag filters work correctly
4. Test search functionality
5. Click "Preview" on a template - verify the preview loads

## Performance

- [ ] Signup page loads in under 3 seconds
- [ ] Template gallery handles your template count smoothly
- [ ] Provisioning completes in a reasonable time (typically 10-30 seconds)

## Security

- [ ] HTTPS works on the main site
- [ ] HTTPS works on tenant subdomains
- [ ] Admin pages are not accessible to non-admins
- [ ] API keys are generated and stored securely (not exposed in frontend)
- [ ] `wp-config.php` is not publicly accessible

## Cleanup

After testing:

1. Delete test tenant sites created during testing (Tenancy → All Tenants → Delete)
2. Verify the test subscriptions are cleaned up
3. If using Polar sandbox for testing, switch to production API URL and create real products

## Production Readiness

| Item | Status |
|------|--------|
| Wildcard DNS configured | |
| Wildcard SSL active | |
| SMTP email configured | |
| Polar production keys (not sandbox) | |
| Backup strategy for main site | |
| Monitoring/uptime checks | |
| Terms of Service page created | |
| Privacy Policy page created | |

---

**Next:** [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains)
