// app/lib/wp.ts

// This now looks for the URL in your .env.local file (or Vercel's environment variables).
// We also added the live URL as a fallback string just to be extra safe!
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://api.craftsandkits.com/graphql';

export async function fetchGraphQL(query: string, variables?: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    // This tells Next.js NOT to cache during local development 
    // so you can see your blog post edits instantly.
    cache: 'no-store', 
  });

  const json = await res.json();
  
  if (json.errors) {
    // This will format the error nicely in your terminal so we can read it!
    console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
    throw new Error('Failed to fetch API');
  }
  
  return json.data;
}