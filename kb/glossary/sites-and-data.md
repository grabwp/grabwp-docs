---
title: "Glossary: sites and data"
description: "Plain meaning of the terms about sites, databases and folders."
sidebar_label: "Sites and data"
sidebar_position: 1
tags: [glossary, database, isolation, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** this page explains the words used for tenant sites, where their data lives, which database they use and how much they are kept apart from the main site.

## Broken symlinks

**Plain meaning:** a tenant's plugin or theme link that points to a folder that is gone.
**Where you see it:** **Tenancy > Pro Settings > Symlink**, button **Fix All Tenant Broken Symlinks**.
**Why it matters:** a broken link makes a tenant plugin or theme disappear or fail.
**More:** [Install method](#install-method-symlink-or-copy) | [Extensions guide](/grabwp-tenancy-pro/pro-extensions)

## Data directory

**Plain meaning:** the folder where GrabWP keeps tenant files and its own settings files. The default is `wp-content/grabwp-tenancy`.
**Where you see it:** **Tenancy > Status**. Tenant uploads are in `{base}/{tenant_id}/uploads`, where `{base}` is this folder.
**Why it matters:** if it is missing or not writable, tenants cannot be created. Older locations `wp-content/grabwp` and `wp-content/uploads/grabwp-tenancy` are still read, and **Status** warns when data is inside `uploads`.
**More:** [Where tenant data lives](/kb/concepts/where-tenant-data-lives) | [Installation guide](/grabwp-tenancy/installation-guide)

## Extensions

**Plain meaning:** the plugins and themes of one tenant.
**Where you see it:** the **Extensions** tab of a tenant, reached from the row action **Plugins & Themes** on **Tenancy > All Tenants**. Needs Pro.
**Why it matters:** this is where you give a tenant its own plugins and themes.
**More:** [Isolation levels](/kb/concepts/isolation-levels) | [Extensions guide](/grabwp-tenancy-pro/pro-extensions)

## Install method (symlink or copy)

**Plain meaning:** how a tenant gets a plugin or theme from the main site. A symlink is a link to the same files. A copy is a separate set of files. The default is symlink.
**Where you see it:** **Tenancy > Pro Settings**.
**Why it matters:** a symlink saves disk space and follows updates on the main site. A copy is independent.
**More:** [Isolation levels](/kb/concepts/isolation-levels) | [Extensions guide](/grabwp-tenancy-pro/pro-extensions)

## Isolated MySQL

**Plain meaning:** a tenant has its own MySQL database. Shown as **Isolated MySQL Database**. Needs Pro.
**Where you see it:** **Tenancy > Pro Settings > Database**, field **Database Type**.
**Why it matters:** you enter MySQL details (host, database, username, password) for it, and the MySQL user must be allowed to use that database.
**More:** [Database options](/kb/concepts/database-options) | [Database isolation guide](/grabwp-tenancy-pro/pro-database-isolation)

## Isolated SQLite

**Plain meaning:** a tenant has its own SQLite database file. Shown as **Isolated SQLite Database**. Needs Pro and the PHP extension `pdo_sqlite`.
**Where you see it:** **Tenancy > Pro Settings > Database**, field **Database Type**.
**Why it matters:** it is the default when `pdo_sqlite` exists. Without `pdo_sqlite`, new installs default to the shared database.
**More:** [Database options](/kb/concepts/database-options)

## Isolation level

**Plain meaning:** how much of a new tenant is kept apart from the main site. The four choices are **Shared**, **Simple**, **Advanced** and **Custom**.
**Where you see it:** **Tenancy > Pro Settings > Isolation**, field **Level of isolation for new sites**.
**Why it matters:** it decides whether a tenant has its own uploads, plugins and themes. It applies to new sites only.
**More:** [Isolation levels](/kb/concepts/isolation-levels)

## Main site

**Plain meaning:** the WordPress site where the GrabWP plugins are installed.
**Where you see it:** it is the site you log in to at your normal domain.
**Why it matters:** tenants run on the main site's install, so its PHP version, plugins and server settings affect them.
**More:** [What GrabWP is](/kb/start-here/what-is-grabwp)

## settings.php

**Plain meaning:** the file where Base saves its settings, at `{base}/settings.php`.
**Where you see it:** values from **Tenancy > Settings** are stored here.
**Why it matters:** the file must be writable, or settings cannot be saved.
**More:** [Base settings](/kb/reference/base-settings)

## Shared database

**Plain meaning:** all tenants use the same database as the main site. Each tenant's tables have its own prefix. Shown as **Shared Database (with table prefixes)**.
**Where you see it:** **Tenancy > Pro Settings > Database**. Base always works this way.
**Why it matters:** it needs no extra setup, but all sites share one database.
**More:** [Database options](/kb/concepts/database-options)

## Table prefix

**Plain meaning:** the start of every table name for a tenant. In Base it is the tenant ID followed by an underscore, for example `abc123_posts`.
**Where you see it:** in the database, for example with phpMyAdmin.
**Why it matters:** it keeps one tenant's tables apart from another's in a shared database.
**More:** [Tenant ID](#tenant-id) | [Database options](/kb/concepts/database-options)

## Tenant

**Plain meaning:** one separate site served by the same WordPress install.
**Where you see it:** **Tenancy > All Tenants**.
**Why it matters:** a tenant has its own content and uploads, and can have its own database, plugins and themes with Pro.
**More:** [What a tenant is](/kb/concepts/tenant) | [Creating tenants](/grabwp-tenancy/creating-tenants)

## Tenant ID

**Plain meaning:** the name GrabWP gives a tenant: exactly 6 characters, lowercase letters and digits, for example `abc123`.
**Where you see it:** **Tenancy > All Tenants** and in the tenant's path URL.
**Why it matters:** some words are reserved and cannot be used, such as `admin1`, `test01`, `public`, `system`, `config` and `backup`. A readable [path alias](/kb/glossary/urls-and-domains#path-alias) can stand in for it in URLs.
**More:** [What a tenant is](/kb/concepts/tenant)

## tenants.php

**Plain meaning:** the file that maps tenants to domains and stores the routing mode, at `{base}/tenants.php`.
**Where you see it:** it is written by GrabWP when you create or change a tenant.
**Why it matters:** if GrabWP cannot read it you see `Could not read tenants.php, so nothing was changed. Check the file and its permissions.`
**More:** [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant)
