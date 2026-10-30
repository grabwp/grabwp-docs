---
title: "Your first site"
description: "Create your first client site with GrabWP, open its wp-admin in one click and check that everything works."
sidebar_label: "Your first site"
tags: [routing, server, plan-base, for-operator]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-30"
---

**Short answer:** open **Tenancy > Add New**, leave the defaults and click **Create Tenant**. GrabWP creates a new WordPress site on the same install, with its own content and admin. Click **Open site admin (1-click)** to log in to it.

**Needs:** Free

## How it works

GrabWP runs many separate websites from one WordPress install. Each one is called a site, or a "tenant" on some GrabWP screens. A site has its own posts, pages, media, users and admin area. By default, sites share the plugins and themes of the main site, so you update them once.

## Step 1: check the server

Open **Tenancy > Status** and look at **Plugin General**. Fix any card that is not green with **Auto Fix**, or follow its fix steps. If you see a red notice at the top of wp-admin, fix it first. See [Install GrabWP](/manage-sites/install).

## Step 2: create the site

Open **Tenancy > Add New**.

![Add New Tenant](../images/grabwp-tenancy-pro-tenant-add.png)

1. Under **Domain Setup**, keep **I'll set up a domain later** if you do not have a domain ready. The screen shows the address the site will use, for example `example.com/site/` plus the site ID.
2. Or choose **I have a domain** and type it without `http://` or `www` (for example `client1.com`).
3. Leave **Install WordPress now** ticked.
4. Click **Create Tenant**.

The fields you see depend on the routing mode. In **Path** mode there is no domain field. In **Domain** mode a domain is required. See [Domains and DNS](/manage-sites/domains-and-dns).

GrabWP gives the site a 6 character ID, creates its database tables and upload folder, and installs WordPress. The new site gets an administrator named after the site ID with a random password.

:::tip
You never need that password. The 1-click **Admin** button logs you in. The password is shown once, so copy it only if you want a backup way in.
:::

With Pro, the form also has **Content Isolation Options**, **Database Configuration** and (once S3 is set up) **Storage Driver**. The defaults come from **Tenancy > Pro Settings**, so you can leave them as they are. See [Per-site plugins and themes](/manage-sites/plugins-and-themes) and [Database options](/manage-sites/database-options).

## Step 3: open the new site

After saving you see **Site created:** with the address, the **Username** and the **Password**. Click **Open site admin (1-click)**.

Later, open the site from **Tenancy > All Tenants**: find its row and click the **Admin** icon (dashboard icon). The login link works for 30 minutes. If it has expired, reload the list and click again. See [Log in to a client site](/manage-sites/direct-login).

![Tenant list](../images/grabwp-tenancy-pro-tenant-list.png)

If the screen says `The site was created but WordPress could not be installed automatically:`, your server cannot call its own address. Click **Finish install in browser** and complete the normal WordPress install.

## Step 4: check it works

- Click **Visit Site** on the row. You should see the new site, not the main site.
- If you used a domain, it must point to this server first. See [Domains and DNS](/manage-sites/domains-and-dns).

## First day checklist

Run this once before you build sites for clients.

1. Plugins are installed in order: GrabWP Tenancy, then Pro, then WaaS and add-ons if you use them.
2. No GrabWP notice shows at the top of wp-admin.
3. **Tenancy > Status > Plugin General** has no warning cards.
4. On Nginx, the routing rules are in your server block. See [Apache, LiteSpeed and Nginx](/help/web-server-guide).
5. One test site opens on its address and its admin opens with the **Admin** icon.
6. If you use Pro, your license shows as active on **Tenancy > License**.
7. If you rely on scheduled backups or sell sites, set up a server cron job. See [Scheduled jobs and server cron](/manage-sites/scheduled-jobs).

:::info If you sell sites
With WaaS, customers create their own sites from your signup page, so you rarely use **Add New** yourself. Follow [Set up WaaS](/sell-sites/set-up-waas) after this checklist.
:::

## Related

- [Create and manage sites](/manage-sites/create-and-manage-sites)
- [Where things are in wp-admin](/manage-sites/wp-admin-map)
- [Free settings](/manage-sites/free-settings)
- [What to send when you ask for help](/help/getting-help)
