---
title: "Managing Custom Domains"
description: "Verify custom domains, filter the Domains list, and connect Cloudflare SaaS or Direct IP"
order: 31
section: waas
---

# Managing Custom Domains

Custom domains let a tenant use its own hostname (for example `mybusiness.com`) in addition to the platform hostname (`customer.yoursaas.com`). Customers add aliases from the dashboard. You verify them on **Domains**.

**Navigate to Waas → Domains** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-domains`).

![Domains list](../images/waas-domains.png)

If **Domain Mode** is not set, the page shows: **Domain settings not configured. Go to WaaS Settings → General to set domain mode.** Hostnames under the configured **Platform Domain** are left off this list. Custom domains and aliases stay.

## Filters and columns

View links at the top:

| View | URL |
|------|-----|
| **All** | `page=grabwp-tenancy-waas-domains` |
| **Verified** | `dns_filter=verified` |
| **Pending** | `dns_filter=pending` |

![Pending domains](../images/03-waas-domains-pending.png)

![Verified domains](../images/03-waas-domains-verified.png)

**Verified** lists domains whose last check succeeded. **Pending** lists domains that were checked and did not pass. Domains that have never been checked stay on **All** with status **Unknown**. They do not appear under **Pending**.

| Column | Notes |
|--------|-------|
| **Domain** | Hostname |
| **Tenant** | Tenant ID |
| **Type** | **Primary** (first hostname) or **Alias** |
| **Status** | **Unknown**, **Verified**, or **Pending** |
| **Last Checked** | Relative time. Older than 24 hours is marked **(stale)**. Empty until the first check. |
| **Actions** | Checkmark. Tooltip: **Verify domain** |

Use **Search Domains** to match the hostname. The list is 10 rows per page. **Domain**, **Tenant**, and **Type** are sortable.

## Verify a domain

Verification requests `https://the-domain/?grabwp-verify-domain=1` (then HTTP if HTTPS fails) and checks that the response belongs to the mapped tenant. It is not a DNS lookup by itself. The domain must already resolve and reach this WordPress site.

1. Open **Waas → Domains**.
2. For one row, click the checkmark in **Actions**.
3. Or select rows, choose **Verify** under **Bulk actions**, and click **Apply**.
4. Reload the list.

**Verify:** **Status** is **Verified**, or **Pending** with a fresh **Last Checked** time. A check older than a day shows **(stale)**. Run **Verify** again after DNS changes.

Typical failures:

| Result | Meaning |
|--------|---------|
| **Pending**, domain did not respond | DNS is not pointing here yet, or the web server is not accepting the hostname. |
| **Pending**, reachable but not serving this site | The hostname answers, but it is not this tenant. |
| Domain is not mapped to a tenant | The hostname is not on a tenant record. |

> **Note:** DNS can take up to 48 hours. On the customer dashboard, **Verify** asks you to add the records first, then **Check now**, and to wait at least 15 minutes before trying again.

## Choose a domain mode

**Navigate to Waas → Settings** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=general`) and open the **General** tab. The **Custom Domains** section sets the instructions customers see.

![Custom Domains on General](../images/05-waas-settings-general-d02.png)

| Field | Notes |
|-------|-------|
| **Domain Mode** | **Cloudflare SaaS (CNAME)** or **Direct IP (A record)** |
| **CNAME Target** | Shown for Cloudflare SaaS. Customers point CNAME here. Placeholder: `cdn.saas.example.com` |
| **DCV Delegation** | Shown for Cloudflare SaaS. CNAME value from Cloudflare so custom hostnames can validate SSL. Placeholder: `acme123.dcv.cloudflare.com` |
| **Server Public IP** | Shown for Direct IP. Customers point an A record here. |

Click **Save Changes**. The Domains page then shows **Mode:** and the record value (for example `CNAME: cdn.saas.example.com`).

## Cloudflare SaaS (CNAME)

1. Add your platform zone to Cloudflare and turn on Cloudflare for SaaS (SSL/TLS → Custom Hostnames). This may require a paid Cloudflare plan.
2. Set a fallback origin to the hostname you will use as **CNAME Target**, and point that hostname at this server.
3. In **Custom Domains**, select **Cloudflare SaaS (CNAME)**, fill **CNAME Target**, and paste **DCV Delegation** if Cloudflare gives you one.
4. Click **Save Changes**.

Customer DNS (also shown on the tenant dashboard):

| Name | Type | Value |
|------|------|-------|
| `@` | `CNAME` | Your **CNAME Target** |
| `www` | `CNAME` | Your **CNAME Target** |
| `_acme-challenge.<your-domain>` | `CNAME` | `<your-domain>.` plus the **DCV Delegation** value |

The DCV row appears only when **DCV Delegation** is filled in.

> **Cloudflare docs:** [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)

## Direct IP (A record)

1. In **Custom Domains**, select **Direct IP (A record)** and enter **Server Public IP**.
2. Click **Save Changes**.
3. For each custom hostname, accept that name on the web server (Nginx `server_name` or an Apache virtual host) and issue a certificate (for example Certbot). Reload the web server.
4. Verify the domain on **Waas → Domains**.

Customer DNS:

| Name | Type | Value |
|------|------|-------|
| `@` | `A` | Your **Server Public IP** |
| `www` | `A` | Your **Server Public IP** |

> **Note:** Each Direct IP hostname needs its own server name and certificate. Cloudflare SaaS issues certificates for custom hostnames after **CNAME Target** and **DCV Delegation** are set.

## Customer dashboard

The domain tools show when the tenant's plan includes the custom-domain benefit. See [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits).

On the dashboard Domains table the customer can:

1. Enter a hostname and click **Add Alias**. A tenant can have up to 2 aliases. The confirm button is **Add alias**.
2. Click **Verify**, then **Check now**, after the DNS records above are in place.
3. After the alias is **Verified** and it is not already primary, click **Set Primary**. Confirm with **Set primary**. The site URL changes to that hostname.
4. Click **Remove** on an alias that is not the primary hostname.

The platform hostname stays in place until a verified custom domain is set as primary. Its status on the dashboard is **Active**. It is not listed on **Waas → Domains** once **Platform Domain** is set.

**Verify:** The Domains admin row is **Verified**, **Last Checked** is recent, and the tenant site opens on the custom hostname.

---

**Next:** [Managing Subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions)
