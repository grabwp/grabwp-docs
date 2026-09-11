---
title: "Per-Site Plugins & Themes"
description: "Manage plugins and themes independently per tenant site"
order: 13
section: pro
---

# Per-Site Plugins & Themes

With Pro, each tenant site can have its own set of plugins and themes - separate from your main site and from each other.

## Before You Start

Plugins and themes isolation must be enabled for the site first:

1. Go to **GrabWP Tenancy → Tenants → Edit** the site
2. Under the Pro isolation fields, enable **Plugins Isolation** and/or **Content + Themes Isolation**
3. Save

Once enabled, the **Extensions** link appears in the tenant's row in the tenant list.

## Managing Extensions for a Site

1. Go to **GrabWP Tenancy → Tenants**
2. Find the site and click the **Extensions** row action link
3. You'll see all plugins and themes available from your main installation

![Extensions - install method and installable plugins](../images/grabwp-tenancy-pro-tenant-extension.png)

### Making a Plugin Available to a Site

1. Find the plugin in the list
2. Click **Install** - it's installed into the tenant site's directory (copied or symlinked, based on the Install Method setting)
3. The tenant admin can then activate it from their own Plugins page

### Removing a Plugin from a Site

1. Find the plugin in the list
2. Click **Remove** - it's removed from the tenant site's directory

## Installation Methods

At the top of the Extensions page, you can set the **Install Method** for the site:

| Method | How it works | When to use |
|--------|-------------|-------------|
| **Symlink** | A symlink points to the main site's plugin files | Saves disk space; plugin updates on the main site apply automatically |
| **Own Copy** | Plugin files are copied into the tenant's directory | Tenant needs fully independent files |

Changing the method and saving reconverts all installed extensions automatically.
