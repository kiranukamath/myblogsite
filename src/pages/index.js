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
          keywords={[`Kiran U Kamath`, `machine learning`, `deep learning`, `artificial intelligence`, `nodejs`, `javascript`, `gatsby`, `react`]}
        />
        {/*<img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />*/}
        <a href='https://kirankamath.hashnode.dev/'>
          <Button marginTop="35px">Go to Blog</Button>
        </a>
        <h1>
          Hello World{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>Welcome to my Personal Website</p>
	    <img src="static/kiran_kamath_intro.gif" alt="This is gif" />
        <p>
        I am interested in how neural networks solve problem and improving different ways of solving problem. Looking for opportunities to hone my skills to ensure my professional growth and benefit the organization. 
        I have completed fastai course and gained skill in practical deep learning to build state of art machine learning models. I have also learnt javascript, reactjs, nodejs before entering into machine learning.
        To look at my projects check <a href='https://kirankamath.netlify.app/blog/projects/'><Button marginTop="35px">Projects</Button></a> 
        <a href='https://kirankamatmgm.github.io/resume/'><Button marginTop="35px">Resume</Button></a>
        <a href='https://kirankamath.netlify.app/blog/certificates/'><Button marginTop="35px">Courses and Certificates</Button></a>
        </p><br />
      
      <script type="text/javascript" src="https://cdn.sender.net/webforms/17585/3d2e21c1.js?v=2"></script>                
	    
        <p>You can contact me through<br />
          email: kirankamat.mgm@gmail.com<br />
          or follow me on &nbsp;
        </p>

        <a class="github-button" href="https://github.com/kirankamatmgm" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-size="large" aria-label="Follow @kirankamatmgm on GitHub">Follow @kirankamatmgm</a><script async defer src="https://buttons.github.io/buttons.js"></script>

        <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="kiran-u-kamath"><a class="LI-simple-link" href='https://in.linkedin.com/in/kiran-u-kamath?trk=profile-badge'>Kiran U Kamath</a></div><script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>


        <a class="twitter-timeline" href="https://twitter.com/kiranukamath?ref_src=twsrc%5Etfw">Tweets by UKamath7</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

      </Layout>
    )
  }
}

export default IndexPage
