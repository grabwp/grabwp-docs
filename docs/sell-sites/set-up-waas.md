---
title: "Set up WaaS"
description: "What you need, how to install the three plugins, and how the setup wizard takes you from an empty site to a working signup page."
sidebar_label: "Set up WaaS"
tags: [settings, plan-waas, plan-pro, for-operator]
last_verified_date: "2026-10-30"
---

**Short answer:** install GrabWP Tenancy, then Pro, then WaaS, and follow the setup wizard. The wizard sets the web address of customer sites, activates your Pro license, picks defaults for new sites, creates your starter template and Free plan, and opens your signup page. Paid plans and payments come after.

**Needs:** Pro + WaaS

## Before you start

**Required**

- A WordPress site (5.0 or newer, PHP 7.4 or newer) where you can install plugins and reach the files (FTP, SSH or the hosting file manager). Check versions in **Tools > Site Health > Info > Server**.
- A Pro license key. Activating it also lets you download the payment add-ons.
- HTTPS on your main site. Payment providers need it.

**If customer sites get subdomains** (for example `shop.yoursaas.com`)

- A domain pointed at your server, plus a wildcard DNS record so every subdomain reaches it:

  ```
  *.yoursaas.com   A   YOUR_SERVER_IP
  ```

- An SSL certificate that covers both `yoursaas.com` and `*.yoursaas.com`. Many hosts offer Let's Encrypt.

If customer sites use path URLs instead (for example `yoursaas.com/site/site-name/`), you need no extra DNS.

**Recommended**

- An SMTP plugin, such as [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) or [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/). Customers sign in with a code sent by email, and plain WordPress mail often lands in spam.
- A VPS or dedicated server if you can. It gives you control of DNS, SSL and PHP functions such as `symlink()`.
- An account with the payment provider you will use (see [Payments](/sell-sites/payments)). You can launch with a Free plan or a free trial first and add payments later.

**Optional**

- Cloudflare, if customers will connect their own domains with the **Cloudflare SaaS (CNAME)** mode. See [Client custom domains](/sell-sites/client-domains).
- WooCommerce, if you want to take payments through your WooCommerce checkout.

## Step 1: Install the three plugins

Install them in this order. Each one needs the one before it.

1. GrabWP Tenancy (Free)
2. GrabWP Tenancy Pro
3. GrabWP Tenancy WaaS

For each ZIP file:

1. Go to **Plugins > Add New > Upload Plugin**.
2. Choose the ZIP and click **Install Now**, then **Activate**.

After the first plugin, a **Tenancy** menu appears (**All Tenants**, **Add New**, **Settings**, **Status**). After Pro, **Tenancy** also has **Pro Settings** and **License**. After WaaS, a **Waas** menu appears (**Dashboard**, **Subscriptions**, **Domains**, **Templates**, **Settings**).

If activation fails with a dependency error, activate the plugin before it first. While Pro or WaaS is installed but not active, a notice asks you to finish activating it, then run the setup wizard.

## Step 2: Run the setup wizard

The wizard opens by itself the first time you activate GrabWP on a site with no customer sites. Later you can open it from:

- the **Continue setup** button on the notice "GrabWP: finish setup to get your first site running",
- **Run setup wizard** (or **Resume setup wizard**) at the top of **Tenancy > Status** or **Waas > Dashboard**.

{/* TODO screenshot: setup wizard with WaaS active, showing the step list (Welcome, Routing, License, Site defaults, Starter site, Storefront, Done) */}

The wizard saves each screen as you go. **Exit setup** pauses it; the steps you saved are kept and you can resume later. **Back** returns to the previous screen.

| Step | What you do |
|---|---|
| **Welcome** | The wizard checks your server and explains "How your website service works" (the five parts on [How WaaS works](/sell-sites/how-waas-works)). Click **Continue**. |
| **Routing** | **Choose the web address of your sites**: **Path** (no DNS needed), **Domain**, or **Path and domain**. Start simple: you can change it later in **Tenancy > Settings > Routing**. |
| **License** | **Activate your Pro license**. You can skip this and activate later under **Tenancy > License**, but add-on downloads need it. |
| **Site defaults** | **Defaults for new sites**: pick **Use the simple setup** (each site gets its own uploads folder, plugins and themes are shared from the main site) or **Choose each setting** for the database, plugins, themes and uploads. |
| **Starter site** | **Create your starter site**. Customers get a copy of this site when they sign up. Create a new one or pick an existing site. |
| **Storefront** | Three short screens: **Your template** (turn the starter site into a template: **Template site**, **Template name**, **Template slug**), **Your Free plan** (**Free plan name**, **Description**, **Features**, one per line), and **Your signup page** (**Platform domain** and **Accent color**, the color of buttons and links customers see). |
| **Done** | Links to **Open template gallery**, **Test a signup (use a private window)** and **WaaS dashboard**, plus next steps: **Connect payments**, **Paid plans and trials**, **More templates**. |

