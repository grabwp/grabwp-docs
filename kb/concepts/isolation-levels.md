---
title: "Isolation levels"
description: "Shared, Simple, Advanced and Custom: what each gives a new tenant."
sidebar_label: "Isolation levels"
sidebar_position: 5
tags: [isolation, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** the isolation level decides whether a new tenant has its own uploads, plugins and themes. A fresh install starts at **Simple**: own uploads, shared plugins and themes. The level applies to new sites only.

## What it is

The setting is **Level of isolation for new sites** on **Tenancy > Pro Settings > Isolation**. The four choices:

| Choice | Own uploads | Own plugins | Own themes |
|---|---|---|---|
| **Shared** | no | no | no |
| **Simple** | yes | no | no |
| **Advanced** | yes | yes | yes |
| **Custom** | your choice | your choice | your choice |

**Custom** has three switches: **Give each new site its own themes**, **Give each new site its own plugins** and **Give each new site its own uploads folder**. The defaults are themes off, plugins off and uploads on. A tenant with its own themes always gets its own `wp-content` folder.

## Why it matters

- With own plugins and themes, a tenant can run different versions and you can manage them per tenant. The default install method is a symlink, which links to the main site's files instead of copying them. See [Install method](/kb/glossary/sites-and-data#install-method-symlink-or-copy).
- Isolated sites start without themes. The page says: `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.`
- Changing the level does not change tenants that already exist.

## How to check

Open **Tenancy > Pro Settings > Isolation**. For a single tenant, open **Tenancy > All Tenants** and use the row action **Plugins & Themes**.

## What to do

Choose the level before you create tenants. After creating an isolated site, add a theme on its **Extensions** tab. See [Extensions](/grabwp-tenancy-pro/pro-extensions).

## Limits and versions

- Needs Pro.
- Tenants cannot install plugins or themes unless the operator allows it. See [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins).
- The defaults changed in Pro 1.1.16 and 1.1.17. Read [Pro settings](/kb/reference/pro-settings) for the current values.

## Related

- [Database options](/kb/concepts/database-options)
- [Glossary: sites and data](/kb/glossary/sites-and-data#isolation-level)
