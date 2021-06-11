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
  const result = await graphql(`
    {
      allRaces {
        edges {
          node {
            circuit_name
            circuit_url
            country
            date
            location
            raceId
            race_name
            race_slug
            race_url
            round
            time
            year
            id
          }
        }
      }
    }
  `);
  result.data.allRaces.edges.forEach((edge) => {
    createPage({
      path: `races/${edge.node.race_slug}`,
      component: raceTemplate,
      context: {
        id: edge.node.raceId,
      },
    });
  });
};
