import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

function inferStatus(frontMatter = {}) {
  if (typeof frontMatter.status === 'string' && frontMatter.status.trim()) {
    return frontMatter.status.trim().toLowerCase();
  }

  if (frontMatter.category_key) {
    return 'overview';
  }

  const description = String(frontMatter.description || '');
  if (/coming soon|tezliklə|hazırlanır|starter reference|giriş qeydləri/i.test(description)) {
    return 'starter';
  }

  return 'reference';
}

function formatDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return text || null;
}

const copy = {
  en: {
    label: 'Coverage',
    reviewed: 'Last reviewed',
    status: {
      starter: 'Starter',
      reference: 'Reference',
      overview: 'Overview',
    },
  },
  az: {
    label: 'Səviyyə',
    reviewed: 'Son baxış',
    status: {
      starter: 'Başlanğıc',
      reference: 'Əsas',
      overview: 'İcmal',
    },
  },
};

export default function DocState() {
  const {frontMatter} = useDoc();
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'az' ? 'az' : 'en';
  const text = copy[locale];
  const status = inferStatus(frontMatter);
  const lastReviewed = formatDate(frontMatter.last_reviewed);

  if (!status && !lastReviewed) {
    return null;
  }

  return (
    <div className="doc-state">
      {status ? (
        <span className="doc-state__badge">
          {text.label}: {text.status[status] || status}
        </span>
      ) : null}
      {lastReviewed ? (
        <span className="doc-state__meta">
          {text.reviewed}: {lastReviewed}
        </span>
      ) : null}
    </div>
  );
}
