---
title: "Tenant Cloning"
description: "Copy a tenant or the main site into another tenant"
order: 15
section: pro
---

# Tenant Cloning

Clone copies a source tenant's database, extensions, and uploads into a target tenant, then updates site URLs. You can clone into a tenant that already exists, or create the target as part of the clone.

The target's current data is replaced.

## Open Clone

**Navigate to Tenancy → All Tenants**, then **Clone Tenant** on the source row (`page=grabwp-tenancy-pro-clone`).

On the starred **Main Site** row the action is **Clone to Tenant**. The page title is then **Clone Main Site**. For any other source the title is **Clone Tenant:** plus the tenant ID.

![Clone Tenant](../images/grabwp-tenancy-pro-tenant-clone.png)

The page shows **Source database type:** **Shared MySQL**, **Isolated MySQL**, or **Isolated SQLite**.

Under **Choose clone target:**

| Choice | What happens |
|--------|----------------|
| Clone to existing site | Pick **Target Tenant**. The list loads eligible tenants. Empty state: **No eligible tenants found**. |
| Clone to new site | Continues to **Add New Tenant**. The notice says you will be redirected to clone the source into the new tenant. The button is **Create Tenant & Clone**. |

For an existing target, the summary shows **Tenant ID**, **Domains**, **Database Type**, and **Uploads**.

> **Warning:** **This will overwrite all data in the target tenant (database, uploads, extensions). This action cannot be undone.**

Click **Clone Tenant**. Confirm **Are you sure? All data in the target tenant will be overwritten.**

Keep the browser tab open. Steps:

| Step | What happens |
|------|----------------|
| 1. Validating source & target tenants | Checks both sides |
| 2. Exporting source database | Exports the source database |
| 3. Importing database into target tenant | Imports into the target, including across database types |
| 4. Symlinking extensions | Links plugins and themes when isolation allows it |
| 5. Updating site URLs | Rewrites stored URLs to the target |
| 6. Copying uploads | Copies uploads (converted if the storage driver differs) |
| 7. Cleaning up | Removes temporary files |

Success: **Clone complete!** and **The source tenant data has been cloned into the target tenant.** Links: **Edit tenant**, **Homepage**, **Dashboard**.

**Cancel** or **Back to Tenants** leaves without cloning.

## After cloning

- Open **Homepage** and confirm the theme, plugins, and content.
- If media URLs still point at the source domain, open **Fix URLs** on the target. See [Fix URLs](/grabwp-tenancy-pro/pro-fix-urls).
- The target keeps its own database. Later edits on one site do not change the other.

**Verify:** The target row on **All Tenants** still has its own tenant ID and domain, and **Homepage** shows the cloned content.
