/* import React from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  return <Redirect to={`${locale === 'en' ? '' : '/' + locale}/intro`} />;
}

  return (
    <Layout
      title="InfoSec Lessons – Learn Cybersecurity"
      description="Real-world cybersecurity content focused on Red/Blue Teaming, GRC, and core technical skills.">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">Welcome to InfoSec Lessons 👨‍💻</h1>
          <p className="hero__subtitle">Your practical guide to mastering cybersecurity – from fundamentals to real-world tactics.</p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to={locale === 'az' ? '/az/intro' : '/intro'}
            >
              Start Learning →
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="container margin-vert--lg">
          <h2>What You'll Learn</h2>
          <ul>
            <li>🔴 Red Teaming – Attacks, privilege escalation, evasion</li>
            <li>🔵 Blue Teaming – Detection, SIEM, log analysis</li>
            <li>🛡️ GRC – Risk, compliance, policies</li>
            <li>🌐 General Security – Passwords, malware, basics</li>
            <li>📚 Foundations – Networking, virtualization, OS, helpdesk</li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
*/
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  return (
    <Layout
      title="InfoSec Lessons – Learn Cybersecurity"
      description="Real-world cybersecurity content focused on Red/Blue Teaming, GRC, and core technical skills.">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">Welcome to InfoSec Lessons 👨‍💻</h1>
          <p className="hero__subtitle">Your practical guide to mastering cybersecurity – from fundamentals to real-world tactics.</p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to="/intro"
            >
              Start Learning →
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="container margin-vert--lg">
          <h2>What You'll Learn</h2>
          <ul>
            <li>🔴 Red Teaming – Attacks, privilege escalation, evasion</li>
            <li>🔵 Blue Teaming – Detection, SIEM, log analysis</li>
            <li>🛡️ GRC – Risk, compliance, policies</li>
            <li>🌐 General Security – Passwords, malware, basics</li>
            <li>📚 Foundations – Networking, virtualization, OS, helpdesk</li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
