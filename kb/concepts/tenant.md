---
title: "What a tenant is"
description: "A tenant is a separate site on the same install. How the 6 character tenant ID works."
sidebar_label: "What a tenant is"
sidebar_position: 1
tags: [plan-base, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14"
last_verified_date: "2026-10-29"
---

**Short answer:** a tenant is one separate site that runs on the same WordPress install as your main site. Each tenant has a 6 character ID made of lowercase letters and digits. Some words are reserved and cannot be used as an ID.

## What it is

A tenant has its own content, uploads and (with the default settings) its own table prefix. The [tenant ID](/kb/glossary/sites-and-data#tenant-id) is exactly 6 characters, lowercase letters and digits, for example `abc123`. Reserved IDs include `admin1`, `test01`, `public`, `system`, `config` and `backup`.

## Why it matters

The ID appears in the tenant's path URL, in its table names and in its folder name. An ID with capital letters, hyphens or a different length is not accepted. If you want a readable address, use a [path alias](/kb/glossary/urls-and-domains#path-alias) or a domain.

## How to check

Open **Tenancy > All Tenants**. Each row is a tenant. To create one, open **Tenancy > Add New**.

## What to do

Create tenants as described in [Creating tenants](/grabwp-tenancy/creating-tenants). Let GrabWP generate the ID unless you need a specific one.

## Limits and versions

- Pro tenants can have their own database, plugins and themes. See [Database options](/kb/concepts/database-options) and [Isolation levels](/kb/concepts/isolation-levels).
- By default a tenant admin cannot install or delete plugins and themes. See [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins).

## Related

- [Glossary: sites and data](/kb/glossary/sites-and-data)
- [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant)
