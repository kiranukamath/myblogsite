---
path: gatsby-netlifycms-starter
date: 2019-11-27T16:15:13.013Z
title: How to build Gatsby blog with Netlify CMS
description: Complete guild to build Gatsby blog with Netlify CMS
---
I have followed instruction from Thomas Wang. I have tried to explain in detail all difficulties and solution in building this site.

This tutorial will use [gatsby-personal-starter-blog](http://t.wang.sh/gatsby-personal-starter-blog), a Gatsby starter based on the official [gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/). The differences are that gatsby-personal-starter-blog is configured to run the blog on a subdirectory, /blog, and comes pre-installed with [Netlify CMS](https://www.netlifycms.org/) for content editing. It also adds VS Code highlighting for code blocks.

Before we start you should have **github account** and basic understanding of react.

Lets start step by step

## Install Node.js and npm

To check node version type `node --version` and `npm --version` in your terminal

If not installed then see [nodejs docs](https://nodejs.org/en/)

## Install Gatsby CLI

The Gatsby CLI tool helps you quickly create new Gatsby-powered sites and run commands for developing Gatsby sites. It is a published npm package.

The Gatsby CLI is available via npm and should be installed globally by running `npm install -g gatsby-cli `

## Create Gatsby site 

Open your Terminal and run the following command from the Gatsby CLI to create a new Gatsby site using any one of the [gatsby starter library](https://www.gatsbyjs.org/starters?v=2)  I personally used both [Gatsby starter blog](https://github.com/gatsbyjs/gatsby-starter-blog) and thomas's [Gatsby personal starter blog](https://github.com/thomaswangio/gatsby-personal-starter-blog) for blog in /blog page. 

so code is 

  `gatsby new [your-project-name] [github link of starter blog]` 

for example

```
gatsby new myblog https://github.com/gatsbyjs/gatsby-starter-blog
```

Better use [Gatsby-personal-starter-blog](https://github.com/thomaswangio/gatsby-personal-starter-blog)

Once the Gatsby site is finished installing all the packages and dependencies, you can now go into the directory and run the site locally.

```
cd myblog/gatsby develop
```

**If you get error in first code or in gatsby develop I have explained to debug at end of this blog.**

Now you can go to `localhost:8000` to see your new site, but what’s great is that Netlify CMS is pre-installed and you can access it at localhost:8000/admin if you have used **`gatsby-personal-starter-blog`**.

A CMS, or content management system, is useful because you can add content like blog posts from a dashboard on your site, instead of having to add posts manually with Markdown. However, you’ll likely want to be able to access the CMS from a deployed website, not just locally. For that, you’ll need to deploy to Netlify through GitHub, set up continuous deployment, and do a few configurations. 

Open the project in your code editor and open static/admin/config.yml. Replace your-username/your-repo-name with your GitHub username and project name.

Open the project in your code editor(preferably vs code)  and open `static/admin/config.yml`. Replace `your-username/your-repo-name` with your GitHub username and project name. This step comes handy when using Netlify cms.

```
backend:-name:test-repo+name: github+repo: your-username/your-repo-name
```

Customize your code according to your need like adding your info in bio.js and open github.com and create a new repository, with the same name as your project and push to github repo.

## Netlify

open [app.netlify.com](http://app.netlify.com/) and add a “New site from Git”. Choose your newly created repo and click on “Deploy site” with the default deployment settings.

To make sure that Netlify CMS has access to your GitHub repo, you need to set up an OAuth application on GitHub. The instructions for that are here: [Netlify’s Using an Authorization Provider.](https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings)  you may stop saving client id and secret, rest is already done.

Congrats! Now that Netlify CMS is successfully configured to your project, every time you add a new post, the content will be stored in your repostory and versioned on GitHub because Netlify CMS is Git-based. Also, thanks to [Netlify’s Continuous Deployment](https://docs.netlify.com/configure-builds/get-started/), a new version will be deployed every time you add or edit a post. 

**congrats!!! Finally done after long wait.**

## Common problems:

* There may be problem with libvips so there is chance you may get error(I got one, common in fedora)

for this, delete `/Users/[your-username]/.npm/_libvips/[some .tar.gz] `file. After deleting that .tar.gz file run `npm install` now it works.
