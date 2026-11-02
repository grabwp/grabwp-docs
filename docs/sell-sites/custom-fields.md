---
title: "Custom fields at signup"
description: "Collect extra customer or subscription details during WaaS signup with the GrabWP Tenancy Custom Fields add-on."
sidebar_label: "Custom fields"
tags: [settings, subscriptions, addon, plan-waas, for-operator, for-cs]
last_verified_version: "Custom Fields 1.0.0, WaaS 1.1.25"
last_verified_date: "2026-11-03"
---

**Short answer:** the **GrabWP Tenancy Custom Fields** add-on lets your signup form ask for extra details, such as a phone number or a company name. You define the fields under **Waas > Custom Fields**, turn on **Ask on signup**, and each answer is saved either on the customer profile (asked once) or on the subscription (asked for every new site).

**Needs:** Pro + WaaS 1.1.25 or later + the GrabWP Tenancy Custom Fields add-on

{/* TODO screenshot: Waas > Custom Fields (field list and Add New Field form). The admin screenshot library has no Custom Fields shots yet, so this page has no image until the library is re-shot. */}

## Install the add-on

1. Make sure GrabWP Tenancy WaaS is 1.1.25 or later. With an older WaaS the add-on shows `GrabWP Tenancy Custom Fields needs GrabWP Tenancy WaaS %s or newer. Custom fields are off until WaaS is updated.`
2. Install **GrabWP Tenancy Custom Fields** from **Waas > Settings > Add-ons** (see [Add-ons tab](/sell-sites/benefits-and-add-ons#add-ons-tab)) or upload the ZIP under **Plugins > Add New > Upload Plugin**.
3. Activate it. A **Custom Fields** item appears under the **Waas** menu.

## Add a field

1. Go to **Waas > Custom Fields** and click **Add New Field**.
2. Fill in the form:

   | Field | What it does |
   |---|---|
   | **Label** | The name customers see on the signup form. Required. GrabWP makes the field **Key** from it. |
   | **Help text** | Shown under the input on the signup form. |
   | **Type** | **Text**, **Phone**, **Email** or **Text area**. |
   | **Stored on** | **Customer profile**: asked once and saved on the customer profile. Later signups show the saved value read-only. **Subscription**: asked on every signup and saved with that site subscription. |
   | **Placeholder** | Grey hint inside an empty input. It is never submitted or saved. |
   | **Default value** | Prefills the input when the customer has no saved value. It is saved only if the customer submits it. Adding or changing a default never changes existing customers or subscriptions. |
   | **Options** | **Required**. When you edit a field, also **Active**. |

3. Click **Add Field**. The notice **Saved.** appears and the field is listed with its **Label**, **Key**, **Type**, **Stored on**, **Required** and **Status**.

**Type**, **Stored on** and **Key** cannot change after a field is created. There is no delete button: to stop asking for a field, edit it, clear **Active** and click **Update Field**. Inactive fields leave the signup form and keep their stored values.

## Turn it on for signups

Custom fields are off by default. On **Waas > Custom Fields**, tick **Ask on signup** and click **Save settings**. With it off, signup asks for nothing extra and checkouts are not changed, but stored values stay visible to admins and customers.

## Where the fields show on the signup form

The add-on adds a signup step called **Additional information** (step ID `custom_fields`). It shows only while **Ask on signup** is on and at least one field is active.

- The built-in **Default** signup flow shows it on the account screen, right after **Create your account**. A signed-in customer skips the account step, so the fields then form that screen on their own.
- In your own signup flow preset, drag **Additional information** to any group. If a saved preset does not place it, it comes just before the review step. See [Signup flow](/sell-sites/signup-flow).

Required fields and formats are checked before the customer moves on:

| Message | Cause |
|---|---|
| `Fill in this field.` | A required field is empty. |
| `Enter a valid phone number, for example +84 90 123 4567.` | A **Phone** field does not look like a phone number. |
| `Enter a valid email address.` | An **Email** field is not a valid address. |
| `Check these fields: %s.` | The server check found problems in the listed fields. |

Text fields hold up to 255 characters and text areas up to 2000.

## How values are saved

- A **Customer profile** value is saved once. A signed-in customer sees it read-only and is not asked again. A signup by a visitor never overwrites the profile values of an existing account.
- A **Subscription** value is saved with the new site's subscription.
- On a paid signup the answers are kept with the checkout and applied once the payment completes. Answers from checkouts that never complete are deleted after 7 days by a daily scheduled task, so make sure a server cron job runs (see [Scheduled jobs](/manage-sites/scheduled-jobs)).

:::note Known limitation
A visitor who signs up with the email of an existing account (confirmed by the one-time code) is asked the profile fields again, because the form is built before the code signs them in. Values already on that account are kept and the new answers are ignored.
:::

## Where you and your customers see the values

| Who | Where |
|---|---|
| You (admin) | The **Custom fields** box on the subscription detail screen (**Waas > Subscriptions**, then a subscription). Edit the values there and click **Save custom fields**. Profile values are marked **From customer profile** with an **Edit customer profile** link. |
| You (admin) | The user's profile screen in wp-admin (**Users**, then the customer), under **Additional information**. |
| Your customer | A read-only **Your details** card on the **Overview** tab of the customer dashboard. |

On these admin screens, a field you made inactive is still shown, with **(inactive field)** next to its value.

## Privacy and removal

- The add-on supports the WordPress personal data export and erasure tools (**Tools > Export Personal Data** and **Tools > Erase Personal Data**).
- Deactivating the plugin or a field keeps the stored values. Deleting (uninstalling) the plugin removes all its data.

## Check that it works

1. Add one required **Text** field stored on **Subscription**, and turn on **Ask on signup**.
2. Open your signup page in a private window. The **Additional information** fields appear on the account screen.
3. Finish a signup, then open the new subscription under **Waas > Subscriptions**. The **Custom fields** box shows the answer.

## Related

- [Signup flow](/sell-sites/signup-flow)
- [Benefits, services and add-ons](/sell-sites/benefits-and-add-ons)
- [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)
- [Signup problems](/help/signup-problems)
