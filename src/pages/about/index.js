import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About" description="About InfoSec Lessons and its creator">
      <main className="container margin-vert--lg">
        <h1>About InfoSec Lessons</h1>
        <p>
          <strong>InfoSec Lessons</strong> is a self-hosted educational platform created by <strong>Emil Farzaliyev</strong>, an Information Security Engineer and instructor.
        </p>
        <p>
          I actively work in the cybersecurity field, with hands-on experience in governance, red/blue teaming, and teaching students through workshops and university-level courses.
        </p>
        <p>
          This platform was built to share practical knowledge, research, and real-world tutorials with both beginners and professionals in cybersecurity and IT. The goal is to make high-quality content freely accessible and help others build a solid InfoSec foundation.
        </p>
        <h2>🎯 Mission</h2>
        <ul>
          <li>🔐 Promote cybersecurity awareness and education</li>
          <li>🧩 Provide structured, real-world learning resources</li>
          <li>🌍 Build a community of learners and security enthusiasts</li>
        </ul>
      </main>
    </Layout>
  );
}
