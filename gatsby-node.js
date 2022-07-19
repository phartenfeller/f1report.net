/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const slugify = require('./src/util/slugify');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const raceTemplate = path.resolve(`src/templates/race-template.jsx`);
  const seasonTemplate = path.resolve(`src/templates/season-template.jsx`);
  const circuitTemplate = path.resolve(`src/templates/circuit-template.jsx`);

  const races = await graphql(`
    {
      postgres {
        allRaces {
          nodes {
            raceid
            raceSlug
            year
          }
        }
      }
    }
  `);

  races.data.postgres.allRaces.nodes.forEach((node) => {
    createPage({
      path: `races/${node.raceSlug}`,
      component: raceTemplate,
      context: {
        raceid: node.raceid,
        year: node.year,
      },
    });
  });

  const seasons = await graphql(`
    {
      postgres {
        allSeasonsList {
          year
        }
      }
    }
  `);

  seasons.data.postgres.allSeasonsList.forEach((node) => {
    createPage({
      path: `seasons/${node.year}`,
      component: seasonTemplate,
      context: {
        year: node.year,
      },
    });
  });

  const circuits = await graphql(`
    {
      postgres {
        allCircuitsList {
          circuitid
          circuitref
        }
      }
    }
  `);

  circuits.data.postgres.allCircuitsList.forEach((node) => {
    createPage({
      path: `circuits/${node.circuitref}`,
      component: circuitTemplate,
      context: {
        circuitid: node.circuitid,
      },
    });
  });

  const blogPagesQuery = await graphql(`
    {
      pages: allMdx(
        filter: { fileAbsolutePath: { glob: "**/content/blog/**" } }
      ) {
        nodes {
          frontmatter {
            slug
          }
          id
        }
      }
    }
  `);

  const blogPages = blogPagesQuery?.data?.pages?.nodes ?? [];

  blogPages.forEach((page) => {
    actions.createPage({
      path: `/blog/${slugify(page.frontmatter.slug)}`,
      component: require.resolve('./src/templates/blog-page-template.jsx'),
      context: {
        id: page.id,
      },
    });
  });
};

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createFieldExtension, createTypes } = actions;

//   createFieldExtension({
//     name: 'isFuture',
//     extend(options, prevFieldConfig) {
//       return {
//         resolve(source) {
//           return new Date(source.date) > new Date();
//         },
//       };
//     },
//   });

//   createTypes(`
//     type PostGraphile_Race implements Node {
//       isFuture: Boolean @isFuture
//     }
// `);
// };
