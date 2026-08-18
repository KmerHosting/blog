'use client';

import { GlobalTheme } from '@carbon/react';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CarbonTheme = 'white' | 'g100';
type ThemeContextValue = { theme: CarbonTheme; toggleTheme: () => void };

const STORAGE_KEY = 'kmerhosting-blog-theme';
const ThemeContext = createContext<ThemeContextValue>({ theme: 'white', toggleTheme: () => undefined });

function systemTheme(): CarbonTheme {
  if (typeof window === 'undefined') return 'white';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'g100' : 'white';
}

export function CarbonExperienceProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<CarbonTheme>('white');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'white' || stored === 'g100') {
      setTheme(stored);
      return;
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applySystem = () => setTheme(media.matches ? 'g100' : 'white');
    applySystem();
    media.addEventListener('change', applySystem);
    return () => media.removeEventListener('change', applySystem);
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    toggleTheme: () => setTheme((current) => {
      const next = current === 'white' ? 'g100' : 'white';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    }),
  }), [theme]);

  return <ThemeContext.Provider value={value}><GlobalTheme theme={theme}>{children}</GlobalTheme></ThemeContext.Provider>;
}

export function useCarbonTheme() {
  return useContext(ThemeContext);
}

export function CarbonRouteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="blog-route-motion" key={pathname}>{children}</div>;
}
