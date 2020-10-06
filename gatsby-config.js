module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  {
    resolve: `gatsby-source-wordpress-experimental`,
    options: {
      url:
      // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
        process.env.WPGRAPHQL_URL ||
        `https://learn.anant.us/graphql`,
        verbose: true,
      // schema: {
      //   //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
      //   typePrefix: `Wp`,
      // },
      
      // develop: {
      //   //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
      //   hardCacheMediaFiles: true,
      // },
    //   type: {
    //     Post: {
    //       limit:
    //         process.env.NODE_ENV === `development`
    //           ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
    //             50
    //           : // and we don't actually need more than 5000 in production for this particular site
    //             5000,
    //     },
    //   },
     },
  },
  {
    resolve: `@xebiastudio/gatsby-source-graphql-multiple`,
    options: {
      typeName: `MyCombinedSource`,
      fieldName: `myCombinedSource`,
      // The paramName will create a query parameter on myCombinedSource that determines which source to use
      // As an example, let's imagine that each source contains content in a specific language
       paramName: `Site`,
      sources: [
        {
           key: `learn`,
          url: `https://learn.anant.us/graphql`
        },
        {
           key: `blog`,
          url: `https://blog.anant.us/graphql`
        }
      ]
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: "gatsby-source-graphql",
    options: {
      // Arbitrary name for the remote schema Query type
      typeName: "MyCombinedSource1",
      // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
      fieldName: "myCombinedSource1",
      // Url to query from
       url: "https://learn.anant.us/graphql",

      // refetch interval in seconds
      refetchInterval: 60,
    },
  },
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // CommonMark mode (default: true)
      commonmark: true,
      // Footnotes mode (default: true)
      footnotes: true,
      // Pedantic mode (default: true)
      pedantic: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      plugins: [],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages/`,
    },
  },
  `gatsby-plugin-mdx`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  
}
