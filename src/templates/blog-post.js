import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({data}) => (
  <Layout>
      <SEO title="home" />
      <h1>My WordPress PageTemplate</h1>
      <h4>Posts</h4>
      {data.myCombinedSource1.pages.nodes.map((node) => (
        <div key={node.slug}>
          {/* highlight-start */}
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
          {/* highlight-end */}
          <div dangerouslySetInnerHTML={{ __html: node.content }} />
        </div>
      ))}
    </Layout>
)

export default PageTemplate

export const pageQuery = graphql`
    query {
        myCombinedSource1 {
          pages(first: 5000) {
            nodes {
              title
              content
              slug
            }
          }
        }
      }
`