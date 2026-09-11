---
title: "Managing Tenant Sites"
description: "Create, edit, and delete tenant sites"
order: 4
section: base
---

# Managing Tenant Sites

## Creating a New Site

1. Go to **GrabWP Tenancy → Tenants**
2. Click **Add New**
3. Choose **"I have a domain"** to enter a domain now, or **"I'll set up a domain later"** to use path routing immediately
4. Click **Create**

![Add New Tenant — domain now or later](../images/grabwp-tenancy-pro-tenant-add.png)

The system assigns a unique 6-character ID (e.g., `abc123`) and automatically creates its database tables and upload folder.

## Accessing a Tenant Site

After creation, find the site in the tenant list. Each row shows action icons:

![Tenant list with row actions (visit, admin, edit, delete)](../images/grabwp-tenancy-pro-tenant-list.png)

| Icon | Action |
|------|--------|
| Home | Visit the site (front end) |
| Dashboard | Open tenant's WordPress admin |
| Edit | Edit domain settings |
| Trash | Delete the site |

For domain-based tenants, clicking the **Dashboard icon** opens the tenant's admin with a secure token automatically embedded — no password needed. For path-only tenants, it opens the path-based admin URL directly.

## Accessing via Path URL

Every tenant site is accessible at its path URL — no domain required:

```
https://yoursite.com/site/{tenant-id}
```

The tenant ID is shown on the Edit page under **Path URL**.

## Editing a Tenant Site

Click the **Edit icon** to:
- View the path URL (with a copy button)
- Add or remove custom domains

![Edit tenant — path URL and domains](../images/grabwp-tenancy-pro-tenant-edit.png)

## Adding More Domains

A single site can respond to multiple domains (e.g., `www.site.com` and `site.com`):

1. Click **Edit** on the site
2. Add additional domains
3. Save — then configure the new domains in your hosting control panel too

## Deleting a Site

> ⚠ **Warning:** Deleting a site permanently removes all its data — database tables and uploads cannot be recovered.

1. Click the **Trash icon** on the site
2. A prompt will ask you to type the site's ID to confirm
3. Enter the ID exactly — deletion proceeds only if it matches

## Tenant Admin Notes

- To reset a tenant admin's password: use the "Forgot Password" link on the tenant site's login page
- If the tenant needs to manage their own plugin settings: they can activate the GrabWP Tenancy plugin from their own Plugins page
