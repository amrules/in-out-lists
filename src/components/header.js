import React from 'react'
import Link from 'gatsby-link'
import "../styles/blog-listing.css"


const Header = () => (
  <div className="headertest">
    <div
      style={{
     
        margin: '0 auto',
        maxWidth: 980,
        padding: '1.45rem 1.0875rem',
      }}
   >
     <h1 style={{marginTop: '15px', textAlign: 'center',fontSize: '70px'}}>
        <Link to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
IN // OUT        </Link>
      </h1>
    </div>
  </div>
);

export default Header
