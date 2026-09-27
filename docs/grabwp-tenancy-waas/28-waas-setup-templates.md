---
title: "Set Up Templates"
description: "Register a tenant as a template, then organize tags, tag groups, and CSV import"
order: 28
section: waas
---

# Set Up Templates

A template is an existing tenant marked as a blueprint. When a customer signs up with that template, the new site is cloned from it. The source tenant must stay in place.

Navigate to **Waas → Templates** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-templates`).

![Templates list](../images/waas-templates-list.png)

Sub-navigation on this screen: **Templates** | **Tags** | **Tag Groups** | **Bulk**.

List columns: **Template Name**, **Slug**, **Source Tenant**, **Tags**, **Price**, **Active**, **Order**, **Actions**.

## Step 1: Create a Source Tenant

1. Go to **Tenancy → Add New** (`/wp-admin/admin.php?page=grabwp-tenancy-create`)
2. Create a tenant on your platform domain, for example `template-starter.yoursaas.com`
3. Open that tenant's WordPress admin and set the theme, pages, menus, and demo content you want every copy to start with

## Step 2: Register the Template

1. Go to **Waas → Templates**
2. Click **Add New**

On edit, the screen title is **Edit Template** and the save button is **Update Template**. On add, the save button is **Save as Template**. **Back to Templates** returns to the list.

![Edit Template](../images/waas-template-edit.png)

| Field | Notes |
|-------|-------|
| **Source Tenant** | Add only. Required. Not shown when editing. |
| **Template Name** | Required. Gallery title. |
| **Slug** | Required. Lowercase letters, numbers, and hyphens. |
| **Tags** | Select tags, or follow **manage tags**. |
| **Allowed Plans** | Leave unchecked for every plan. Check plans to restrict the template. The free plan is labeled **Free tier**. |
| **Price** | Extra charge for this template. `0` means no template fee. |
| **Discount Price** | Optional lower price. `0` means no discount price. |
| **Description** | Text for the gallery. |
| **Thumbnail** | **Select** from the media library, or paste an image URL. **Remove** clears it. Placeholder: **Image URL or select from media**. |
| **Active** | **Show in signup form** |
| **Sort Order** | Lower numbers appear first |

Click **Save as Template** or **Update Template**. Success notice: **Template saved.**

**Rebuild Index** on the list rewrites the templates index file. Use it if the gallery and the list disagree. Success notice: **Templates index rebuilt.**

## Step 3: Tags

Tags filter the gallery. Open **Tags** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-tags`).

![Tags](../images/04-waas-tags.png)

Click **Add New**. Fields:

| Field | Notes |
|-------|-------|
| **Slug** | Lowercase letters, numbers, hyphens only |
| **Label** | Name shown in the gallery and in the template selector |
| **Group** | Which tag group this tag belongs to |
| **Icon** | Small image. **Select** or **Remove**. Used as a feature indicator. |
| **Image** | Optional larger image |
| **Sort Order** | Order inside the group |
| **Active** | **Show in tag selectors** |

The list can be filtered by group and searched with **Search Tags**.

## Step 4: Tag Groups

Open **Tag Groups** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-tags-group`).

![Tag Groups](../images/04-waas-tags-group.png)

When no custom groups are stored, WaaS uses these groups: **Style**, **Industry**, **Features**, **Page Builder**, **Base Theme**, **Status**, and **Other**.

Click **Add New** to add a group. Fields: **Slug**, **Label**, **Sort Order**.

Which groups render as pills versus dropdowns is controlled by the template browser shortcode `filter-tags` attribute, or by the block control **Pill filter groups (filter-tags)**. See [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates).

## Step 5: Bulk CSV

Open **Bulk** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-bulk`).

![Bulk Templates](../images/04-waas-bulk.png)

1. Click **Download templates CSV** to export the current templates
2. Edit the file. A header row is required. Column order does not matter. Each row needs `tenant_id`, `name`, and `slug`.
3. Choose **Source**: **Upload file** or **Paste CSV text**
4. Set **Overwrite** if you want **Overwrite existing templates with the same tenant_id**
5. Set **Missing tags**: **Skip missing (drop unknown tag slugs)** or **Create missing (add to the "other" tag group)**
6. Click **Import CSV**

Columns shown on the page: `tenant_id`, `name`, `slug`, `category`, `tags`, `allowed_plans`, `price`, `discount_price`, `is_active`, `sort_order`, `description`, `thumbnail_url`.

`tags` and `allowed_plans` are pipe-delimited (`business|portfolio`). `is_active` is `1` or `0`.

## Verify

1. The template row is **Active**
2. The templates page on the frontend lists it
3. Tags you assigned appear on the row

---

**Next:** [Set Up Frontend Pages](/grabwp-tenancy-waas/waas-setup-frontend-pages)
