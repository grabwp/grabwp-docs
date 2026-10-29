---
title: "How a signup becomes a site"
description: "The provisioning steps in plain words, the retry rule, name reservation and template copy."
sidebar_label: "How a signup becomes a site"
sidebar_position: 10
tags: [subscriptions, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** each signup gets a provisioning record that moves from checkout to payment to a finished site. The chosen site name is held for 2 hours. A stuck job is retried, up to 12 times.

## What it is

One record per signup (the provisioning intent) tracks progress. Its states in order:

1. `checkout_pending`: the customer chose a plan and a site name and is paying.
2. `payment_confirmed`: payment arrived.
3. `finalizing`: the site is being prepared.
4. `tenant_created`: the tenant exists.
5. `clone_running`: the chosen template is being copied into the tenant.
6. `completed`: the site is ready.

Two other states exist: `failed_retriable` (will be tried again) and `failed_terminal` (stopped).

## Why it matters

When a customer says "I paid and have no site", the state tells you where it stopped. A site name is also held while the customer pays, so another customer gets `This site name is temporarily reserved by another checkout. Please try another.` for up to 2 hours.

## How to check

Open **Waas > Settings > Provisioning**. Find the signup and read its state. An hourly job re-queues stuck signups. The retry limit is 12.

The signup form can reject input with these messages:

- `Name is required.` and `Valid email is required.`
- `Please choose a template to get started.`
- `This site name is reserved. Please choose another.` The reserved words include `www`, `mail`, `admin`, `api`, `cdn`, `ftp`, `smtp`, `imap`, `pop`, `ns1`, `ns2`, `dns`, `cpanel`, `webmail` and `app`.
- `This site name is already taken. Please try another.`

## What to do

Wait for the hourly retry once. If the state stays at `failed_terminal` or does not move, follow [Signup stops or shows an error](/kb/troubleshooting/signup-problems). Also see [Signup flow](/grabwp-tenancy-waas/waas-signup-flow).

## Limits and versions

- Needs WaaS. Copying a template is a clone. See [Clone](/kb/glossary/backup-and-tools#clone).
- Retries and re-queueing run as scheduled jobs and need a working cron. See [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron).

## Related

- [Statuses](/kb/reference/statuses)
- [Glossary: selling and billing](/kb/glossary/selling-and-billing#provisioning-intent)
