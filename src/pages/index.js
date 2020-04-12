import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Kiran U Kamath"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Kiran U Kamath"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {/*<img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />*/}
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
        <h1>
          Hello World{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my Personal Website</p>
        <p>
          I am currently pursuing Information science and Engineering in NIE mysore. Interested in machine learing. Also interested in react,nodejs,gatsby and everything interesting in javascript.
        </p><br />
        <p>You can contact me through<br />
          email: kirankamat.mgm@gmail.com<br />
          or follow me on &nbsp;
          <a href="https://twitter.com/UKamath7">Twitter</a> &nbsp; <a href="https://www.linkedin.com/in/kiran-u-kamath/">Linkedin</a>

        </p>
        
      </Layout>
    )
  }
}

export default IndexPage
