---
title: "Signup stops or shows an error"
description: "What signup validation errors mean, which site names are reserved, and how to retry a stuck provisioning job."
sidebar_label: "Signup or provisioning problems"
sidebar_position: 6
tags: [troubleshooting, subscriptions, plan-waas, for-customer, for-operator, for-cs]
last_verified_version: "WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** signup errors happen either before checkout (when a site name is reserved or already taken) or after checkout while the site is being built. Check **Waas > Settings > Provisioning** in wp-admin to see the job state, read the **Last Error** column and click **Retry**.

## Symptom

During signup, the customer sees one of these form messages:

- `Name is required.`
- `Valid email is required.`
- `Please choose a template to get started.`
- `Please choose an available template.`
- `This template is not available for the selected plan. Please choose a different template or upgrade your plan.`
- `Please choose an available plan.`
- `This site name is reserved. Please choose another.`
- `This site name is already taken. Please try another.`
- `This site name is temporarily reserved by another checkout. Please try another.`

Or after checkout, the provisioning screen stays on the setup progress bar and does not finish creating the site.

## Cause

| If you see | It means |
|---|---|
| `This site name is reserved. Please choose another.` | The chosen name is on the reserved list: `www`, `mail`, `admin`, `api`, `cdn`, `ftp`, `smtp`, `imap`, `pop`, `ns1`, `ns2`, `dns`, `cpanel`, `webmail`, `app`. |
| `This site name is already taken. Please try another.` | An existing tenant already uses this site name or subdomain. |
| `This site name is temporarily reserved by another checkout. Please try another.` | Another signup intent started with the same site name within the last 2 hours (`RESERVATION_TTL`). |
| `This template is not available for the selected plan. Please choose a different template or upgrade your plan.` | The selected starter template is restricted from the customer's chosen plan. |
| Provisioning stays on `clone_running` or `failed_retriable` | The background clone or tenant creation step hit a server timeout, database error or dead cron runner. |
| Provisioning state is `failed_terminal` | The job failed after reaching the maximum automatic retry limit of 12 (`MAX_RETRIES`), or an admin dismissed it. |

## Check

1. In the main site admin, go to **Waas > Settings** and open the **Provisioning** tab.
2. Find the customer's signup row in the **Provisioning Intents** table and check the **State**, **Clone Progress** (for example `5 / 7`), **Last Error** and **Retries** columns.
3. Hover over the text in **Last Error** to read the full error message if it is shortened.
4. If the customer could not pass the signup form because a name was held by an abandoned checkout, check whether an older `checkout_pending` row exists in **Waas > Settings > Provisioning**.

## Fix

### If a site name is reserved or held by an abandoned checkout

1. If the name is in the reserved list (`www`, `mail`, `admin`, `api`, `cdn`, `ftp`, `smtp`, `imap`, `pop`, `ns1`, `ns2`, `dns`, `cpanel`, `webmail`, `app`), ask the customer to pick a different site name.
2. If the customer abandoned an earlier checkout and sees `This site name is temporarily reserved by another checkout. Please try another.`, wait for the 2 hour reservation to expire, or go to **Waas > Settings > Provisioning** and click the **Dismiss** icon on the abandoned `checkout_pending` intent row.

### If provisioning is stuck after checkout

1. Go to **Waas > Settings > Provisioning**.
2. On a row in `failed_retriable` or `clone_running` state, click the **Retry** icon under **Actions**. You will see the notice `Intent re-queued for retry.`.
3. Ensure a server cron job is calling `wp-cron.php` so the background runner (`grabwp_waas_resume_provisioning_intent`) and the hourly stale-job scanner (`grabwp_waas_scan_stale_intents`) execute. See [Emails or renewal checks do not run](/kb/troubleshooting/emails-or-renewals-not-running).

For more on the signup lifecycle, see [How a signup becomes a site](/kb/concepts/how-signup-builds-a-site) and [WaaS troubleshooting](/grabwp-tenancy-waas/waas-troubleshooting).

## Still stuck

If clicking **Retry** fails again with the same text in **Last Error**, copy the **Intent ID**, **State**, **Clone Progress** and full **Last Error** text, then follow [What to send when you ask for help](/kb/start-here/getting-help).
