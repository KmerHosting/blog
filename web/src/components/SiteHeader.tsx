'use client';

import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from '@carbon/react';
import { Moon, Search, Sun } from '@carbon/icons-react';
import { useCarbonTheme } from './CarbonExperience';

const nav = [
  ['Topics', '/?topic=Infrastructure'],
  ['Guides', '/guides'],
  ['News', '/news'],
  ['Company', '/about'],
] as const;

export default function SiteHeader() {
  const { theme, toggleTheme } = useCarbonTheme();

  return <HeaderContainer render={({ isSideNavExpanded, onClickSideNavExpand }) => <>
    <Header aria-label="KmerHosting Blog">
      <SkipToContent href="#main-content" />
      <HeaderMenuButton
        aria-label={isSideNavExpanded ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isSideNavExpanded}
        aria-controls="blog-navigation"
        isActive={isSideNavExpanded}
        onClick={onClickSideNavExpand}
      />
      <HeaderName href="/" prefix="KmerHosting">Blog</HeaderName>
      <HeaderNavigation aria-label="Primary navigation">
        {nav.map(([label, href]) => <HeaderMenuItem key={href} href={href}>{label}</HeaderMenuItem>)}
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Browse articles" tooltipAlignment="center" onClick={() => window.location.assign('/#articles')}>
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label={theme === 'white' ? 'Use dark theme' : 'Use light theme'} tooltipAlignment="end" onClick={toggleTheme}>
          {theme === 'white' ? <Moon size={20} /> : <Sun size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    <SideNav
      id="blog-navigation"
      aria-label="Blog navigation"
      expanded={isSideNavExpanded}
      isPersistent={false}
      onOverlayClick={onClickSideNavExpand}
      onSideNavBlur={onClickSideNavExpand}
    >
      <SideNavItems>
        {nav.map(([label, href]) => <SideNavLink key={href} href={href} onClick={onClickSideNavExpand}>{label}</SideNavLink>)}
      </SideNavItems>
    </SideNav>
  </>} />;
}
