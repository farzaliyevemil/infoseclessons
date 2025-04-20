import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="Haqqında" description="InfoSec Lessons platforması və onun yaradıcısı haqqında məlumat">
      <main className="container margin-vert--lg">
        <h1>InfoSec Dərsləri haqqında</h1>
        <p>
          <strong>InfoSec Lessons</strong> — <strong>Emil Fərzəliyev</strong> tərəfindən yaradılmış, həm online həm də öz serverində yerləşdirilən (offline self-hosted) tədris platformasıdır. Emil Fərzəliyev informasiya təhlükəsizliyi üzrə mühəndis və təlimçidir.
        </p>
        <p>
          Mən kibertəhlükəsizlik sahəsində aktiv işləyirəm, idarəetmə, red/blue teaming və tələbələrə seminarlar və universitet dərsləri vasitəsilə tədris təcrübəm var.
        </p>
        <p>
          Bu platforma kibertəhlükəsizlik və İT sahəsində həm yeni başlayanlar, həm də peşəkarlar üçün praktik bilik, tədqiqat və real dərsləri bölüşmək üçün yaradılıb. Məqsəd yüksək keyfiyyətli məzmunu hamı üçün əlçatan etmək və başqalarına güclü InfoSec təməli qurmağa kömək etməkdir.
        </p>
        <h2>🎯 Missiya</h2>
        <ul>
          <li>🔐 Kibertəhlükəsizlik üzrə maarifləndirmə və təhsili təşviq etmək</li>
          <li>🧩 Strukturlaşdırılmış, real dünyaya əsaslanan öyrənmə resursları təqdim etmək</li>
          <li>🌍 Öyrənənlər və təhlükəsizlik həvəskarlarından ibarət icma qurmaq</li>
        </ul>
      </main>
    </Layout>
  );
}
