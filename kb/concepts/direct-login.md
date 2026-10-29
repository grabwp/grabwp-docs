---
title: "Direct login to a tenant"
description: "How the dashboard icon logs you in to a tenant, the 30 minute window and why it can fail."
sidebar_label: "Direct login to a tenant"
sidebar_position: 7
tags: [plan-base, for-operator, for-cs]
last_verified_version: "Base 1.1.14"
last_verified_date: "2026-10-29"
---

**Short answer:** the dashboard icon on **Tenancy > All Tenants** opens the tenant's wp-admin without a password, using a signed link that works for 30 minutes. If the link is old, or the tenant has no administrator, you land on the login page instead.

## What it is

The main site builds a link with a `grabwp_token` and a `grabwp_hash`. The token is a timestamp signed with HMAC-SHA256. The tenant checks the signature and the age. The default window is 1800 seconds (30 minutes). It can be changed with the constant `GRABWP_TENANCY_TOKEN_TTL`.

## Why it matters

When the check fails, the tenant sends you to `wp-login.php?grabwp_token_error=1`. This looks like "the icon does not work" but the cause is in the link or in the tenant.

## How to check

The three messages the tenant can give:

| Message | It means |
|---|---|
| `Invalid or expired admin access token.` | The link is older than 30 minutes, or its signature does not match. |
| `Tenant identification failed.` | Not explained here. Send the details listed in [What to send when you ask for help](/kb/start-here/getting-help). |
| `No admin user found for tenant access.` | The tenant has no administrator to log in as. |

1. Refresh **Tenancy > All Tenants** to get a new link, then click the icon again.
2. If it still fails, open **Tenancy > Status** and look for warnings.

## What to do

Use a fresh link first. If the message persists on every attempt, read [Tenant dashboard icon sends me to the login page](/kb/troubleshooting/tenant-dashboard-login-fails). Treat a login link like a password and do not share it.

## Limits and versions

Base 1.1.14. Works with Base. The window is 30 minutes in Base 1.1.14.

## Related

- [Creating tenants](/grabwp-tenancy/creating-tenants)
- [Glossary: sites and data](/kb/glossary/sites-and-data)
