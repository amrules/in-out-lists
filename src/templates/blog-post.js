import { graphql } from 'gatsby';
import React from "react";
import Helmet from "react-helmet";
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import "../styles/layout-overide.css";



export default function Template({
  data 
}) {
  const post = data.markdownRemark; 
  console.log(post.html)
  
  return (
   
    <div className="blog-post-container">
     <Helmet title={`In And Out - ${post.frontmatter.title}`} />
      <div className="blog-post">
      
         <h1 style={{textAlign: 'center'}}>{post.frontmatter.date}</h1>
         <h2 style={{textAlign: 'center'}}>A STATE OF THE UNION BY {post.frontmatter.title}</h2>
          <h2 style={{textAlign: 'center'}}>More lists by {post.frontmatter.tags.map (tag => {
            return (
             <Link to={`/tags/${tag}`}>
               {tag}
              </Link>
              );
              })}
            </h2>
            
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <Img sizes={post.frontmatter.cover_image.childImageSharp.sizes} style={{position: "static"}} />
        <div>
        <p style={{fontStyle: 'italic'}}>The state of {post.frontmatter.title} at the time of writing this list.</p>
        </div>
      </div>
      
    </div>
    
  );





}
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        cover_image {
          publicURL
          childImageSharp {
            sizes(maxWidth: 515 ) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
;

