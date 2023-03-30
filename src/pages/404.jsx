import React from "react"
import SEO from "../components/seo"
import Layout from "../components/templates/layout"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>
    <Button
        variant="secondary"
        size="small"
        onClick={() => methodDoesNotExist()}
      >
        <ExportIcon size={20} />
        Break the world
      </Button>
    </p>
  </Layout>
)

// return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

export default NotFoundPage
