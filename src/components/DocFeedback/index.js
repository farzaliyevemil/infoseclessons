import React, {useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const COPY = {
  en: {
    question: 'Was this lesson helpful?',
    yes: 'Yes',
    no: 'No',
    thanks: 'Thanks — noted!',
    issueTitle: 'Lesson feedback: {title}',
    issueBody:
      'Page: {url}\n\nWhat was unclear or missing? (Feedback sent via the "No" button)',
  },
  az: {
    question: 'Bu dərs faydalı oldu?',
    yes: 'Bəli',
    no: 'Xeyr',
    thanks: 'Təşəkkürlər — qeyd edildi!',
    issueTitle: 'Dərs rəyi: {title}',
    issueBody:
      'Səhifə: {url}\n\nNə aydın deyildi və ya nə çatışmırdı? ("Xeyr" düyməsi ilə göndərildi)',
  },
};

export default function DocFeedback() {
  const {metadata} = useDoc();
  const {
    i18n: {currentLocale},
    siteConfig,
  } = useDocusaurusContext();
  const copy = COPY[currentLocale] ?? COPY.en;
  const [answered, setAnswered] = useState(null);

  const pageUrl = `${siteConfig.url}${metadata.permalink}`;
  const issueUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}/issues/new?title=${encodeURIComponent(
    copy.issueTitle.replace('{title}', metadata.title),
  )}&body=${encodeURIComponent(copy.issueBody.replace('{url}', pageUrl))}`;

  return (
    <div className="doc-feedback">
      {answered === null ? (
        <>
          <span>{copy.question}</span>{' '}
          <button
            className="button button--sm button--outline button--primary"
            onClick={() => setAnswered('yes')}
            type="button">
            {copy.yes}
          </button>{' '}
          <a
            className="button button--sm button--outline button--danger"
            href={issueUrl}
            rel="noreferrer"
            target="_blank">
            {copy.no}
          </a>
        </>
      ) : (
        <span>{copy.thanks}</span>
      )}
    </div>
  );
}
