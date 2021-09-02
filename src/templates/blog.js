import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

export const query = graphql`
  query (
    $slug: String!
  ){
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      publishedDate(fromNow: true)
      body {
        raw
      }
    }
  }
`

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p>{children}</p> 

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

const Blog = (props) => {
    return (
      <Layout>
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <p>{props.data.contentfulBlogPost.publishedDate}</p>
        {renderRichText(props.data.contentfulBlogPost.body, options)}
      </Layout>
    )
}

export default Blog