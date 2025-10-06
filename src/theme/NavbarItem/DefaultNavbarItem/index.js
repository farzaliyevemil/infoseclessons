import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DefaultNavbarItemMobile from '@theme/NavbarItem/DefaultNavbarItem/Mobile';
import DefaultNavbarItemDesktop from '@theme/NavbarItem/DefaultNavbarItem/Desktop';

function localizeLabel(props, locale) {
  const to = props.to || '';
  const href = props.href || '';

  if (locale !== 'az') return props.label;

  if (to === '/') return 'Başla';
  if (to === '/about') return 'Haqqında';
  if (href.includes('github.com')) return 'GitHub';
  return props.label;
}

export default function DefaultNavbarItem({ mobile = false, position, ...props }) {
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

