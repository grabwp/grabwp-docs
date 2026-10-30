---
title: "WP-CLI commands"
description: "Every GrabWP WP-CLI command with its arguments, flags and one example."
sidebar_label: "WP-CLI commands"
tags: [reference, server, backup, plan-pro, plan-waas, for-operator]
last_verified_version: "Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** Pro adds `wp grabwp` commands to move media between disk and S3, fix addresses in a site's database and manage auto backups. WaaS adds one command to fill in missing subscription dates. Run them from your main WordPress folder.

**Needs:** Pro. The `waas` command needs Pro + WaaS.

## Before you start

- You need [WP-CLI](https://wp-cli.org/) on your server and shell access.
- Run every command from the main site's WordPress folder. A site is chosen by its ID, the name you see in **Tenancy > All Tenants**.
- The free plugin has no WP-CLI commands of its own.
- To list all commands on your server: `wp help grabwp`.

In the examples, `abc123` is a site ID. Replace it with yours.

## Storage

Move a site's uploads between your server's disk and S3 storage. S3 must be set up first. See [S3 storage](/manage-sites/s3-storage).

### wp grabwp storage migrate

```bash
wp grabwp storage migrate [<tenant_id>] --to=<local|s3> [--all] [--dry-run] [--copy-only]
```

| Argument or flag | What it does |
|---|---|
| `<tenant_id>` | The site to migrate. Leave it out when you use `--all`. |
| `--to=<local\|s3>` | Required. The target: `local` or `s3`. |
| `--all` | Migrate every site. Sites already on the target are skipped. |
| `--dry-run` | Show what would be copied. Nothing changes. |
| `--copy-only` | Copy the files and switch the site, but keep the original files. |

Without `--copy-only`, the original files are **deleted** after a successful copy. If any file fails to copy, the command stops, the site keeps its old storage and nothing is deleted.

Example:

```bash
wp grabwp storage migrate --all --to=s3 --dry-run
```

Common errors: `--to must be "local" or "s3".`, `S3 storage is not configured at platform level.`, `Pass either a tenant_id or --all, not both.`, `Provide a tenant_id or use --all.`

### wp grabwp storage fix-db

Re-run only the database part of a migration (media records and addresses) when the files were copied but the database update failed. It does not copy files.

```bash
wp grabwp storage fix-db <tenant_id> --driver=<local|s3> --from=<local|s3>
```

| Argument or flag | What it does |
|---|---|
| `<tenant_id>` | The site to fix. |
| `--driver=<local\|s3>` | Where the files are now. |
| `--from=<local\|s3>` | Where they were before. Must be different from `--driver`. |

Example:

```bash
wp grabwp storage fix-db abc123 --driver=s3 --from=local
```

The older name `wp grabwp-pro storage` still works and does the same thing. The **WP-CLI reference** box on **Tenancy > Pro Settings > Storage** shows that name.

## Addresses in a site's database

### wp grabwp tenant search-replace

The command line version of [Fix URLs](/manage-sites/fix-urls). It replaces an address everywhere in a site's database, including serialized data.

```bash
wp grabwp tenant search-replace [<tenant_id>] [--auto] [--search=<old>] [--replace=<new>] [--dry-run] [--all]
```

| Argument or flag | What it does |
|---|---|
| `<tenant_id>` | The site to fix. Leave it out when you use `--all`. |
| `--auto` | Compare the address stored in the database with the site's domain, and fix it if they differ. |
| `--search=<old>` | The text to find. Use with `--replace`. |
| `--replace=<new>` | The text to put in its place. Use with `--search`. |
| `--dry-run` | Show what would change. Nothing changes. |
| `--all` | Run on every site. With `--auto`, sites that have no real domain yet are skipped. |

Use either `--auto` or `--search` with `--replace`, not both.

Examples:

```bash
wp grabwp tenant search-replace --all --auto --dry-run
wp grabwp tenant search-replace abc123 --search=https://old.example.com --replace=https://new.example.com
```

Common errors: `--auto and --search/--replace are mutually exclusive.`, `--search and --replace must be used together.`, `Provide --auto or both --search and --replace.`, and a "not found in mappings" error when the site ID does not exist.

## Auto backups

These use the same settings as **Tenancy > Pro Settings > Backup** and the site's **Backup** tab. See [Backup and restore](/manage-sites/backup-and-restore).

### wp grabwp backup run

Back up one site now.

```bash
wp grabwp backup run <tenant_id> [--force]
```

| Argument or flag | What it does |
|---|---|
| `<tenant_id>` | The site to back up. |
| `--force` | Run even if auto backup is off or set to manual for this site. |

Example:

```bash
wp grabwp backup run abc123 --force
```

### wp grabwp backup schedule

Change one site's auto backup settings. Flags you leave out keep their current value. `inherit` means "use the global setting".

```bash
wp grabwp backup schedule <tenant_id> [--enabled=<state>] [--schedule=<schedule>] [--retain=<count>]
```

| Argument or flag | Values |
|---|---|
| `<tenant_id>` | The site to change. |
| `--enabled=<state>` | `inherit`, `enabled` or `disabled`. |
| `--schedule=<schedule>` | `inherit`, `manual`, `daily`, `weekly`, `fortnightly` or `monthly`. |
| `--retain=<count>` | Backups to keep, from `1` to `30`, or `inherit`. |

Example:

```bash
wp grabwp backup schedule abc123 --enabled=enabled --schedule=daily --retain=5
```

It prints the settings now in effect for the site (enabled, schedule and retain).

### wp grabwp backup show

Show a site's effective backup settings and its last 10 runs.

```bash
wp grabwp backup show <tenant_id>
```

Example:

```bash
wp grabwp backup show abc123
```

### wp grabwp backup reschedule-all

Re-create the backup timers for every site from the current settings. Use it if **Next Scheduled Backup** does not match what you set.

```bash
wp grabwp backup reschedule-all
```

## Subscriptions (WaaS)

### wp grabwp waas subscription backfill

Fill in the end of the current billing period for subscriptions that are missing it. Polar subscriptions are synced from Polar. Other active, warning or pending subscriptions get a date calculated from their own billing data.

```bash
wp grabwp waas subscription backfill
```

When it finishes, it prints how many Polar subscriptions were synced and how many others were filled. The older name `wp grabwp-waas subscription backfill` still works.

## Run WordPress jobs from a server cron

This is a standard WP-CLI command, not a GrabWP one. It runs due scheduled jobs on the main site, including GrabWP backups and WaaS renewals:

```bash
wp cron event run --due-now
```

See [Scheduled jobs and WP-Cron](/manage-sites/scheduled-jobs) for the full cron line.

## Related

- [S3 storage](/manage-sites/s3-storage)
- [Fix URLs](/manage-sites/fix-urls)
- [Backup and restore](/manage-sites/backup-and-restore)
- [Scheduled jobs and WP-Cron](/manage-sites/scheduled-jobs)
