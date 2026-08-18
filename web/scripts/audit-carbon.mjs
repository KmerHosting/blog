import { readFile } from 'node:fs/promises';

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const layout = await readFile('src/app/layout.tsx', 'utf8');
const home = await readFile('src/app/page.tsx', 'utf8');
const header = await readFile('src/components/SiteHeader.tsx', 'utf8');
const experience = await readFile('src/components/CarbonExperience.tsx', 'utf8');
const loading = await readFile('src/app/loading.tsx', 'utf8');
const styles = await readFile('src/app/globals.css', 'utf8');
const violations = [];

for (const dependency of ['@carbon/react', '@carbon/icons-react']) {
  if (!pkg.dependencies?.[dependency]) violations.push(`Missing Carbon dependency: ${dependency}`);
}
for (const dependency of ['tailwindcss', 'bootstrap', '@mui/material', 'antd', '@chakra-ui/react', 'lucide-react']) {
  if (pkg.dependencies?.[dependency] || pkg.devDependencies?.[dependency]) violations.push(`Parallel UI/icon dependency is not allowed on the public blog: ${dependency}`);
}
for (const required of ["@carbon/styles/css/styles.css", 'CarbonExperienceProvider', 'CarbonRouteMotion']) {
  if (!layout.includes(required)) violations.push(`Public layout is missing ${required}.`);
}
for (const required of ['HeaderContainer', 'SkipToContent', 'SideNav', 'HeaderGlobalAction', 'useCarbonTheme']) {
  if (!header.includes(required)) violations.push(`Public UI Shell is missing ${required}.`);
}
for (const required of ['GlobalTheme', "'white' | 'g100'", 'prefers-color-scheme: dark']) {
  if (!experience.includes(required)) violations.push(`Theme experience is missing ${required}.`);
}
for (const required of ['Loading', 'withOverlay', 'SkeletonText', 'SkeletonPlaceholder']) {
  if (!loading.includes(required)) violations.push(`Loading experience is missing ${required}.`);
}
for (const required of ['Grid', 'Column', 'ClickableTile', 'StructuredListWrapper']) {
  if (!home.includes(required)) violations.push(`Public home composition is missing Carbon ${required}.`);
}
for (const token of ['var(--cds-background)', 'var(--cds-layer-01)', 'var(--cds-text-primary)', 'var(--cds-border-subtle)']) {
  if (!styles.includes(token)) violations.push(`Public styles are missing Carbon token ${token}.`);
}
if (!styles.includes('prefers-reduced-motion') || !styles.includes('cubic-bezier(0.2, 0, 0.38, 0.9)')) {
  violations.push('Productive route motion and reduced-motion handling are required.');
}
if (/#[0-9a-f]{3,8}\b/i.test(styles)) violations.push('Raw hexadecimal color found in public blog styles.');
if (/\.cds--loading-overlay|--cds-overlay\s*:/.test(styles)) violations.push('Do not override Carbon loading overlay opacity or tokens.');

if (violations.length) {
  console.error(`Carbon public-blog audit failed:\n${violations.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log('Carbon public-blog audit passed. CMS/admin source is intentionally outside this audit and remains unchanged.');
