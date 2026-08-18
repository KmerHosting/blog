import { ArrowRight } from '@carbon/icons-react';
import { ClickableTile, Tag } from '@carbon/react';
import type { Article } from '@/lib/strapi';

export default function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <ClickableTile href={`/articles/${article.slug}`} className={featured ? 'blog-article-tile blog-article-tile-featured' : 'blog-article-tile'}>
    <Tag type="blue">{article.category}</Tag>
    <h2>{article.title}</h2>
    <p>{article.excerpt}</p>
    <div className="blog-article-meta"><span>{article.author}</span><span>{article.readingTime} min read</span></div>
    <span className="blog-tile-link">Read article <ArrowRight size={16} /></span>
  </ClickableTile>;
}
