import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::article.article',({strapi})=>({
 async publicList(){const articles=await strapi.documents('api::article.article').findMany({status:'published',orderBy:{publishedAt:'desc'},limit:100});return{data:articles,meta:{count:articles.length}};},
 async publicBySlug(ctx){const article=await strapi.documents('api::article.article').findFirst({status:'published',filters:{slug:ctx.params.slug}});if(!article)return ctx.notFound('Article not found');return{data:article};}
}));