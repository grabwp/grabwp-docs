---
title: "Getting Started"
description: "Set up your first tenant site in minutes"
order: 2
section: base
---

# Getting Started

## Requirements

- WordPress 5.0 or later
- PHP 7.4 or later
- WordPress admin access

## Step 1: Install the Plugin

1. Go to **Plugins → Add New** in your WordPress admin
2. Search for **GrabWP Tenancy**
3. Click **Install Now**, then **Activate**

The plugin automatically sets up everything it needs on activation — no manual file editing required.

> **Tip:** After activation, go to **GrabWP Tenancy → Status** to confirm all components are installed correctly. If anything shows a warning, click **Auto Fix**.

## Step 2: Create Your First Tenant Site

1. Go to **GrabWP Tenancy → Tenants**
2. Click **Add New**
3. Choose whether to enter a domain now or set it up later
4. Click **Create**

The plugin assigns a unique 6-character ID (e.g., `abc123`) and creates the site's database tables and upload folder automatically.

## Step 3: Access Your New Site

You have two ways to reach a tenant site:

### Option A — Path Routing (no DNS needed)

Access the site immediately using the path URL:

```
https://yoursite.com/site/{tenant-id}
```

Example: `https://yoursite.com/site/abc123`

No domain setup, no DNS changes needed. Works right away on Apache/LiteSpeed. For Nginx, see the [Domain & DNS Setup guide](/grabwp-tenancy/hosting-dns-setup).

### Option B — Custom Domain

Point a separate domain (e.g., `client1.com`) to the tenant site. Requires hosting + DNS configuration.

→ [Domain & DNS Setup guide](/grabwp-tenancy/hosting-dns-setup)

## Step 4: Access Tenant Admin

In the tenant list (**GrabWP Tenancy → Tenants**), each row has action icons. Click the **Admin icon** (dashboard) to open the tenant's WordPress admin. For domain-based tenants, a secure token is embedded automatically so you're logged in immediately.
