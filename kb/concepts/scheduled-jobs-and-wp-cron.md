---
title: "Scheduled jobs and WP-Cron"
description: "Which timed jobs GrabWP runs, why Disable WP-Cron is on by default and what a server cron job must do."
sidebar_label: "Scheduled jobs and WP-Cron"
sidebar_position: 8
tags: [server, subscriptions, plan-base, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** WaaS and Pro run timed jobs such as renewal checks, invoices and backups through WP-Cron. Base turns on **Disable WP-Cron** by default for tenant sites, so you need a server cron job that calls `wp-cron.php`. Without it, timed jobs do not run.

## What it is

WP-Cron is WordPress's built-in scheduler. It runs when someone visits the site. Base's setting **Disable WP-Cron** is on by default and its help text says "Run a server cron job instead." A server cron job is a timer on the server that calls `wp-cron.php` on a schedule.

Jobs GrabWP schedules, in plain words:

| What it does | How often |
|---|---|
| Checks for expired subscriptions | daily |
| Creates renewal invoices | twice daily |
| Syncs Polar subscriptions | twice daily |
| Reconciles subscriptions with the provider | twice daily |
| Re-queues stuck signups (provisioning) | hourly |
| Refreshes storage usage | daily |
| Deletes old activity log entries | daily |
| Removes stale pending admin accounts | daily |
| Suspends a tenant after the grace period | once, when scheduled |
| Auto backup of a tenant (Pro) | the schedule you chose |
| Continues copying media after a Pro clone | once, when scheduled |

## Why it matters

If no cron job runs, subscriptions do not expire on time, renewal invoices and reminder emails are not created, stuck signups are not retried, and scheduled backups do not run.

## How to check

1. Open **Tenancy > Settings > Performance & Security** and read **Disable WP-Cron**.
2. Open **Tenancy > Pro Settings > Backup** and read the schedule notes for auto backup.
3. Ask your host whether a cron job calls `wp-cron.php` of the main site.

## What to do

Set up a server cron job for the main site, or turn **Disable WP-Cron** off if you cannot. Your host's panel usually has a Cron Jobs screen. See the [Installation guide](/grabwp-tenancy/installation-guide) and [Backup and restore](/grabwp-tenancy-pro/pro-backup-restore).

## Limits and versions

- Job names and times were read from WaaS 1.1.24 and Pro 1.1.17.
- Sending email also needs working email delivery. See [Emails or renewals not running](/kb/troubleshooting/emails-or-renewals-not-running).

## Related

- [Glossary: server and setup](/kb/glossary/server-and-setup#wp-cron)
- [Subscription lifecycle](/kb/concepts/subscription-lifecycle)
