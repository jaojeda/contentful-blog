import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `)

  return(
    <Layout>
        <h1>Blog</h1>
        <ol>
          {data.allMarkdownRemark.edges.map((edge, i) => {
            const { title, date} = edge.node.frontmatter
            return (
              <li key={`${i-date}`}>
                <h2>{title}</h2>
                <p>{date}</p>
              </li>
            )
          })}
        </ol>
      </Layout>
    )
}

export default BlogPage;