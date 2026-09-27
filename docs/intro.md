---
title: "Overview"
description: "Run multiple WordPress sites from one installation"
order: 1
section: tenancy
slug: /
---

# GrabWP Tenancy - Overview

GrabWP Tenancy lets you run multiple separate WordPress websites from a single WordPress installation. Each site gets its own domain, content, users, and settings, isolated from the others.

Visitors reach a tenant site on its own domain (for example `client1.com`). The plugin matches that domain and loads that site's data from the same WordPress files on your server.

## What you get (free)

- **Multiple sites, one install**: no separate WordPress installation per site
- **Custom domain per site**: map one or more domains to each tenant
- **Isolated content**: posts, pages, media, and users stay separate per site
- **Shared database**: all sites share one MySQL database, each with its own table prefix
- **Shared themes and plugins**: every tenant uses the themes and plugins installed on the main site
- **One admin menu**: manage every tenant from **Tenancy** in wp-admin
- **Admin access**: open a tenant's WordPress admin from the tenant list

## Who it is for

- **Agencies** managing client websites from one server
- **SaaS builders** who need a separate site per customer
- **Developers** running more than one site from one install
- **Multi-brand businesses** with a site per brand

## Free vs Pro

| Feature | Free | Pro |
|---------|:----:|:---:|
| Multiple sites from one install | ✓ | ✓ |
| Custom domain per site | ✓ | ✓ |
| Isolated uploads per site | ✓ | ✓ |
| Shared MySQL database | ✓ | ✓ |
| Admin access from the tenant list | ✓ | ✓ |
| Dedicated database per site (MySQL or SQLite) | - | ✓ |
| Per-site plugins and themes | - | ✓ |
| Content, plugins, and uploads isolation | - | ✓ |
| Backup and restore per site | - | ✓ |
| Scheduled backups | - | ✓ |
| Tenant cloning | - | ✓ |
| Fix URLs | - | ✓ |
| S3-compatible storage and backup offload | - | ✓ |
| Domain symlink | - | ✓ |

→ [Learn about Pro](/grabwp-tenancy-pro/pro-overview)

→ [Getting started](/grabwp-tenancy/quick-start)
