'use client';

import { GlobalTheme } from '@carbon/react';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CarbonTheme = 'white' | 'g100';
type ThemeContextValue = { theme: CarbonTheme; toggleTheme: () => void };

const STORAGE_KEY = 'kmerhosting-blog-theme';
const ThemeContext = createContext<ThemeContextValue>({ theme: 'white', toggleTheme: () => undefined });

export function CarbonExperienceProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<CarbonTheme>('white');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: CarbonTheme = stored === 'white' || stored === 'g100' ? stored : media.matches ? 'g100' : 'white';
    queueMicrotask(() => setTheme(initial));

    const applySystem = () => {
      if (!window.localStorage.getItem(STORAGE_KEY)) setTheme(media.matches ? 'g100' : 'white');
    };
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
