const { SSL_OP_TLS_D5_BUG } = require("constants")
const path = require(`path`)
const { node } = require("prop-types")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const linksPageDefinition = new Promise((resolve, reject) => {
   resolve(
    graphql(`
     query{
    myCombinedSource(Site: "learn") {
      posts(first: 500000) {
        edges {
          node {
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
      return Promise.reject(result.errors)
  }
    result.data.myCombinedSource.posts.edges.forEach(({ node }) => {
      createPage({
        // Decide URL structure
        path: "learn/" +node.slug,
        // path to template
        component: path.resolve(`./src/templates/singlePostlearn.js`),
        context: {
          // This is the $slug variable
          // passed to learn-post.js
          slug: node.slug,
        },
      })
    })
  }),

  graphql(`
     query{
    myCombinedSource(Site: "blog") {
      posts(first: 500000) {
        edges {
          node {
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
      return Promise.reject(result.errors)
  }

  // posts=result.data.myCombinedSource.posts.edges
  // const postsPerPage = 6
  // const numPages = Math.ceil(posts.length / postsPerPage)

  result.data.myCombinedSource.posts.edges.forEach(({ node }) => {
    createPage({
      // Decide URL structure
      path: "/page-2/blog/" +node.slug,
      // path to template
      component: path.resolve(`./src/templates/allPostsblog.js`),
      context: {
        // This is the $slug variable
        // passed to learn-post.js
        slug: node.slug,
      },
    })
  })
}),
 )
})
  return Promise.all([linksPageDefinition])
}
