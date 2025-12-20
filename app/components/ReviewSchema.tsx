import Script from 'next/script';

interface ReviewSchemaProps {
  productName: string;
  description: string;
  imageUrl?: string;
  authorName: string;
  publishedAt: string;
  ratingValue: number;
}

export default function ReviewSchema({
  productName,
  description,
  imageUrl,
  authorName,
  publishedAt,
  ratingValue
}: ReviewSchemaProps) {
  
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "image": imageUrl,
    "description": description,
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": ratingValue,
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": authorName
      },
      "datePublished": publishedAt
    }
  };

  return (
    <Script
      id={`json-ld-review-${productName.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}