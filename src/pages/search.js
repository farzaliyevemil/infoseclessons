import React, { useDeferredValue, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ErrorBoundary from '../components/ErrorBoundary';
import lessonsData from '../generated/lessonIndex';

const lessons = Array.isArray(lessonsData) ? lessonsData : [];

const copy = {
  en: {
    title: 'Search Lessons',
    description: 'Find lessons by topic, role, or keyword.',
    intro:
      'Browse the full lesson set without depending on the sidebar. Filter by category or search across titles, descriptions, and keywords.',
    searchLabel: 'Search',
    searchPlaceholder: 'Search for Windows, networking, LAPS, certifications, helpdesk...',
    clear: 'Clear',
    all: 'All categories',
    allStatuses: 'All levels',
    results: 'results',
    noResults: 'No lessons matched your search.',
    noResultsHint: 'Try a broader keyword or switch to another category.',
    quickLinks: 'Useful starting points',
    quickLinksIntro: 'If you are not sure where to begin, start from one of these practical paths.',
    quickCards: [
      { label: 'Networking first', href: '/networking/network-types-and-topology' },
      { label: 'Windows admin path', href: '/servers/windows-server-planning' },
      { label: 'Blue team path', href: '/blue-teaming/log-analysis' },
      { label: 'Certification planning', href: '/certifications/microsoft-certifications' },
    ],
    categoryLabel: {
      'blue-teaming': 'Blue Team',
      certifications: 'Certifications',
      'general-security': 'General Security',
      grc: 'GRC',
      'helpdesk-basics': 'Helpdesk Basics',
      networking: 'Networking',
      'operating-systems': 'Operating Systems',
      'red-teaming': 'Red Team',
      servers: 'Servers',
      virtualization: 'Virtualization',
    },
    statusLabel: {
      starter: 'Starter',
      reference: 'Reference',
      overview: 'Overview',
    },
    reviewed: 'Reviewed',
  },
  az: {
    title: 'Dərslərdə Axtarış',
    description: 'Mövzu, rol və ya açar söz üzrə dərs tapın.',
    intro:
      'Sidebar-a bağlı qalmadan bütün dərsləri gəzə bilərsiniz. Başlıq, təsvir və açar sözlər üzrə axtarış edin və kateqoriyaya görə filtr tətbiq edin.',
    searchLabel: 'Axtarış',
    searchPlaceholder: 'Windows, şəbəkə, LAPS, sertifikatlar, helpdesk üzrə axtarın...',
    clear: 'Təmizlə',
    all: 'Bütün kateqoriyalar',
    allStatuses: 'Bütün səviyyələr',
    results: 'nəticə',
    noResults: 'Axtarışınıza uyğun dərs tapılmadı.',
    noResultsHint: 'Daha ümumi açar söz yazın və ya başqa kateqoriya seçin.',
    quickLinks: 'Başlamaq üçün yönlər',
    quickLinksIntro: 'Haradan başlamağı bilmirsinizsə, bu praktik istiqamətlərdən birini seçin.',
    quickCards: [
      { label: 'Şəbəkə ilə başlayın', href: '/networking/network-types-and-topology' },
      { label: 'Windows admin yolu', href: '/servers/windows-server-planning' },
      { label: 'Blue team yolu', href: '/blue-teaming/log-analysis' },
      { label: 'Sertifikat planı', href: '/certifications/microsoft-certifications' },
    ],
    categoryLabel: {
      'blue-teaming': 'Blue Team',
      certifications: 'Sertifikatlar',
      'general-security': 'Ümumi Təhlükəsizlik',
      grc: 'GRC',
      'helpdesk-basics': 'Helpdesk Əsasları',
      networking: 'Şəbəkə',
      'operating-systems': 'Əməliyyat Sistemləri',
      'red-teaming': 'Red Team',
      servers: 'Serverlər',
      virtualization: 'Virtualizasiya',
    },
    statusLabel: {
      starter: 'Başlanğıc',
      reference: 'Əsas',
      overview: 'İcmal',
    },
    reviewed: 'Yoxlanılıb',
  },
};

function buildSearchText(lesson, locale, categoryLabel) {
  return [
    lesson.title[locale],
    lesson.description[locale],
    categoryLabel[lesson.category],
    ...(lesson.keywords || []),
  ]
    .join(' ')
    .toLowerCase();
}

export default function SearchPage() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'az' ? 'az' : 'en';
  const text = copy[locale];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const categories = ['all', ...new Set(lessons.map((lesson) => lesson.category))];
  const statuses = ['all', ...new Set(lessons.map((lesson) => lesson.status))];
  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory = category === 'all' || lesson.category === category;
    const matchesStatus = status === 'all' || lesson.status === status;
    const matchesQuery =
      deferredQuery.length === 0 ||
      buildSearchText(lesson, locale, text.categoryLabel).includes(deferredQuery);
    return matchesCategory && matchesStatus && matchesQuery;
  });

  return (
    <Layout title={text.title} description={text.description}>
     <ErrorBoundary fallback={<div className="container search-empty"><strong>{text.noResults}</strong></div>}>
      <main className="search-page">
        <section className="search-hero">
          <div className="container">
            <span className="search-hero__eyebrow">{text.searchLabel}</span>
            <h1>{text.title}</h1>
            <p>{text.intro}</p>
            <div className="search-controls">
              <label className="search-input" htmlFor="lesson-search">
                <span>{text.searchLabel}</span>
                <input
                  id="lesson-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={text.searchPlaceholder}
                />
              </label>
              <button className="search-clear" type="button" onClick={() => setQuery('')}>
                {text.clear}
              </button>
            </div>
            <div className="search-filters">
              {categories.map((value) => (
                <button
                  key={value}
                  className={value === category ? 'search-chip search-chip--active' : 'search-chip'}
                  type="button"
                  onClick={() => setCategory(value)}>
                  {value === 'all' ? text.all : text.categoryLabel[value]}
                </button>
              ))}
            </div>
            <div className="search-filters search-filters--secondary">
              {statuses.map((value) => (
                <button
                  key={value}
                  className={value === status ? 'search-chip search-chip--active' : 'search-chip'}
                  type="button"
                  onClick={() => setStatus(value)}>
                  {value === 'all' ? text.allStatuses : text.statusLabel[value]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="container search-results">
          <div className="search-results__header">
            <strong>
              {filteredLessons.length} {text.results}
            </strong>
          </div>

          {filteredLessons.length > 0 ? (
            <div className="search-results__grid">
              {filteredLessons.map((lesson) => (
                <Link
                  key={`${locale}-${lesson.slug}`}
                  className="search-result-card"
                  to={lesson.slug}>
                  <span className="search-result-card__category">
                    {text.categoryLabel[lesson.category]}
                  </span>
                  <span className="search-result-card__status">
                    {text.statusLabel[lesson.status]}
                  </span>
                  <strong>{lesson.title[locale]}</strong>
                  <p>{lesson.description[locale]}</p>
                  {lesson.lastReviewed ? (
                    <span className="search-result-card__meta">
                      {text.reviewed}: {lesson.lastReviewed}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <strong>{text.noResults}</strong>
              <p>{text.noResultsHint}</p>
            </div>
          )}
        </section>

        <section className="container search-quicklinks">
          <div className="section-head">
            <h2>{text.quickLinks}</h2>
            <p>{text.quickLinksIntro}</p>
          </div>
          <div className="landing-grid">
            {text.quickCards.map((card) => (
              <Link key={card.href} className="landing-card" to={card.href}>
                <span className="landing-card__eyebrow">{text.searchLabel}</span>
                <strong>{card.label}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
     </ErrorBoundary>
    </Layout>
  );
}
