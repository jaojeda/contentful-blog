import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

export const query = graphql`
query($slug: String!) {
  contentfulBlogPost(slug: {eq: $slug}) {
    body {
      raw
      references {
        ... on ContentfulAsset {
          contentful_id
          __typename
          gatsbyImageData
        }
        file {
          url
          contentType
        }
      }
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
    "embedded-asset-block": node => {
      const { gatsbyImageData } = node.data.target
      if (!gatsbyImageData){
        return null
      }
      return <img src={node.data.target.file.url}/>
    },
  },
}

const Blog = (props) => {
    return (
      <Layout>
        <Head title={props.data.contentfulBlogPost.title}/>
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <p>{props.data.contentfulBlogPost.publishedDate}</p>
        {renderRichText(props.data.contentfulBlogPost.body, options)}
      </Layout>
    )
}

export default Blog