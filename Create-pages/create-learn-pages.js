const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

function createLearnPostsPages(result, createPage) {

  const LearnPostTemplate = path.join(__dirname,`../src/templates/singlePostlearn.js`);
  const learnPosts = result.data.myCombinedSource.posts.edges;

  learnPosts.forEach((node, index) => {

    const previous = index === learnPosts.length - 1 ? null : learnPosts[index + 1].node
    const next = index === 0 ? null : learnPosts[index - 1].node

    createPage({
      path:node.slug,
      component: path.resolve(`./src/templates/singlePostlearn.js`),
      context: {
        slug: node.slug,
        previous,
        next,
      },
    });
  });
}

function graphqlForLearn(graphql, createPage) {
  return graphql(`
      {
    myCombinedSource(Site: "learn") {
        posts(first:500000){
          edges{
            node{
                slug
                title
                excerpt(format: RENDERED)
            }
          }
        }
      }
      }
    `).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    // Create learn Posts pages.
    createLearnPostsPages(result, createPage);
  });
}
exports.graphqlForLearn = graphqlForLearn;