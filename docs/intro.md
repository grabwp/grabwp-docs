---
title: "Overview"
description: "Run multiple WordPress sites from one installation"
order: 1
section: base
slug: /
---

# GrabWP Tenancy - Overview

GrabWP Tenancy lets you run multiple separate WordPress websites from a single WordPress installation. Each site gets its own domain, content, users, and settings - fully isolated from the others.

## What You Get (Free)

- **Multiple sites, one install** - no separate WordPress installations needed
- **Flexible routing** - domain-based, path-based (`/site/{id}`), or query-string (`?site={id}`)
- **Isolated content** - posts, pages, media, and users are separate per site
- **Shared database** - all sites share one MySQL database with unique table prefixes
- **Admin dashboard** - manage all tenant sites from one place
- **One-click access** - generate secure tokens to log into any tenant site instantly

## How It Works

When a visitor goes to `client1.com`, the plugin detects the domain and loads the correct site's data from the database - all from the same WordPress files on your server.

## Who Is It For?

- **Agencies** managing multiple client websites from one server
- **SaaS builders** who need per-user isolated sites
- **Developers** running dev / staging / production from one install
- **Multi-brand businesses** with separate sites per brand

## Free vs Pro

| Feature | Free | Pro |
|---------|:----:|:---:|
| Multiple sites from one install | ✓ | ✓ |
| Domain / path / query-string routing | ✓ | ✓ |
| Isolated uploads per site | ✓ | ✓ |
| Shared MySQL database | ✓ | ✓ |
| Admin access tokens | ✓ | ✓ |
| Per-site dedicated database (MySQL or SQLite) | - | ✓ |
| Per-site plugins & themes | - | ✓ |
| Content isolation controls | - | ✓ |
| Backup & restore per site | - | ✓ |
| Tenant cloning | - | ✓ |
| Domain symlink management | - | ✓ |

→ [Learn about Pro features](/grabwp-tenancy-pro/pro-overview)
