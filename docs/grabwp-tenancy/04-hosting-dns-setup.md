---
title: "Domain & DNS Setup"
description: "Connect custom domains or use path routing for tenant sites"
order: 5
section: base
---

# Domain & DNS Setup

You have two ways to route visitors to a tenant site. Path routing requires no setup at all — custom domains require hosting and DNS configuration.

## Option A — Path Routing (Recommended for Quick Setup)

Access any tenant site via a URL path on your existing domain — no DNS changes, no hosting configuration:

```
https://yoursite.com/site/{tenant-id}
```

Example: `https://yoursite.com/site/abc123`

This works automatically on **Apache** and **LiteSpeed** servers (the plugin configures `.htaccess` rewrite rules on activation).

### Nginx Setup

Nginx doesn't use `.htaccess`, so you need to add a server block rule manually:

```nginx
location ~ ^/site/([a-z][a-z0-9]{5})(/|$) {
    rewrite ^/site/([a-z][a-z0-9]{5})/?(.*)$ /$2 break;
    try_files $uri $uri/ /index.php?site=$1&$args;
}
```

Add this block inside your existing WordPress `server {}` block, then reload Nginx.

---

## Option B — Query-String Routing

Access a tenant site by appending its ID as a query parameter — useful for testing or when you can't modify server config:

```
https://yoursite.com/?site={tenant-id}
```

Example: `https://yoursite.com/?site=abc123`

No server configuration needed. Works on any host. Not recommended for production as the URL is not user-friendly.

---

## Option C — Custom Domain

Give each tenant site its own domain (e.g., `client.com` or `client.yoursite.com`). Requires two steps: hosting setup and DNS configuration.

### Step 1: Add the Domain in Hosting

Log into your hosting control panel and add the domain:

**For subdomains** (e.g., `client.yoursite.com`):
- Find **Parked Domains** or **Domain Aliases**
- Add the subdomain pointing to your main WordPress directory

**For external domains** (e.g., `clientsite.com`):
- Find **Addon Domains**
- Set the document root to your main WordPress directory
- Do not create a new subdirectory

| Control Panel | Where to add |
|--------------|-------------|
| cPanel | Parked Domains (subdomains) or Addon Domains (external) |
| Plesk | Websites & Domains → Add Domain |
| DirectAdmin | Domain Management → Add New Domain |

### Step 2: Update DNS

**For subdomains** — add an A record at your DNS provider:
- **Name:** subdomain (e.g., `client`)
- **Type:** A
- **Value:** your server's IP address

**For external domains** — update nameservers at the registrar to point to your host, or add an A record if you manage DNS separately.

### Step 3: Wait for Propagation

DNS changes take 5–30 minutes, sometimes up to 24 hours. Use [dnschecker.org](https://dnschecker.org) to verify the domain resolves to your server.

### Testing

Visit the domain — you should see the tenant site's WordPress screen. If you see your hosting's default page, the document root isn't pointing to your WordPress directory.

## Domain Format Rules

- Valid formats: `example.com`, `sub.example.com`
- No IP addresses or `localhost`
- Letters, numbers, and hyphens only
