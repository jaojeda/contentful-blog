import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import * as blogStyles from './blog.module.scss'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (
        sort:{
          fields: publishedDate,
          order: DESC,
        }
      ) {
        edges {
          node {
            id
            title
            slug
            publishedDate(fromNow:true)
          }
        }
      }
    }
  `)

  return(
    <Layout>
        <h1>Blog</h1>
        <ol className={blogStyles.posts}>
          {data.allContentfulBlogPost.edges.map((edge, i) => {
            const { title, slug, publishedDate } = edge.node
            return (
              <li key={i} className={blogStyles.post}>
                <Link to={`/blog/${slug}`}>
                  <h2>{title}</h2>
                  <p>{publishedDate}</p>
                </Link>
              </li>
            )
          })}
        </ol>
      </Layout>
    )
}

export default BlogPage;