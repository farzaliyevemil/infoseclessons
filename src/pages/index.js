
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
        <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
<p className="mb-4">
  This platform offers structured <strong>learning materials</strong>, <strong>articles</strong>, and <strong>practical research</strong> in the field of Information Security and IT.
  The content is designed to benefit both beginners and experienced professionals.
</p>
<ul className="list-disc list-inside space-y-1">
  <li>🔴 <strong>Red Teaming</strong> – Identifying and testing security weaknesses</li>
  <li>🔵 <strong>Blue Teaming</strong> – Monitoring, threat detection, and incident response</li>
  <li>🛡️ <strong>GRC</strong> – Risk management, policy development, and compliance</li>
  <li>🌐 <strong>General Security</strong> – Password hygiene, malware defense, and essential concepts</li>
  <li>📚 <strong>IT Foundations</strong> – Networking, operating systems, virtualization, and helpdesk knowledge</li>
</ul>

        </section>
      </main>
    </Layout>
  );
}
