import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DefaultNavbarItemMobile from '@theme/NavbarItem/DefaultNavbarItem/Mobile';
import DefaultNavbarItemDesktop from '@theme/NavbarItem/DefaultNavbarItem/Desktop';

const NAV_LABELS = {
  az: {
    byTo: {
      '/': 'Başla',
      '/about': 'Haqqında',
      '/search': 'Axtarış',
    },
    byHrefHost: {
      'github.com': 'GitHub',
    },
  },
};

function getHost(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function localizeLabel(props, locale) {
  const mapping = NAV_LABELS[locale];
  if (!mapping) return props.label;

  const to = props.to || '';
  if (to && mapping.byTo[to]) return mapping.byTo[to];

  const href = props.href || '';
  if (href) {
    const host = getHost(href);
    if (host && mapping.byHrefHost[host]) return mapping.byHrefHost[host];
  }

  return props.label;
}

export default function DefaultNavbarItem({ mobile = false, position: _position, ...props }) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n?.currentLocale || 'en';

  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  const localized = { ...props, label: localizeLabel(props, locale) };

  return (
    <Comp
      {...localized}
      activeClassName={
        localized.activeClassName ?? (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  );
}
