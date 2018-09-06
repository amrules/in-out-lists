const _ = require('lodash');
const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve("src/templates/blog-post.js");
  const tagTemplate = path.resolve("src/templates/tags.js");

  const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve (`src/templates/tags.js`);
  const allTagsTemplate = path.resolve (`src/templates/all-tags.js`);

  const postsByTags = {};

  posts.forEach (({node}) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach (tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = [];
        }
        postsByTags[tag].push (node);
      });
    }
  });
  const tags = Object.keys (postsByTags);

  createPage ({
    path: `/tags`,
    component: allTagsTemplate,
    context: {
      tags: tags.sort (),
    },
  });
  tags.forEach (tagName => {
    const posts = postsByTags[tagName];

    createPage ({
      path: `/tags/${tagName}`,
      component: tagPageTemplate,
      context: {
        posts,
        tagName,
      },
    });
  });
};

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    // Create post detail pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });
  });
};