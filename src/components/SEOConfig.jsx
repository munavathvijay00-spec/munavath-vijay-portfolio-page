import React from 'react';
import { Helmet } from 'react-helmet';
import { usePortfolio } from '../context/PortfolioContext';

const SEOConfig = () => {
  const { profile } = usePortfolio();

  const title = `${profile.name} - ${profile.role}`;
  const description = profile.bio;
  const url = "https://munavath-vijay-portfolio-page.vercel.app"; // Replace with actual domain

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.role,
    "url": url,
    "sameAs": [
      profile.socials?.github,
      profile.socials?.linkedin,
      profile.socials?.twitter
    ].filter(Boolean)
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {profile.photo && <meta property="og:image" content={profile.photo} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {profile.photo && <meta name="twitter:image" content={profile.photo} />}
      
      {/* Schema.org for Google */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

export default SEOConfig;
