import React from "react";

interface JsonLdProps {
  type: "website" | "organization" | "product" | "faq" | "breadcrumb";
  data: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = null;

  if (type === "website") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": data.name || "Nothing Pakistan",
      "url": data.url || "https://www.nothingcmf.pk",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${data.url || "https://www.nothingcmf.pk"}/products?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === "organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": data.name || "NOTHING OFFICIAL (SMC-PRIVATE) LIMITED",
      "url": data.url || "https://www.nothingcmf.pk",
      "logo": data.logo || "https://www.nothingcmf.pk/nothing_logo.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": data.telephone || "+923361070111",
        "contactType": "customer support",
        "areaServed": "PK",
        "availableLanguage": ["English", "Urdu"]
      },
      "sameAs": data.sameAs || []
    };
  } else if (type === "product") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name,
      "image": data.images || [],
      "description": data.description,
      "sku": data.sku || data.id,
      "brand": {
        "@type": "Brand",
        "name": data.brand || "Nothing"
      },
      "offers": {
        "@type": "Offer",
        "url": data.url,
        "priceCurrency": "PKR",
        "price": data.price,
        "priceValidUntil": data.priceValidUntil || "2030-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": data.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock"
      }
    };
  } else if (type === "faq") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (data.faqs || []).map((faq: { question: string; answer: string }) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (type === "breadcrumb") {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": (data.items || []).map((item: { name: string; url: string }, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
