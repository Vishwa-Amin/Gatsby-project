import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data }) => {
  const post = data.myCombinedSource.posts.edges[0].node
  console.log(post)
  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    myCombinedSource(Site: "blog") {
      posts(where: {name: $slug}) {
        edges {
          node { 
            slug
            title
            content(format: RENDERED)
          }
        }
      }
    }
  }
  `