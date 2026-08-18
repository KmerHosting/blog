import Link from 'next/link';
import { Column, Grid, Link as CarbonLink } from '@carbon/react';
import { LogoGithub, LogoLinkedin, LogoX } from '@carbon/icons-react';

const explore = [
  ['All articles', '/'],
  ['Infrastructure', '/?topic=Infrastructure'],
  ['Security', '/?topic=Security'],
  ['Databases', '/?topic=Databases'],
] as const;

export default function SiteFooter() {
  return <footer className="blog-footer">
    <Grid fullWidth>
      <Column sm={4} md={4} lg={7} className="blog-footer-intro">
        <Link className="blog-footer-brand" href="/">KmerHosting <span>Blog</span></Link>
        <p>Practical infrastructure knowledge for faster, safer and more reliable products.</p>
        <div className="blog-footer-socials">
          <CarbonLink href="https://github.com/KmerHosting" aria-label="KmerHosting on GitHub"><LogoGithub size={20} /></CarbonLink>
          <CarbonLink href="https://www.linkedin.com/company/kmerhosting" aria-label="KmerHosting on LinkedIn"><LogoLinkedin size={20} /></CarbonLink>
          <CarbonLink href="https://x.com/kmerhosting" aria-label="KmerHosting on X"><LogoX size={20} /></CarbonLink>
        </div>
      </Column>
      <Column sm={2} md={2} lg={3}>
        <h2>Explore</h2>
        {explore.map(([label, href]) => <CarbonLink key={href} href={href}>{label}</CarbonLink>)}
      </Column>
      <Column sm={2} md={2} lg={3}>
        <h2>Company</h2>
        <CarbonLink href="https://kmerhosting.com">KmerHosting</CarbonLink>
        <CarbonLink href="https://kmerhosting.com/support">Support</CarbonLink>
        <CarbonLink href="mailto:hello@kmerhosting.com">Contact</CarbonLink>
      </Column>
      <Column sm={4} md={4} lg={3}>
        <h2>Keep building</h2>
        <p>Use the guides, then move to the infrastructure that fits the project.</p>
        <CarbonLink href="https://kmerhosting.com">Explore KmerHosting</CarbonLink>
      </Column>
    </Grid>
    <Grid fullWidth className="blog-footer-bottom"><Column sm={4} md={8} lg={16}>© {new Date().getFullYear()} KmerHosting LLC.</Column></Grid>
  </footer>;
}
