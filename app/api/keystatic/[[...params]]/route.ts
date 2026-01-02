import { makeAPIRouteHandler } from '@keystatic/next/api';
import { config, fields, collection } from '@keystatic/core';

// --- CONFIGURATION ---
const keystaticConfig = config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({ label: 'Published Date' }),
        mainImage: fields.image({
          label: 'Main Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        overview: fields.text({ label: 'Overview', multiline: true }),
        categories: fields.array(
          fields.relationship({ label: 'Category', collection: 'categories' }),
          { label: 'Categories', itemLabel: (props) => props.value || 'Select category' }
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'SEO Keywords' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts/content',
            publicPath: '/images/posts/content',
          },
          tables: true,
        }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'title',
      path: 'content/reviews/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Product Name' } }),
        publishedAt: fields.date({ label: 'Date' }),
        amazonLink: fields.url({ label: 'Amazon Affiliate Link' }),
        rating: fields.number({ label: 'Rating (1-5)', validation: { min: 1, max: 5 } }),
        mainImage: fields.image({
          label: 'Main Image',
          directory: 'public/images/reviews',
          publicPath: '/images/reviews',
        }),
        categories: fields.array(
          fields.relationship({ label: 'Category', collection: 'categories' }),
          { label: 'Categories' }
        ),
        content: fields.document({
          label: 'Review Body',
          formatting: true,
          images: true,
          links: true,
          tables: true,
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Project Title' } }),
        publishedAt: fields.date({ label: 'Date' }),
        mainImage: fields.image({
          label: 'Main Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
        }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        content: fields.document({
          label: 'Project Details',
          formatting: true,
          images: true,
          links: true,
        }),
      },
    }),
    tools: collection({
      label: 'Tools / Shop',
      slugField: 'name',
      path: 'content/tools/*',
      schema: {
        name: fields.slug({ name: { label: 'Tool Name' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Essential', value: 'Essential' },
            { label: 'Cutting', value: 'Cutting' },
            { label: 'Adhesive', value: 'Adhesive' },
            { label: 'Protection', value: 'Protection' },
            { label: 'Finishing', value: 'Finishing' },
            { label: 'Lighting', value: 'Lighting' },
          ],
          defaultValue: 'Essential',
        }),
        image: fields.image({
          label: 'Tool Image',
          directory: 'public/images/tools',
          publicPath: '/images/tools',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        amazonLink: fields.url({ label: 'Amazon Link' }),
      },
    }),
    categories: collection({
      label: 'Categories',
      slugField: 'title',
      path: 'content/categories/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),
  },
});

// --- API HANDLERS ---
const handlers = makeAPIRouteHandler({ config: keystaticConfig });

export function GET(req: Request) {
  return handlers.GET(req);
}

export function POST(req: Request) {
  return handlers.POST(req);
}