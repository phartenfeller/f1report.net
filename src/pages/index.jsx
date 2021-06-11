import { Link } from 'gatsby';
import React from 'react';
import ImageGetter from '../components/ImageGetter';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/tailwind.css';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 className="text-3xl font-semibold text-blue-600">Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div className="w-1/4">
      <ImageGetter
        filename="gatsby-astronaut.png"
        classes="rounded"
        alt="Gatsby Astronaut"
      />
    </div>
    <Link to="/page-2/" className="underline hover:text-blue-600">
      Go to page 2
    </Link>
  </Layout>
);

export default IndexPage;
