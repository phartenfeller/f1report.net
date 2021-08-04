/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const raceTemplate = path.resolve(`src/templates/race-template.jsx`);
  const seasonTemplate = path.resolve(`src/templates/season-template.jsx`);

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
