import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../index.module.css';

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  return (
    <Layout
      title="InfoSec Lessons – Kiber Təhlükəsizliyi Öyrən"
      description="Praktik yönümlü kiber təhlükəsizlik kontenti: Red/Blue Teaming, GRC və əsas texniki bacarıqlar.">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">InfoSec Lessons saytına xoş gəlmisiniz 👨‍💻</h1>
          <p className="hero__subtitle">Kiber təhlükəsizliyi sıfırdan praktiki yanaşma ilə öyrənmək üçün bələdçiniz.</p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to="/az/intro"
            >
              Başla →
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="container margin-vert--lg">
        <h2 className="text-xl font-semibold mb-2">Nələri Öyrənəcəksiniz</h2>
<p className="mb-4">
  Bu platformada <strong>tədris materialları</strong>, <strong>məqalələr</strong> və <strong>praktiki araşdırmalar</strong> təqdim olunur.
  Məzmun həm yeni başlayanlar, həm də təcrübəli mütəxəssislər üçün faydalıdır.
</p>
<ul className="list-disc list-inside space-y-1">
  <li>🔴 <strong>Red Teaming</strong> – Təhlükəsizlik zəifliklərinin təyini və test olunması</li>
  <li>🔵 <strong>Blue Teaming</strong> – Monitorinq, təhdid aşkarlanması və insident cavabı</li>
  <li>🛡️ <strong>GRC</strong> – Risklərin idarə olunması, siyasətlərin hazırlanması və uyğunluq</li>
  <li>🌐 <strong>Ümumi Təhlükəsizlik</strong> – Ən Yaxşı Təcrübələr, Çərçivələr, Məqalələr və Əsas Anlayışlar</li>
  <li>📚 <strong>İT Əsasları</strong> – Şəbəkə, əməliyyat sistemləri, virtualizasiya və helpdesk bilikləri</li>
</ul>
        </section>
      </main>
    </Layout>
  );
}