The **Platform domain** is required unless customer sites use path URLs. With path URLs you can leave it empty.

WaaS creates the Signup, Dashboard, Templates and Pricing pages for you when it is activated, so after the wizard your signup page already works.

:::tip
Before you build the starter site in detail, sign up once with the Free plan in a private browser window. If the site appears, the core setup works.
:::

## Step 3: Check the General settings

Open **Waas > Settings > General**. The wizard already filled most of it. Check:

![WaaS General Settings](../images/waas-general-settings.png)

1. **Platform Domain** matches the domain in your wildcard DNS (no `http://`, no trailing slash). In path mode this row is hidden and the page says "Path mode: customer sites open at ... No DNS needed."
2. **Signup Page**, **Dashboard Page**, **Templates Page** and **Pricing Page** each point at a page. Each has a **View** link. If one is missing, open **Repair tools** and click **Create/Repair Signup and Dashboard Pages** (notice: **Signup and Dashboard pages checked.**).
3. **Auth Mode** is **WAAS Auth (Email signup)** for self-service signups. The other choice, **WordPress Auth (Login required)**, needs an existing WordPress login before a site is created.
4. **Domain Mode** under **Custom Domains** is the mode you will use for customer domains. You can leave the targets empty until you accept custom domains. See [Client custom domains](/sell-sites/client-domains).
5. Under **Retention and grace period**, **Grace Period (days)** is how long a site stays online after a subscription ends (default 7). See [Free trials and subscriptions](/sell-sites/trials-and-subscriptions).

Click **Save Changes**. The notice **Settings saved.** confirms it. Every field on this tab is listed on [WaaS settings](/sell-sites/waas-settings).

## Step 4: Check the Pro defaults for new sites

The wizard's **Site defaults** step wrote these. To change them, open **Tenancy > Pro Settings**. They apply to sites created from now on; existing sites do not change.

- **Isolation** tab: **Level of isolation for new sites** is **Shared**, **Simple**, **Advanced** or **Custom**. **Simple** (own uploads folder, shared plugins and themes) is where a fresh install starts and suits most website services: shared plugins use less disk and you update them once. **Advanced** gives each site its own plugins, themes and uploads.
- **Database** tab: **Database Type** is **Shared Database (with table prefixes)**, **Isolated MySQL Database** or **Isolated SQLite Database**. With Isolated MySQL, the **Default MySQL Connection** fields (**MySQL Host**, **MySQL Database**, **MySQL Username**) pre-fill the create-site form.
- **Directories** tab: leave the fields blank to keep the default locations.

Leave **Symlink**, **Storage**, **Backup** and **CDN** at their defaults until you need them. Click **Save Pro Settings** after a change.

![Pro Settings Database](../images/11-pro-settings-database.png)

{/* TODO screenshot: Tenancy > Pro Settings > Isolation with the "Level of isolation for new sites" choice (the existing pro-settings.png shows an older layout) */}

## Step 5: Install payment add-ons (only for Stripe, Sepay or Xendit)

**Polar.sh** and **WooCommerce** need no add-on. For Stripe, Sepay or Xendit:

1. Activate your Pro license first (**Tenancy > License**, **Activate License**).
2. Open **Waas > Settings > Add-ons**.
3. On the add-on card (for example **GrabWP Tenancy Stripe**), click **Download ZIP**.
4. Install the ZIP with **Plugins > Add New > Upload Plugin**, then **Activate**.

![WaaS Add-ons tab](../images/waas-addons.png)

The card badges are explained on [Benefits, services and add-ons](/sell-sites/benefits-and-add-ons#add-ons-tab). Then connect the provider on [Payments](/sell-sites/payments).

## Check that it works

1. **Tenancy > Status** shows no problems. Fix anything it reports first.

   ![Tenancy Status](../images/grabwp-status.png)

2. **Plugins** lists GrabWP Tenancy, GrabWP Tenancy Pro and GrabWP Tenancy WaaS as active.
3. The wizard's **Done** screen lists your template as active and the Free plan as ready.
4. A test signup in a private window creates a site you can open.

## Related

- [Go-live checklist](/sell-sites/go-live-checklist)
- [Plans](/sell-sites/plans)
- [Payments](/sell-sites/payments)
- [Templates](/sell-sites/templates)
- [WaaS settings](/sell-sites/waas-settings)
