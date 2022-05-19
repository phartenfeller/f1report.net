require('dotenv').config({
  path: `.env`,
});

module.exports = {
  flags: {
    // PARALLEL_QUERY_RUNNING: true,
    LMDB_STORE: true,
  },
  siteMetadata: {
    title: `F1 Report`,
    description: `Data for every Formula 1 race ever`,
    author: `Philipp Hartenfeller`,
    siteUrl: `https://f1report.net`,
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
        name: `Formula1 Report`,
        short_name: `F1 Report`,
        description: `Data for every Formula 1 race ever`,
        lang: `en`,
        start_url: `/`,
        background_color: `#f1f5f9`,
        theme_color: `#e10600`,
        display: `minimal-ui`,
        icon: 'src/images/f1report-icon.png',
      },
    },
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-remove-serviceworker`,
    // {
    //   resolve: `gatsby-plugin-advanced-sitemap`,
    //   options: {
    //     query: `
    //     {
    //       races: postgres {
    //         allRaces {
    //           nodes {
    //             raceid
    //             raceSlug
    //             year
    //           }
    //         }
    //       }
    //     }
    //     `,
    //     output: '/sitemap.xml',
    //     mapping: {
    //       races: {
    //         sitemap: `races`,
    //         prefix: `races`,
    //         serializer: (allRaces) => {
    //           console.log('allRaces typeof =>', typeof allRaces);
    //           console.log('allRaces keys =>', Object.keys(allRaces));
    //           return allRaces.nodes.map(({ node }) => node.raceSlug);
    //         },
    //       },
    //     },
    //     createLinkInHead: true,
    //     addUncaughtPages: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://f1report.net/`,
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
