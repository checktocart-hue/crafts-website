// app/lib/wp.ts

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://api.craftsandkits.com/graphql';

export async function fetchGraphQL(query: string, variables?: any) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    }

    const json = await res.json();
    
    if (json.errors) {
      console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
      return null;
    }
    
    return json.data;
  } catch (error) {
    console.error("Fetch GraphQL Error:", error);
    return null;
  }
}