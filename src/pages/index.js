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
        I am interested in how neural networks solve problem and improving different ways of solving problem. Looking for opportunities to hone my skills to ensure my professional growth and benefit the organization. 
        I have completed fastai course and gained skill in practical deep learning to build state of art machine learning models. I have also learnt javascript, reactjs, nodejs before entering into machine learning.
        To look at my projects check <a href='https://kirankamath.netlify.app/blog/projects/'><Button marginTop="35px">Projects</Button></a> 
        <a href='https://kirankamatmgm.github.io/resume/'><Button marginTop="35px">Resume</Button></a>
        <a href='https://kirankamath.netlify.app/blog/certificates/'><Button marginTop="35px">Courses and Certificates</Button></a>
        </p><br />
      
      
      
      
                    <style type="text/css">
    .subscription-form input {
        display: inline-block;
        padding: 4px;
        font-size: 13px;
        line-height: 18px;
        color: #555555;
        border: 1px solid #ccc;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        width: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        margin-bottom: 10px;
    }
    .checkbox_wrapper {
        display: inline-block;
        padding: 4px;
        width: 100%;
    }
    .subscription-form input.checkbox_type, .subscription-form .checkbox_label {
        width: auto;
        vertical-align: middle;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .subscription-form .checkbox_label {
        display: inline-block;
        line-height: 18px;
        margin-left: 4px;
        font-size: 10px;
        font-family: arial; 
        color: #2d3739;
    }

    .subscription-form input {
        color: #000000;
        background-color: #ffffff;
        border: 1px solid #c4c4c4;
        border-radius:  3px;
        -webkit-border-radius:  3px;
        -moz-border-radius:  3px;
    }

    .btn-grad {
        background: -webkit-linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 100%);
        background: -o-linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 100%);
        background: -moz-linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 100%);
        background: linear-gradient(top,rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 100%);
    }

    .subscription-form-fields {
        margin-top: 15px;
    }

    .subscription-form {
        width: 300px; 
        border: 1px solid #000000; 
        border-radius: 14px; 
        padding: 20px; 
        margin: 0 auto; 
        background-color: #ffffff;
    }

    .subscription-form h4 {
        font-family: arial; 
        color: #050100; 
        font-size: 19px;
        margin-top: 0px;
    }

    .subscription-thank-you {
        font-family: arial; 
        color: #2d3739; 
        font-size: 10px;
    }

    .subscription-form-content {
        font-family: arial; 
        color: #2d3739; 
        font-size: 10px;
    }

    .subscription-form button {
        margin-top: 5px; 
        border-radius: 20px; 
        padding: 10px; 
        display: block; 
        text-align: center;
        border: none;
        width: 100%;
        color: #ffffff; 
        background-color: #aa2500; 
        font-size: 10px; 
        font-family: arial;
    }

    .sender-sub-main {
        display: table;
        width: 100%;
        height: 100%;
    }

    .sender-sub-inner {
        display: table-cell;
        vertical-align: middle;
    }
    
    .sender-link-wrapper {
        display: block;
        position: relative;
        margin-top: 16px;
    }
    .sender-link {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: 12px;
        text-decoration: none !important;
        color: #555;
    }
    
    .sender-link img {
        width: 16px;
        height: 16px;
        margin-right: 2px;
        vertical-align: text-bottom;
    }

</style>
<script src="https://www.google.com/recaptcha/api.js"></script>
<script type="text/javascript">
    function submitGR(token){
        if(grecaptcha.getResponse().length > 0){
            document.getElementById("submit-button").setAttribute("captcha", "false");
            document.getElementById("recaptcha-failed-message").setAttribute("hidden", "");
        } else {
            document.getElementById("submit-button").setAttribute("captcha", "true");
            document.getElementById("recaptcha-failed-message").removeAttribute("hidden");
        }
    }

    document.addEventListener("DOMContentLoaded", function(event) {
		    });
</script>
<div class="sender-sub-main">
    <div class="sender-sub-inner">
        <div class="subscription-form">
            <h4 class="dont-break-out">To read new Blogs</h4>
                                        <div class="subscription-form-fields">
                    <div class="subscription-form-content">
                        <p>Provide your email to get notified when I publish a blog!</p>                    </div>
                    <form id="sender-subscribe" action="https://app.sender.net/forms/sender_subscription/17585/3d2e21c1" method="POST">
                                        
                            <div class="subscription-form-fields" id="subscription-form-fields">
                                                                                                        <input name="email" type="email"class="email_type" id="email" data-label="Email" placeholder="Email" required>
                                                                                                </div>
                        												                        <button id="submit-button" style="margin-top:5px" type="submit" >Get notified</button>
                    </form>
                </div>
                                <span class="sender-link-wrapper">
                    <a class="sender-link" href="http://sender.net" title="Email marketing services">
                        <img src="https://app.sender.net/favicon.png">
                        <span>Sender.net email marketing</span>
                    </a>
                </span>
                                    </div>
    </div>
</div>                
      
      
      
      
      
      
      
        <p>You can contact me through<br />
          email: kirankamat.mgm@gmail.com<br />
          or follow me on &nbsp;
        </p>

        <a class="github-button" href="https://github.com/kirankamatmgm" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-size="large" aria-label="Follow @kirankamatmgm on GitHub">Follow @kirankamatmgm</a><script async defer src="https://buttons.github.io/buttons.js"></script>

        <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="kiran-u-kamath"><a class="LI-simple-link" href='https://in.linkedin.com/in/kiran-u-kamath?trk=profile-badge'>Kiran U Kamath</a></div><script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>


        <a class="twitter-timeline" href="https://twitter.com/UKamath7?ref_src=twsrc%5Etfw">Tweets by UKamath7</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

      </Layout>
    )
  }
}

export default IndexPage
