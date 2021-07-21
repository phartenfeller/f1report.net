require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `F1 Report`,
    description: `Data for every Formula 1 race ever`,
    author: `Philipp Hartenfeller`,
    siteUrl: `https://f1report.xyz`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Formula 1 Report`,
        short_name: `f1 report`,
        start_url: `/`,
        background_color: `#EF4444`,
        theme_color: `#EF4444`,
        display: `minimal-ui`,
        icon: `src/images/f1report-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://f1report.xyz/`,
      },
    },
    {
      resolve: 'gatsby-source-pg',
      options: {
        connectionString: `postgres://${process.env.PG_STRING}`,
        schema: 'public',
        refetchInterval: 1800, // Refetch data every 180060 seconds
      },
    },
    {
      resolve: `gatsby-source-package-licenses`,
      options: {
        cacheFile: 'yarn.lock',
      },
    },
  ],
};
