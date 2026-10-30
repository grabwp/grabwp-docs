import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

const getDoors = () => [
  {
    id: 'evaluate',
    title: translate({id: 'home.door.evaluate.title', message: 'Thinking about GrabWP?'}),
    text: translate({
      id: 'home.door.evaluate.text',
      message: 'What it does, which plugin you need, and whether it runs on your hosting.',
    }),
    links: [
      {to: '/before-you-buy', label: translate({id: 'home.door.evaluate.link', message: 'Before you buy'})},
    ],
  },
  {
    id: 'start',
    title: translate({id: 'home.door.start.title', message: 'Just installed?'}),
    text: translate({
      id: 'home.door.start.text',
      message: 'Create your first site, or set up selling sites to your customers.',
    }),
    links: [
      {to: '/manage-sites/first-site', label: translate({id: 'home.door.start.link.first', message: 'Your first site'})},
      {to: '/sell-sites/set-up-waas', label: translate({id: 'home.door.start.link.waas', message: 'Set up WaaS'})},
    ],
  },
  {
    id: 'fix',
    title: translate({id: 'home.door.fix.title', message: 'Something is wrong?'}),
    text: translate({
      id: 'home.door.fix.text',
      message: 'Find the fix by what you see, or tell us what to look at.',
    }),
    links: [
      {to: '/help/getting-help', label: translate({id: 'home.door.fix.link', message: 'Get help'})},
    ],
  },
];

const getQuestions = () => [
  {
    to: '/help/hosting-requirements',
    label: translate({id: 'home.q.hosting', message: 'Will GrabWP run on my hosting, and which web server should I use?'}),
  },
  {
    to: '/manage-sites/database-options',
    label: translate({id: 'home.q.database', message: 'Can each site have its own database?'}),
  },
  {
    to: '/manage-sites/plugins-and-themes',
    label: translate({id: 'home.q.plugins', message: 'How do I update plugins on a site that has its own copies?'}),
  },
  {
    to: '/manage-sites/free-settings',
    label: translate({id: 'home.q.capabilities', message: 'How do I stop clients installing plugins or themes?'}),
  },
  {
    to: '/manage-sites/domains-and-dns',
    label: translate({id: 'home.q.domains', message: 'How do I put a site on its own domain?'}),
  },
  {
    to: '/sell-sites/trials-and-subscriptions',
    label: translate({id: 'home.q.trial', message: 'Can I offer a free trial without a payment provider?'}),
  },
  {
    to: '/sell-sites/payments',
    label: translate({id: 'home.q.payments', message: 'Which payment providers can I use?'}),
  },
  {
    to: '/help/site-login-fails',
    label: translate({id: 'home.q.login', message: 'Why does opening a site dashboard send me to the login page?'}),
  },
];

const getSections = () => [
  {
    to: '/before-you-buy',
    title: translate({id: 'home.section.buy.title', message: 'Before you buy'}),
    text: translate({
      id: 'home.section.buy.text',
      message: 'Free, Pro or WaaS, hosting checklist, trial and licence terms.',
    }),
  },
  {
    to: '/manage-sites/install',
    title: translate({id: 'home.section.manage.title', message: 'Manage sites (Pro)'}),
    text: translate({
      id: 'home.section.manage.text',
      message: 'Install, create sites, domains, plugins and themes, backups and settings.',
    }),
  },
  {
    to: '/sell-sites/how-waas-works',
    title: translate({id: 'home.section.sell.title', message: 'Sell sites (WaaS)'}),
    text: translate({
      id: 'home.section.sell.text',
      message: 'Plans, templates, signup, payments, trials and customer domains.',
    }),
  },
  {
    to: '/help/getting-help',
    title: translate({id: 'home.section.help.title', message: 'Help'}),
    text: translate({
      id: 'home.section.help.text',
      message: 'Troubleshooting, hosting guides, glossary and error messages.',
    }),
  },
];

export default function Home() {
  return (
    <Layout
      title={translate({id: 'home.meta.title', message: 'How can we help?'})}
      description={translate({
        id: 'home.meta.description',
        message: 'Help for GrabWP Tenancy, Pro and WaaS: run and sell many WordPress sites from one install.',
      })}>
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="home.hero.title">How can we help?</Translate>
          </Heading>
          <p className={styles.heroText}>
            <Translate id="home.hero.search">
              Type your question in the search box at the top right of every page, or start below.
            </Translate>
          </p>
        </div>
      </header>

      <main className="container">
        <section className={styles.section}>
          <div className={styles.doors}>
            {getDoors().map((door) => (
              <div key={door.id} className={styles.door}>
                <Heading as="h2" className={styles.doorTitle}>
                  {door.title}
                </Heading>
                <p className={styles.doorText}>{door.text}</p>
                <div className={styles.doorLinks}>
                  {door.links.map((link) => (
                    <Link key={link.to} to={link.to} className="button button--primary button--sm">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="home.questions.title">Top questions</Translate>
          </Heading>
          <ul className={styles.questions}>
            {getQuestions().map((q) => (
              <li key={q.to + q.label}>
                <Link to={q.to} className={styles.question}>
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="home.sections.title">Browse by section</Translate>
          </Heading>
          <div className={styles.cards}>
            {getSections().map((card) => (
              <Link key={card.to} to={card.to} className={styles.card}>
                <span className={styles.cardTitle}>{card.title}</span>
                <span className={styles.cardText}>{card.text}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
