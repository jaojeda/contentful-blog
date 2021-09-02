import React from 'react';
import Head from '../components/head';
import Layout from '../components/layout'

const ContactPage = () => {
    return(
      <Layout>
        <Head title="Contact" />
        <h1>Contact</h1>
        <p>
            The best way to reach me is <a href="https://twitter.com/JosAOjed">@JosAOjed</a> on Twitter
        </p>
      </Layout>
    )
}

export default ContactPage;