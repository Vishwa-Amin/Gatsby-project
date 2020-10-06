import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <h4>Posts from Blog.anant.us</h4>
      {data.myCombinedSource.posts.edges.map(({ node }) => {
        const slug = `blog/${node.slug}`;
       return(
        <div>
          <Link to={slug}>
          <p>{node.title}</p>
          </Link>
        </div>
       );
      })}
    </Layout>
  )
}


export default BlogPage

export const pageQuery = graphql`
    query{
      myCombinedSource(Site: "blog") {
        posts(first: 500000) {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    }  
`;
