---
title: "What to send when you ask for help"
description: "The facts support needs to answer quickly: versions, Status page, web server and the exact error text."
sidebar_label: "What to send when you ask for help"
sidebar_position: 4
tags: [troubleshooting, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** send the exact text you see, the versions of the GrabWP plugins, what the **Status** page shows, and your web server. With these, support can usually name the cause in one reply.

## What it is

A list of the five facts that turn "it does not work" into something support can act on.

## Why it matters

The same symptom can have different causes. A login that fails on one host can be a server cache issue, and on another a missing `wp-config.php` block. The facts below tell them apart.

## How to check

Collect these:

1. **The exact text.** Copy the notice or error into your message. Do not retype it. A screenshot of the full page also helps.
2. **Plugin versions.** In wp-admin open **Plugins** and note the version of each GrabWP plugin (Base, Pro, WaaS, add-ons).
3. **Status page.** Open **Tenancy > Status**. Send what each tab shows (**Plugin General**, **Base Plugin**, **Pro Plugin**), especially any warning row.
4. **Web server.** Apache, LiteSpeed or Nginx, and the hosting panel if you use one. The **Plugin General** tab names the server.
5. **What you did just before.** For example "changed isolation level" or "added a domain".

For a tenant problem, also send the tenant's URL and whether it uses a path or a domain.

## What to do

Send the facts in one message. Never send passwords, API keys, license keys or payment secrets. If a tool asks for a license key, enter it on the **License** page yourself.

## Limits and versions

Where to send the message depends on your plan and who runs your platform. The free plugin has a support forum on WordPress.org. This KB does not list other contact routes.

## Related

- [Troubleshooting](/kb/troubleshooting)
- [Troubleshooting guide for Base](/grabwp-tenancy/troubleshooting)
- [Notices and error messages](/kb/reference/admin-notices-and-errors)
