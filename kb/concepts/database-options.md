---
title: "Database options"
description: "Shared, isolated MySQL and isolated SQLite: what each means and what it needs."
sidebar_label: "Database options"
sidebar_position: 4
tags: [database, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** Base puts every tenant in the shared database with its own table prefix. Pro adds two choices: **Isolated MySQL Database** and **Isolated SQLite Database**. SQLite is the default when the PHP extension `pdo_sqlite` exists.

## What it is

| Choice | Label in wp-admin | What it means | Needs |
|---|---|---|---|
| Shared | **Shared Database (with table prefixes)** | Tenant tables sit in the main database. The prefix is the tenant ID plus an underscore, for example `abc123_posts`. | Base |
| MySQL | **Isolated MySQL Database** | The tenant has its own MySQL database. | Pro, MySQL details per tenant |
| SQLite | **Isolated SQLite Database** | The tenant has its own SQLite file. | Pro, PHP `pdo_sqlite` |

## Why it matters

A shared database is the simplest, but all tenants live together. An isolated database keeps one tenant's data apart from the others. Without `pdo_sqlite`, new installs default to the shared database.

## How to check

Open **Tenancy > Pro Settings > Database**. **Database Type** shows the default for new sites. For MySQL, the section **Default MySQL Connection** has **MySQL Host**, **MySQL Database** and **MySQL Username**. MySQL details are set per tenant.

## What to do

Choose the type before you create tenants. For MySQL, prepare a MySQL user that is allowed to use the database you enter. Follow [Database isolation](/grabwp-tenancy-pro/pro-database-isolation).

## Limits and versions

- Needs Pro. Base 1.1.14 supports only the shared database.
- If a stored MySQL password cannot be read, the page says `The Isolated MySQL password is not available any more.` Enter the password again.
- Creating the MySQL database automatically for each tenant is not available yet.

## Related

- [Isolation levels](/kb/concepts/isolation-levels)
- [Glossary: sites and data](/kb/glossary/sites-and-data)
- [Hosting requirements](/kb/choose/hosting-requirements)
