---
title: "Where tenant data lives"
description: "The data directory, tenant uploads and the older locations GrabWP still reads."
sidebar_label: "Where tenant data lives"
sidebar_position: 3
tags: [server, plan-base, for-operator]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP keeps tenant files in one data folder, by default `wp-content/grabwp-tenancy`. Each tenant's uploads are in a subfolder named after its ID. The **Status** page warns when the data is in an older location.

## What it is

The folder is called the [data directory](/kb/glossary/sites-and-data#data-directory). Inside it:

- `tenants.php` maps tenants to domains and stores the routing mode.
- `settings.php` holds Base settings.
- `{tenant_id}/uploads` holds the uploads of one tenant.
- `suspended/{tenant_id}.php` exists while WaaS has blocked a tenant.

GrabWP still reads two older locations: `wp-content/grabwp` and `wp-content/uploads/grabwp-tenancy`.

## Why it matters

If the folder is missing or not writable, tenants cannot be created and settings cannot be saved. Data inside `uploads` is easy to lose or expose by accident, so the **Status** page warns about it.

## How to check

Open **Tenancy > Status**. Look for the data directory rows and for these warnings:

- `Data directory is missing.`
- `Data directory inside uploads/`
- `Pro config directory inside uploads/`
- `SQLite directory inside uploads/`
- `You're using a legacy path structure. To comply with WordPress standards:` followed by three steps: deactivate the plugin, rename and move the whole folder, reactivate the plugin.

## What to do

Follow the steps shown on the **Status** page to move an older folder. Do not move it while the plugin is active. See the [Installation guide](/grabwp-tenancy/installation-guide).

## Limits and versions

- A fresh install uses `wp-content/grabwp-tenancy`.
- With Pro and S3 storage, uploads can be kept in remote storage. See [Pro settings](/kb/reference/pro-settings).

## Related

- [MU-plugin or data directory notices](/kb/troubleshooting/mu-plugin-or-data-directory-notice)
- [What GrabWP changes on your server](/kb/concepts/what-grabwp-changes-on-your-server)
