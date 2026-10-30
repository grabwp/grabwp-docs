---
title: "Scheduled jobs and WP-Cron"
description: "Which timed jobs GrabWP runs, what Disable WP-Cron really turns off, and when you need a server cron job."
sidebar_label: "Scheduled jobs"
tags: [server, backup, subscriptions, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** GrabWP's own timed jobs (backups, renewals, signup retries) run from your main site's WP-Cron, which fires when someone visits the main site. **Disable WP-Cron** only turns the scheduler off on your sites, not on the main site. For reliable timing, add a server cron job.

**Needs:** Free (the setting). Pro and WaaS add the jobs listed below.

## How it works

WP-Cron is WordPress's built-in scheduler. It does not run on a clock. It checks for due jobs when a page loads, so on a quiet site jobs can run late.

There are two places it matters:

- **Main site.** Every GrabWP job is scheduled here. It runs on main-site traffic unless your `wp-config.php` turns WP-Cron off.
- **Your sites.** **Tenancy > Settings > Performance & Security > Disable WP-Cron** is on by default. Its help text says: `Turns off the built-in task scheduler on tenant sites. Run a server cron job instead.` WordPress tasks inside a site (scheduled posts, plugin tasks) then wait for a server cron job.

## Jobs GrabWP runs

All of these run on the main site.

| Job | How often | Needs |
|---|---|---|
| Auto backup of a site | The schedule you chose | Pro |
| Continue copying media after a clone | Once, until done | Pro |
| Check for expired subscriptions | Daily | Pro + WaaS |
| Create renewal invoices | Twice daily | Pro + WaaS |
| Sync Polar subscriptions | Twice daily | Pro + WaaS |
| Reconcile subscriptions with the payment provider | Twice daily | Pro + WaaS |
| Retry stuck signups | Hourly | Pro + WaaS |
| Refresh storage usage | Daily | Pro + WaaS |
| Delete old activity log entries | Daily | Pro + WaaS |
| Remove stale pending admin accounts | Daily | Pro + WaaS |
| Suspend a site after its grace period | Once, when due | Pro + WaaS |

If these do not run, backups are skipped, subscriptions do not expire on time, renewal invoices and emails are late, and stuck signups are not retried.

:::info If you sell sites
Renewals, reminders and suspensions all depend on these jobs. On a quiet main site they can run hours late. Add a server cron job before you take real payments. See [Emails or renewals not running](/help/emails-or-renewals-not-running).
:::

## Check your setup

1. Open **Tenancy > Pro Settings** and the **Backup** tab. Under **Schedule Assurance**, **WP-Cron Status** shows **Active (WordPress pseudo-cron)** or **Disabled (system cron required)**. **Next Scheduled Backup** shows when the next backup is due.
2. Open **Tenancy > Settings > Performance & Security** and check **Disable WP-Cron** for your sites.
3. Ask your host whether a cron job already calls the main site.

## Add a server cron job

Most hosting panels have a Cron Jobs screen. Add a job that runs every minute for the main site. With WP-CLI, this is the line the **Backup** tab shows under **System Cron Setup** when WP-Cron is off on the main site:

```bash
* * * * * cd /path/to/wordpress && php wp-cli.phar cron event run --due-now > /dev/null 2>&1
```

Change `/path/to/wordpress` to your WordPress folder. If WP-CLI is installed as `wp`, use `wp cron event run --due-now` instead.

Without WP-CLI, call the main site's `wp-cron.php` over the web, for example:

```bash
* * * * * curl -s https://example.com/wp-cron.php > /dev/null 2>&1
```

If your sites need their own scheduled posts or plugin tasks, either call each site's `wp-cron.php` the same way, or turn **Disable WP-Cron** off.

**Check:** wait a few minutes, then reload the **Backup** tab. **Next Scheduled Backup** should move forward after a backup runs.

## Limits

- Email jobs also need working email delivery on the main site.
- Times are not exact. A daily job runs roughly once a day, at the first cron run after it is due.

## Related

- [Backup and restore](/manage-sites/backup-and-restore)
- [Free settings](/manage-sites/free-settings)
- [Pro settings](/manage-sites/pro-settings)
- [WP-CLI commands](/manage-sites/wp-cli)
- [Emails or renewals not running](/help/emails-or-renewals-not-running)
