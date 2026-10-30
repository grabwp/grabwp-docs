---
title: "Pro license"
description: "Activate, check or revoke your GrabWP Tenancy Pro license key, and what happens without one."
sidebar_label: "Pro license"
tags: [license, plan-pro, for-operator, for-cs]
last_verified_version: "Pro 1.1.17"
last_verified_date: "2026-10-30"
---

**Short answer:** paste your `GRABWPPRO-` key on **Tenancy > License** and click **Activate License**. While Pro is active without a valid license, you cannot create or edit sites and Pro updates are not offered.

**Needs:** Pro

## How it works

The license ties your Pro copy to this WordPress install. Activation sends this site's domain and your key to GrabWP / Polar, the license service. After that, GrabWP checks the license about once a day. If the license service cannot be reached, nothing is blocked; it tries again later.

You can also activate the license in the **License** step of the setup wizard when you first install Pro. See [Install GrabWP](/manage-sites/install).

## Activate

1. Open **Tenancy > License**. The page title is **GrabWP Tenancy Pro License**.
2. Open the **Customer Portal** link on the page, sign in with your purchase email and copy your key. Keys begin with `GRABWPPRO-`.
3. Paste the key into **License key**.
4. Click **Activate License**. You should see `License activated.`

![GrabWP Tenancy Pro License](../images/10-license.png)

No key yet? The page links to [grabwp.com](https://grabwp.com/). See [Before you buy](/before-you-buy).

## Check your license

After activation the page shows:

| Field | What it shows |
|---|---|
| **Customer** | The name on the license. |
| **Email** | The email on the license. |
| **License key** | Your key, masked. The full key is never shown again. |
| **Status** | For example **Granted**. |
| **Expires** | The expiry date, or **No Expiry**. |

## Without a valid license

With Pro active but no valid license:

- Creating or editing a site stops with `Please activate your GrabWP Tenancy Pro license before managing tenants.` or `Your GrabWP Tenancy Pro license is invalid or expired. Please re-activate.`
- Pro updates are not offered. The **Plugins** screen asks you to activate to enable updates.

Your existing sites keep running.

## Move or revoke a license

1. On the old site, open **Tenancy > License** and click **Revoke license**.
2. Confirm `Revoke this license? Pro features will be disabled until you re-activate.` You should see `License revoked.`
3. Activate the key on the new site.

If the old site is gone, open the **Customer Portal**, remove the old activation there, then click **Activate License** on the new site.

## Limits

- Your server must be able to reach the license service over HTTPS. A firewall, or a `WP_HTTP_BLOCK_EXTERNAL` line in the main site's `wp-config.php`, can stop activation. **Block External Requests** in [Free settings](/manage-sites/free-settings) only affects your sites, not the main site, so it does not block the license.
- Keep your key private. Do not paste it in public posts or chats.

## Related

- [Pro license messages](/help/pro-license-messages)
- [Install GrabWP](/manage-sites/install)
- [Before you buy](/before-you-buy)
- [Pro settings](/manage-sites/pro-settings)
