import Link from 'next/link';
import { ArrowRight } from '@carbon/icons-react';
import { Tag } from '@carbon/react';
import type { Article } from '@/lib/strapi';
export default function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <article className={featured ? 'article-card article-card-featured' : 'article-card'}>
    <div className="article-card-copy"><Tag type="blue">{article.category}</Tag><h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p>
      <div className="article-meta"><span>{article.author}</span><span>{article.readingTime} min read</span></div>
      <Link className="text-link" href={`/articles/${article.slug}`}>Read article <ArrowRight size={16} /></Link>
    </div>
    {featured ? <div className="article-card-diagram" aria-hidden="true"><span className="diagram-node diagram-node-a">APP</span><span className="diagram-node diagram-node-b">API</span><span className="diagram-node diagram-node-c">DB</span><span className="diagram-line diagram-line-a" /><span className="diagram-line diagram-line-b" /><span className="diagram-status">OK</span></div> : null}
  </article>;
}