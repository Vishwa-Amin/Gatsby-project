const path = require('path');

function createBlogPostsPages(result, createPage) {

  const blogPostTemplate = path.join(__dirname,`../src/templates/allPostsblog.js`);
  const blogPosts = result.data.myCombinedSource.posts.edges;

  const postsPerPage = 6
  const numPages = Math.ceil(blogPosts.length / postsPerPage)

  Array.from({length: numPages}).forEach((_, index) => {

    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: index === 0 ? `/page/1` : `/page/${index + 1}`,
      component: path.resolve(`./src/templates/allPostsblog.js`),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
        slug:post.node.slug,
        previous,
        next,
      },
    });
  });
}

function graphqlForBlogs(graphql, createPage) {
  return graphql(`
      {
     myCombinedSource(Site: "blog") {
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
    // Create blogPosts pages.
    createBlogPostsPages(result, createPage);
  });
}
exports.graphqlForBlogs = graphqlForBlogs;