import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import SEO from "../components/seo"

const HomePage = ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <h4>Posts from Learn.anant.us</h4>
      {data.myCombinedSource.posts.edges.map(({ node }) => {
       const slug = `learn/${node.slug}`;
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


export default HomePage

export const pageQuery = graphql`
    query{
      myCombinedSource(Site: "learn") {
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
