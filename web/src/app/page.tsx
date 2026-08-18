import Link from 'next/link';
import { ArrowRight, Cloud, Code, DataBase, Security } from '@carbon/icons-react';
import {
  Button,
  ClickableTile,
  Column,
  Grid,
  Layer,
  StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper,
  Tag,
  Tile,
} from '@carbon/react';
import { getArticles } from '@/lib/strapi';

const topics = [
  ['Infrastructure', Cloud, 'Compute, networking, deployment and hosting architecture.'],
  ['Performance', Code, 'Practical work for faster applications and websites.'],
  ['Security', Security, 'Safer defaults, TLS, access control and operational hygiene.'],
  ['Databases', DataBase, 'PostgreSQL, managed data services, backups and reliability.'],
] as const;

export default async function Home({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [{ topic }, articles] = await Promise.all([searchParams, getArticles()]);
  const filtered = topic ? articles.filter((article) => article.category === topic) : articles;
  const featured = filtered.find((article) => article.featured) ?? filtered[0];
  const recent = filtered.filter((article) => article.documentId !== featured?.documentId).slice(0, 7);

  return <>
    <section className="blog-hero">
      <Grid fullWidth>
        <Column sm={4} md={6} lg={10} className="blog-hero-copy">
          <p className="blog-kicker">KmerHosting engineering and operations</p>
          <h1>Practical infrastructure knowledge for the next thing you build.</h1>
          <p className="blog-hero-lede">Guides, architecture notes and operational lessons covering hosting, domains, email, databases, security and performance.</p>
          <div className="blog-hero-actions">
            <Button href="#articles">Browse articles</Button>
            <Button kind="tertiary" href="#topics">Explore topics</Button>
          </div>
        </Column>
        <Column sm={4} md={2} lg={6} className="blog-hero-aside">
          <Layer level={1}>
            <Tile className="blog-hero-tile">
              <span className="blog-label">Editorial focus</span>
              <strong>Useful before impressive.</strong>
              <p>Clear implementation detail, production context and fewer abstract promises.</p>
              <div className="blog-hero-facts">
                <span>Hosting</span><span>Domains</span><span>Email</span><span>Data</span>
              </div>
            </Tile>
          </Layer>
        </Column>
      </Grid>
    </section>

    <section className="blog-section" id="articles">
      <Grid fullWidth>
        <Column sm={4} md={8} lg={16} className="blog-section-heading">
          <div><span className="blog-label">Featured</span><h2>{topic ? `${topic} articles` : 'Start here'}</h2></div>
          {topic ? <Link className="blog-inline-link" href="/">Clear topic <ArrowRight size={16} /></Link> : null}
        </Column>
        {featured ? <>
          <Column sm={4} md={5} lg={10}>
            <ClickableTile href={`/articles/${featured.slug}`} className="blog-featured-tile">
              <Tag type="blue">{featured.category}</Tag>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="blog-article-meta"><span>{featured.author}</span><span>{featured.readingTime} min read</span></div>
              <span className="blog-tile-link">Read article <ArrowRight size={16} /></span>
            </ClickableTile>
          </Column>
          <Column sm={4} md={3} lg={6}>
            <Tile className="blog-featured-context">
              <span className="blog-label">Why this matters</span>
              <h3>Production decisions become easier with the right context.</h3>
              <p>KmerHosting Blog focuses on the operational details that affect reliability, security, cost and maintainability.</p>
            </Tile>
          </Column>
        </> : <Column sm={4} md={8} lg={16}><Tile>No articles in this topic yet.</Tile></Column>}
      </Grid>
    </section>

    <section className="blog-section blog-section-layer" id="topics">
      <Grid fullWidth>
        <Column sm={4} md={8} lg={16} className="blog-section-heading"><div><span className="blog-label">Browse topics</span><h2>Find the work in front of you.</h2></div></Column>
        {topics.map(([label, Icon, description]) => <Column sm={4} md={4} lg={4} key={label}>
          <ClickableTile href={`/?topic=${label}`} className="blog-topic-tile">
            <Icon size={24} />
            <h3>{label}</h3>
            <p>{description}</p>
            <ArrowRight size={20} className="blog-topic-arrow" />
          </ClickableTile>
        </Column>)}
      </Grid>
    </section>

    <section className="blog-section">
      <Grid fullWidth>
        <Column sm={4} md={8} lg={16} className="blog-section-heading"><div><span className="blog-label">Recent</span><h2>Latest from the team.</h2></div></Column>
        <Column sm={4} md={8} lg={16}>
          {recent.length ? <StructuredListWrapper className="blog-recent-list">
            <StructuredListBody>
              {recent.map((article) => <StructuredListRow key={article.documentId ?? article.slug}>
                <StructuredListCell className="blog-recent-date">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'New'}</StructuredListCell>
                <StructuredListCell><Tag type="cool-gray">{article.category}</Tag></StructuredListCell>
                <StructuredListCell><Link href={`/articles/${article.slug}`} className="blog-recent-title">{article.title}</Link></StructuredListCell>
                <StructuredListCell>{article.readingTime} min</StructuredListCell>
                <StructuredListCell><Link aria-label={`Read ${article.title}`} href={`/articles/${article.slug}`}><ArrowRight size={18} /></Link></StructuredListCell>
              </StructuredListRow>)}
            </StructuredListBody>
          </StructuredListWrapper> : <Tile>No additional articles in this topic yet.</Tile>}
        </Column>
      </Grid>
    </section>

    <section className="blog-cta">
      <Grid fullWidth>
        <Column sm={4} md={8} lg={12}>
          <span className="blog-label">From reading to shipping</span>
          <h2>Build, host and operate with KmerHosting.</h2>
          <p>Explore infrastructure services for websites, domains, professional email, databases and applications.</p>
        </Column>
        <Column sm={4} md={8} lg={4} className="blog-cta-action"><Button href="https://kmerhosting.com" kind="secondary">Visit KmerHosting</Button></Column>
      </Grid>
    </section>
  </>;
}
