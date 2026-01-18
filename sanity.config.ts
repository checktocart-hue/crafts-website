import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table'; // <--- The plugin for tables
import { schemaTypes } from './sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'Crafts and Kits',

  projectId: 'b4e25sdq', // Your Project ID
  dataset: 'production',

  basePath: '/studio', // This is where the admin panel will live

  plugins: [
    structureTool(),
    table(), // <--- Enabling tables
  ],

  schema: {
    types: schemaTypes,
  },
});